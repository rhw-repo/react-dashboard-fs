### React Dashboard

Work In Progress:

Dashboard app to handle Create, Read & Update with a large data set plus progress chart & Kanban board.

For a Financial Consultancy.

### Technologies

- `React`
- `TypeScript`
- `Tanstack Query`
- `Tanstack Form`
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

- faster table generation whilst retaining control over all code, fully modifiable
- uses Tanstack Table (robust, tested solution)
- using other `shadcn/ui` components for faster templating

2. `Tailwind CSS` for quicker uniform & polished UI styling

- Blend with modular vanilla CSS if required to retain full control over the design

3. Implementing `Tanstack Query` (React Query)

- automate data fetching, caching and error / loading state

---

### Progress

Installation & config:

- Vite, React and TypeScript
- React Router, React Query, component-library toolkit (shadcn), ECharts
- Switched to developing in Docker container utilizing DevContainers as extension in the editor (with Docker for staging deployment) + pnpm

Implementation:

- Four tables with mock data
- ECharts stacked series chart with mock data
- Modal with a Tanstack Form started to edit single table entries
- Layout for archival feature which will archive single or multiple table entries
- Vertical navigation menu
- Tanstack Query for data fetching with polling tested with mock backend
- Custom button with animation as per client request demo display for coleague
- Template to be used later for log in and sign up pages (shadcn Card)
- Kanban provider selected
- Placeholder image for the kanban board to demo layout for coleague
- Document upload storage S3 provider Garage agreed with team

Testing:

- Unit testing with vitest

Staging:

- Using Docker & Railway

### Next sprints

- Archive feature
- Document upload feature in Tanstack Form
- Completion of form

Research & Team Discussion:

- Completion of login / signup with Google SSO
- Links to be finalised with team (currently mix of genuine pages / display of certain components)
- Link to Kanban board or other UI solution

Implementation:

- Kanban board
- Integration with server (Postgres + PHP)
- Testing polling and performance (synchronizes database and UI)
- Possiblity to DRY Tailwind utility classes with Taiwind Variants (TBC)

Testing:

- Integration testing with React Testing Library
- End to end testing with Playwright

---

## Contact

[![My Skills](https://skillicons.dev/icons?i=linkedin)](https://www.linkedin.com/in/ruth-westnidge/)
[![My Skills](https://skillicons.dev/icons?i=github)](https://github.com/rhw-repo)
