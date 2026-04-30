import { useRouteError } from "react-router";
import { ErrorFallbackUI } from "./ErrorFallbackUI";
import { GENERAL_ERROR_CONTENT } from './errorContent';

const RouteErrorFallback = () => {
  const error = useRouteError();

//TODO: SB - error logging tbc
  console.log((error as Error).message);

   const handleReset = () => {
    // Hard refresh
    window.location.assign("/");
   }

  return <ErrorFallbackUI onAction={handleReset} content={GENERAL_ERROR_CONTENT} />;
};


export default RouteErrorFallback;