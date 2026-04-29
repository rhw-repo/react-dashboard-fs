import { useRouteError } from "react-router";
import { ErrorFallbackUI } from "./ErrorFallbackUI";

const RouteErrorFallback = () => {
  const error = useRouteError();

//TODO: SB - error logging tbc
  console.log((error as Error).message);

   const handleReset = () => {
    // Hard refresh
    window.location.assign("/");
   }

  return <ErrorFallbackUI onAction={handleReset} buttonText="Restart App" />;
};


export default RouteErrorFallback;