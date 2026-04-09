### React Dashboard

Work In Progress:

Dashboard app to handle Create, Read & Update with a large data set plus progress chart & Kanban board. 

For a Financial Consultancy.

### Technologies

- `React`
- `TypeScript`
- `Tanstack Query`
- `Tailwind CSS`
- `shadcn/ui`
- `ECharts`
- `vitest`
- `Dev Containers (Docker, VS Code)`

---

### Challenges:

- Time required to implement and style a React component library table
- Any potential effects on performance using CSS-in-JS to style it whilst handling larger data sets

### Solutions:

1. Implementing `shadcn/ui` Task Dashboard

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
- Switched to developing in Docker container utilizing DevContainers as extension in the editor  

Implementation:
- Four tables with mock data 
- ECharts stacked series chart with mock data 
- Vertical navigation menu
- Custom button with animation as per client request 
- Template to be used later for log in and sign up pages 

Testing: 
- Unit testing with vitest 

### Next sprints

Research & Team Discussion: 
- Websockets for synchronization database and UI
- Completion of login / signup with Google SSO 
- Links to be finalised with team (currently mix of genuine pages / display of certain components)
- Final color theme

Implementation: 
- Updated links in vertical naviagtion menu
- Kanban board 
- integration with server side & websockets implentation for synchronization database and UI
- Color theme
- Possiblity to DRY Tailwind utility classes with Taiwind Variants (TBC)

Testing: 
- integration testing with React Testing Library
- end to end testing with Playwright 


---

## Contact

[![My Skills](https://skillicons.dev/icons?i=linkedin)](https://www.linkedin.com/in/ruth-westnidge/)
[![My Skills](https://skillicons.dev/icons?i=github)](https://github.com/rhw-repo)
