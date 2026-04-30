import { useNavigate } from 'react-router';
import { ErrorFallbackUI } from './ErrorFallbackUI';
import { NOT_FOUND_CONTENT } from './errorContent';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    void navigate('/');
  };
  return <ErrorFallbackUI onAction={handleClick} content={NOT_FOUND_CONTENT} />;
};
