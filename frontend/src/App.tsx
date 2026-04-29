import TaskTimelinePage from './components/ui/task-timeline-table/TaskTimelinePage';
import { createBrowserRouter, type RouteObject, RouterProvider, Outlet} from 'react-router';
import type React from 'react';
import BuzzerButton from './components/ui/buzzer-button/BuzzerButton';
import { LoginCard } from './components/ui/login-card/LoginCard';
import SignUpCard from './components/ui/signup-card/SignUpCard';
import RecordsListTablePage from './components/ui/records-list-table/RecordsListPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from "react-error-boundary";
import RouteErrorFallback from './components/ui/error-fallback-ui/RouteErrorFallback';
import ErrorBoundaryFallback from './components/ui/error-fallback-ui/ErrorBoundaryFallback';

// Create a client
const queryClient = new QueryClient()


// TypeScript only:
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__:
      import('@tanstack/query-core')
        .QueryClient
  }
}
window.__TANSTACK_QUERY_CLIENT__ = queryClient

/* TODO: DELETE ONCE COMPLETED ROUTEERRORFALLBACK.TSX
function RouteErrorFallback() {
  const error = useRouteError();
  return (
    <div role="alert" style={{ padding: '20px', border: '2px solid orange' }}>
      <h2>Page Error</h2>
      <p>Something went wrong loading this page:</p>
      <pre style={{ color: 'red' }}>{(error as Error).message}</pre>
    </div>
  );
}*/

// Layout is going to be the parent of all routes rendering at '/'
const Layout = (): React.JSX.Element => {
  return (
    <>
      <div className="w-full">
        <Outlet />
      </div>
    </>
  );
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteErrorFallback />,
    children: [
      { index: true, element: <TaskTimelinePage /> },
      { path: 'test', element: <BuzzerButton /> },
      { path: 'login', element: <LoginCard /> },
      { path: 'signup', element: <SignUpCard /> },
      { path: 'records-list-table', element: <RecordsListTablePage /> },
    ],
  },
];

/* TOD0 - REPLACE WITH ERROR BOUNDARY UI COMPONENT - DELETE ONCE COMPLETED
THIS BLOCK TESTED TO PROVE react-error-boundary executes */
/*function ErrorFallback({ error }: FallbackProps) {
	return (
		<div role="alert">
			<h2>Something went wrong outside the router</h2>
			<pre style={{ color: 'red', border:'2px solid pink', padding:'20px' }}>{(error as Error).message}</pre>
		</div>
	)
}*/

export default function App() {
  const router = createBrowserRouter(routes);
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
    <QueryClientProvider /*client={queryClient}*/ client={null as any}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </ErrorBoundary>
  );
}
