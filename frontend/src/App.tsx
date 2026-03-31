import TaskTimelinePage from './components/ui/task-timeline-table/TaskTimelinePage';
import { createBrowserRouter, type RouteObject, RouterProvider, Outlet } from 'react-router';
import type React from 'react';
import BuzzerButton from './components/ui/buzzer-button/BuzzerButton';
import { LoginCard } from './components/ui/login-card/LoginCard';
import SignUpCard from './components/ui/signup-card/SignUpCard';
import RecordsListTablePage from './components/ui/records-list-table/RecordsListPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

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
    children: [
      { index: true, element: <TaskTimelinePage /> },
      { path: 'test', element: <BuzzerButton /> },
      { path: 'login', element: <LoginCard /> },
      { path: 'signup', element: <SignUpCard /> },
      { path: 'records-list-table', element: <RecordsListTablePage /> },
    ],
  },
];

export default function App() {
  const router = createBrowserRouter(routes);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
