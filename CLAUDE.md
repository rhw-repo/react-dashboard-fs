# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development environment

The default way to work on this project is opening `frontend/` in VS Code with the Dev Containers extension — config at `.devcontainer/devcontainer.json` (repo root). It builds from the `mcr.microsoft.com/devcontainers/typescript-node` image, runs `pnpm install` on container creation, and auto-starts the dev server (`pnpm run dev -- --host`) on every attach, so the app is usually already running once the container is up. Port 5173 is auto-forwarded and labeled "Vite Dev Server" in VS Code's Ports panel.

**Port forwarding caveat:** if external port 5173 is already claimed (e.g. a stray container/process left over from a previous session), VS Code silently forwards the dev server to a different external port instead (5174, etc.). The container's Vite server is still bound to 5173 internally, but the browser's actual origin will be whatever port got forwarded — if backend requests start failing CORS checks unexpectedly, check VS Code's Ports panel for the actual mapping, and check for stray processes/containers still holding the port you expected.

All `pnpm` installs and CLI commands must be run by the user inside the container — do not execute `pnpm add`, `pnpm install`, `npx`, or `tsc` via Bash tools. Write out the commands for the user to run instead.

All source code lives under `frontend/`. Run commands from that directory inside the container.

## Commands

```bash
pnpm dev          # Start Vite dev server (exposed on port 5173) — already running via postAttachCommand in most cases
pnpm build        # tsc -b && vite build
pnpm lint         # eslint .
pnpm test         # vitest (watch mode)
pnpm test --run   # vitest single run (CI)
pnpm preview      # preview production build locally
```

To run a single test file:
```bash
pnpm test tests/unit-tests/RecordsListTable.test.ts
```

Alternative (not the default): the dev server can also be launched manually via Docker Compose from `frontend/`:
```bash
docker compose up
```
This builds from `Dockerfile.dev` and maps port 5173 on the `dev-bridge-network` — the same network the devcontainer itself joins (see `initializeCommand`/`runArgs` in `.devcontainer/devcontainer.json`), so a separately-run backend container on that network is reachable either way.

## Architecture

### App entry and routing

`src/main.tsx` → `src/App.tsx`. `App.tsx` owns:
- The `QueryClient` instance (exposed on `window.__TANSTACK_QUERY_CLIENT__` for devtools)
- The React Router browser router with a flat route list under a shell `<Layout>`
- The top-level `<ErrorBoundary>` wrapping the `<QueryClientProvider>`

Routes:
| Path | Component |
|---|---|
| `/` | `TaskTimelinePage` (default/home) |
| `/records-list-table` | `RecordsListTablePage` |
| `/login` | `LoginCard` |
| `/signup` | `SignUpCard` |
| `/test` | `BuzzerButton` |

### Data layer

- **Fetching:** generic `fetchData<T>(url, signal?)` utility at `src/components/ui/utils/fetchData.ts`. Validates `content-type: application/json` before parsing.
- **Endpoints:** `src/components/ui/utils/endpoints.ts` exports `API_ENDPOINTS`, built from `VITE_API_URL` (set in `.env.local`, e.g. `http://localhost:3000`). Both `RecordsListPage` and `TaskTimeLineTablesSection` fetch from `API_ENDPOINTS.people` — the mock-data JSON path is no longer used anywhere.
- **Server state:** TanStack Query. Pages call `useQuery` and pass `signal` through to `fetchData` for cancellation. `throwOnError: true` is set so errors bubble to the nearest error boundary.

### Core data types

`src/types/types.ts`:
- `Person` — `_id` (MongoDB ObjectId string, used as the row/selection key), name, optional nextTask/taskDeadline, status (`'bronze' | 'silver' | 'gold' | 'do not contact'`), optional status2
- `FullPerson extends Person` — adds address, email, postcode, optional `notes: PersonFile[]` (files attached to the record); used for the detail/edit view
- `PersonFile` — fileName, fileType, fileSize; metadata for files already attached to a record

`src/schemas/person.ts` — Zod schema (`recordSchema`) used for TanStack Form validation.

### Tables

Both data tables share the same structural pattern:

```
<Page>           ← useQuery, loading/empty guards, passes data down
  <Table>        ← useReactTable, sorting, selection state
    <Columns>    ← getColumns() factory returns ColumnDef[]
```

- **RecordsListTable** (`src/components/ui/records-list-table/`): Displays `FullPerson[]`. Manages row selection via a plain `Set<string>` (not TanStack's built-in row selection, because squash merges broke state sync). Wraps the table in a `QueryErrorResetBoundary` + `ErrorBoundary`. Column visibility is controlled by the page through an `initialColumnVisibility` prop.
- **TaskTimelineTable** (`src/components/ui/task-timeline-table/`): Similar structure. `TaskTimelineSectionWrapper` renders three side-by-side `TaskTimelineTable` instances with the same data (Todo / In Progress / Done sections are structurally present but not yet filtering by status). Lives on the home page alongside `BurnUpChart` and a Kanban placeholder.

Both table files are marked `'use no memo'` to opt out of React Compiler memoisation — TanStack Table returns stable references that break under memoisation (see comment in source). Note: `RecordsListPage.tsx` and `TaskTimelinePage.tsx` also repeat the directive inside the function body, which is redundant but harmless.

### Record edit form and file upload

`RecordEditModal` → `RecordEditForm` → `FileUploader` (all in `src/components/ui/record-edit-modal/`)

- `form-context.ts` creates a typed `useAppForm` hook via `createFormHook` / `createFormHookContexts` from TanStack Form.
- `RecordEditForm` instantiates a Uppy instance via `useState` (stable across renders) with the `@uppy/xhr-upload` plugin and `autoProceed: true`. Files upload immediately on drop, one request per file, to `POST ${API_ENDPOINTS.people}/${person._id}/files/stage` — the backend stages them server-side without touching S3 yet. Each staging response returns `{ stagingID }`, read off `file.response.body.stagingID` in Uppy's file state. `useUppyState` derives `fileCount` (submit-button guard when only a file was added) and `isStagingFiles` (disables submit while any upload is still in flight).
- On submit, staged files are **not** re-sent — only their `stagingID`s are collected and included as `stagingIds: string[]` in a plain JSON payload (`UpdatePersonPayload`), POSTed via `useMutation`/`mutateAsync` to `${API_ENDPOINTS.people}/${person._id}` with `Content-Type: application/json`. This request is the commit/confirmation signal: the backend moves the referenced staged files to S3 and attaches them to the record's `notes`; if the form is never submitted, staged files are discarded server-side. On success the `people` query is invalidated.
- Files already attached to the record (`person.notes`) are rendered above the dropzone (name + formatted size) with a "remove" button, filtered to `visibleNotes = person.notes?.filter((file) => !file.archived)`. The remove is a soft/archive delete handled by the backend (`DELETE .../files/:fileId` sets `notes.$.archived = true`) — the file is never erased from the S3 bucket or the database, so the frontend must filter archived notes out of every place `notes` is rendered (this list, and the `notes` column in `RecordsListColumns.tsx`) rather than relying on the backend to omit them.
- `FileUploader` is a dumb display component: receives the Uppy instance as a prop and renders `<Dropzone>` + `<FilesList>` from `@uppy/react`.
- Validation uses `revalidateLogic` with `mode: 'submit'` / `modeAfterSubmission: 'change'`, and a dynamic Zod validator.

### Charts

`EChart` (`src/components/ui/EChart.tsx`) is a thin React wrapper around Apache ECharts that initialises the chart on mount, updates it when `option` changes, and auto-resizes via `ResizeObserver`. `BurnUpChart` registers only the ECharts modules it needs (tree-shakeable import pattern) and wraps `EChart` in an `ErrorBoundary`.

### Error handling

`src/components/ui/error-fallback-ui/`:
- `ErrorBoundaryFallback` — top-level app error boundary fallback
- `RouteErrorFallback` — React Router `errorElement` fallback
- `ErrorFallbackUI` — reusable display component driven by `ErrorContent` objects from `errorContent.ts`
- `NotFoundPage` — wildcard route (`*`)

### shadcn/ui and styling

Components in `src/components/ui/` at the flat level (Button, Table, Label, Input, etc.) are shadcn/ui primitives. Project-specific feature components live in named subdirectories alongside those primitives.

- Tailwind CSS v4 via `@tailwindcss/vite` plugin; no `tailwind.config.js` file — configuration is in `src/index.css`. Custom fonts (Karla, Noto Sans) are self-hosted under `public/fonts/`.
- `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use this for all conditional class names.
- Prettier is configured with `prettier-plugin-tailwindcss` (sorts class order). Print width 120, single quotes, trailing commas.
- The ESLint config disables `react-hooks/incompatible-library` for the two table directories to suppress false positives from `'use no memo'`.

### Path alias

`@` maps to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

## Testing

Unit tests live in `frontend/tests/unit-tests/` and use Vitest with `globals: true` and `environment: 'node'`. Tests cover pure utility functions and column-definition factories — no DOM rendering. The `@` alias works in tests via the Vite config.

**Known test drift:** `RecordsListTable.test.ts` was written against an earlier version of `RecordsListColumns.tsx`. The current column list (select, edit, status, name, address, postcode, notes, nextTask, taskDeadline, status2 = 10 columns) differs from what several test assertions expect — column count, sizes, and index-based positions are stale. Update the tests when modifying column definitions.

## Branch and deployment structure

- `dev` — source of truth for active development
- `main` — integration branch, synced from dev via merge
- `dev-update-df-test` — deployed to Railway (builds from `frontend/Dockerfile` with `npm run build`)

Prefer regular merges over squash merges; squash history has caused "both added" conflicts on re-merge in the past.
