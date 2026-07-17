### React Dashboard

Work In Progress:

Dashboard app to handle Create, Read & Update with a large data set plus progress chart & Kanban board.

For a Financial Consultancy.

### Technologies

- `React`
- `TypeScript`
- `TanStack Query`
- `TanStack Form`
- `Uppy`
- `Tailwind CSS`
- `shadcn/ui`
- `ECharts`
- `vitest`
- `Dev Containers`
- `Docker`
- `React Testing Library`
- `Playwright`

---

### Challenges:

- Time required to implement and style a React component library table
- Any potential effects on performance using CSS-in-JS to style it whilst handling larger data sets

### Solutions:

1. Implementing `shadcn/ui` Data Table

- Faster table generation whilst retaining control over all code, fully modifiable
- Uses TanStack Table (robust, tested solution)
- Using other `shadcn/ui` components for faster templating

2. `Tailwind CSS` for quicker uniform & polished UI styling

- Blend with modular vanilla CSS if required to retain full control over the design

3. Implementing `TanStack Query` (React Query)

- Automate data fetching, caching and error / loading state

---

### Progress

Installation & config:

- Vite, React and TypeScript + pnpm
- React Router, TanStack Query, shadcn, ECharts, TanStack Form, Uppy
- Dev Containers for development, Docker containers for tests with mock backend service (Express & MongoDB) & deployment

Implementation:

- Vertical navigation menu
- Four tables with mock data
- ECharts stacked series chart with mock data
- Modal with a TanStack Form to edit single table entries
- Layout for archival feature which will archive single or multiple table entries
- TanStack Query for data fetching with polling (mock backend service connected via Docker network)
- Separate animated button component
- Template to be used later for log in and sign up pages (shadcn Card)
- Kanban provider selected
- Placeholder image for the kanban board to demo layout for coleague
- Research: document upload storage S3 provider Garage agreed with coleague
- Form architecture agreed (archival feature for existing files with a separate request for S3 bucket, new file uploads with Uppy, edit all fields)
- Branch using Uppy within a TanStack Form component, connected to mock backend service

Testing:

- Unit testing with vitest

Staging:

- Using Docker & Railway

### Next sprints

- Completion of form component
- Archive feature

Research & Team Discussion:

- Completion of login / signup with Google SSO
- Links to be finalised with team (currently mix of genuine pages / display of certain components)
- Link to Kanban board or other UI solution

Implementation:

- Kanban board
- Integration with server (Postgres + PHP)
- Possiblity to DRY Tailwind utility classes with Taiwind Variants (TBC)

Testing:

- Integration testing with React Testing Library
- End to end testing with Playwright

---

## Contact

[![My Skills](https://skillicons.dev/icons?i=linkedin)](https://www.linkedin.com/in/ruth-westnidge/)
[![My Skills](https://skillicons.dev/icons?i=github)](https://github.com/rhw-repo)
