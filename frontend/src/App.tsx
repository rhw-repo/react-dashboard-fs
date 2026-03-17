import DemoPage from './components/ui/data-table/page';
import { createBrowserRouter, type RouteObject, RouterProvider, Outlet } from 'react-router';
import type React from 'react';
import BuzzerButton from './components/ui/buzzer-button/BuzzerButton';
import { LoginCard } from './components/login-card/LoginCard';
import SignUpCard from './components/signup-card/SignUpCard';

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
    ],
  },
];

export default function App() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
