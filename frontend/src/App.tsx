import DemoPage from './components/ui/data-table/page';
import { createBrowserRouter, type RouteObject, RouterProvider, Outlet } from 'react-router';
import Navbar from './components/ui/navbar/navbar';
import type React from 'react';
import BuzzerButton from './components/ui/buzzer-button/BuzzerButton';

// Layout is going to be the parent of all routes rendering at '/'
const Layout = (): React.JSX.Element => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center">
        <Outlet />
      </main>
    </>
  );
};

/*const TestComponent = (): React.JSX.Element => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-900">
      <span className="text-2xl text-neutral-50">Test</span>
    </main>
  );
};*/

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <DemoPage /> },
      { path: 'test', element: <BuzzerButton /> },
    ],
  },
];

export default function App() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
