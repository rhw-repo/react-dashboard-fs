import { type FallbackProps } from 'react-error-boundary';
import { ErrorFallbackUI } from './ErrorFallbackUI';
import { GENERAL_ERROR_CONTENT } from './errorContent';

const ErrorBoundaryFallback = ({ error }: FallbackProps) => {
  console.log(error);
  const handleReset = () => {
    window.location.assign('/');
  };

  return <ErrorFallbackUI onAction={handleReset} content={GENERAL_ERROR_CONTENT} />;
};

export default ErrorBoundaryFallback;
