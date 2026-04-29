import { type FallbackProps } from "react-error-boundary";

const ErrorBoundaryFallback = ({ error }: FallbackProps) => {
    return (
        <div role="alert">
            <h2>Something went wrong outside the router</h2>
            <pre style={{ color: 'red', border:'2px solid pink', padding:'20px', fontSize:'3rem' }}>{(error as Error).message}</pre>
        </div>
    )
}

export default ErrorBoundaryFallback;