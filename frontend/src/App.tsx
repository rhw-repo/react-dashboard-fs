import TaskTimelinePage from './components/ui/task-timeline-table/TaskTimelinePage';
import { createBrowserRouter, type RouteObject, RouterProvider, Outlet } from 'react-router';
import type React from 'react';
import BuzzerButton from './components/ui/buzzer-button/BuzzerButton';
import { LoginCard } from './components/ui/login-card/LoginCard';
import SignUpCard from './components/ui/signup-card/SignUpCard';
import RecordsListTablePage from './components/ui/records-list-table/RecordsListPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import RouteErrorFallback from './components/ui/error-fallback-ui/RouteErrorFallback';
import ErrorBoundaryFallback from './components/ui/error-fallback-ui/ErrorBoundaryFallback';
import { NotFoundPage } from './components/ui/error-fallback-ui/NotFoundPage';

const queryClient = new QueryClient();

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

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
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export default function App() {
  const router = createBrowserRouter(routes);
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
