import { useNavigate } from 'react-router-dom';
import { ErrorFallbackUI } from './ErrorFallbackUI';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <ErrorFallbackUI
      onAction={() => navigate('/')}
      title="404 - Page Not Found"
      message="It looks like you've wandered into deep waters. This page doesn't exist."
      buttonText="Return Home"
    />
  );
};
