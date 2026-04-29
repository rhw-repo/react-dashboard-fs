import { type FallbackProps } from 'react-error-boundary';
import { ErrorFallbackUI } from './ErrorFallbackUI';

//TODO: SB - error logging tbc
const ErrorBoundaryFallback = ({ error }: FallbackProps) => {
  // TODO - SB error logging tbc 
  console.log (error);
const handleReset = () => {
    // Hard refresh 
    window.location.assign("/");
  };

  return <ErrorFallbackUI onAction={handleReset} buttonText="Restart App" />;
};

export default ErrorBoundaryFallback;
