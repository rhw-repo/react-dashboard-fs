import DemoPage from './components/ui/data-table/page';
import { createBrowserRouter, type RouteObject, RouterProvider, Outlet } from 'react-router';
import type React from 'react';
import BuzzerButton from './components/ui/buzzer-button/BuzzerButton';
import { LoginCard } from './components/ui/login-card/LoginCard';
import SignUpCard from './components/ui/signup-card/SignUpCard';
import RecordsListTablePage from './components/ui/records-list-table/records-list-page';

// Layout is going to be the parent of all routes rendering at '/'
const Layout = (): React.JSX.Element => {
  return (
    <>
      <main className="flex min-h-screen items-center justify-center">
        <Outlet />
      </main>
    </>
  );
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <DemoPage /> },
      { path: 'test', element: <BuzzerButton /> },
      { path: 'login', element: <LoginCard /> },
      { path: 'signup', element: <SignUpCard /> },
      { path: 'records-list-table', element: <RecordsListTablePage /> },
    ],
  },
];

// DataTable data={data} initialColumnVisibility={visibility3}

export default function App() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
