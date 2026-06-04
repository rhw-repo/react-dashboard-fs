import { type FallbackProps } from 'react-error-boundary';
import { ErrorFallbackUI } from './ErrorFallbackUI';
import { GENERAL_ERROR_CONTENT } from './errorContent';

//TODO: SB - error logging tbc
const ErrorBoundaryFallback = ({ error }: FallbackProps) => {
  // TODO - SB error logging tbc 
  console.log (error);
const handleReset = () => {
    // Hard refresh 
    window.location.assign("/");
  };

  return <ErrorFallbackUI onAction={handleReset} content={GENERAL_ERROR_CONTENT} />;
};

export default ErrorBoundaryFallback;
