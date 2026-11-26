import TaskTimelinePage from './components/ui/task-timeline-table/TaskTimelinePage';
import { createBrowserRouter, type RouteObject, RouterProvider, Outlet } from 'react-router';
import type React from 'react';
import BuzzerButton from './components/ui/buzzer-button/BuzzerButton';
import { LoginCard } from './components/ui/login-card/LoginCard';
import SignUpCard from './components/ui/signup-card/SignUpCard';
import RecordsListTablePage from './components/ui/records-list-table/RecordsListPage';
import Navbar from './components/ui/navbar/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import RouteErrorFallback from './components/ui/error-fallback-ui/RouteErrorFallback';
import ErrorBoundaryFallback from './components/ui/error-fallback-ui/ErrorBoundaryFallback';
import { NotFoundPage } from './components/ui/error-fallback-ui/NotFoundPage';

// Create a client
const queryClient = new QueryClient();

// TypeScript only:
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/react-query').QueryClient;
  }
}
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

const Layout = (): React.JSX.Element => {
  return (
    // scrollbar-gutter: stable reserves the scrollbar's width even on pages too short to scroll,
    // so the centred grid doesn't shift sideways when navigating between short and tall pages.
    <div className="h-screen w-full overflow-auto [scrollbar-gutter:stable]">
      <div className="mx-auto grid h-max min-h-full w-full max-w-550 grid-cols-[9rem_1fr]">
        <aside className="justify-self-end">
          <Navbar />
        </aside>

        <main className="col-start-2 min-h-full max-w-full min-w-0 px-4 py-1">
          <Outlet />
        </main>
      </div>
    </div>
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
