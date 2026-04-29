import { useRouteError } from "react-router";

const RouteErrorFallback = () => {
  const error = useRouteError();
  return (
    <div role="alert" style={{ padding: '20px', border: '2px solid orange' }}>
      <h2>Page Error</h2>
      <p>Something went wrong loading this page:</p>
      <pre style={{ color: 'red', fontSize: '3rem' }}>{(error as Error).message}</pre>
    </div>
  );
}

export default RouteErrorFallback;