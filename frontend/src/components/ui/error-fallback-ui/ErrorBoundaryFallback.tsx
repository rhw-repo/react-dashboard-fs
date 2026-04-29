import { type FallbackProps } from 'react-error-boundary';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

const ErrorBoundaryFallback = ({ error }: FallbackProps) => {
  return (
    <main role="alert">
      {/*
<h2>Something went wrong outside the router</h2>
      <pre style={{ color: 'red', border: '2px solid pink', padding: '20px', fontSize: '3rem' }}>
        {(error as Error).message}
      </pre>
        */}

      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4 sm:p-8 md:p-12 dark:bg-slate-950">
      <Card className="flex min-h-[75vh] w-full max-w-5xl flex-col overflow-hidden bg-slate-700 text-slate-50 border-slate-300 shadow-xl">
          
            <img
              src="/images/ayla-verschueren--JoaQtty2a4-unsplash.webp"
              alt="A dog with a puzzled expression sits behind a blank laptop"
              className="mx-auto max-w-sm pt-8"
            />
      
          <CardContent className="flex flex-1 flex-col items-center justify-center p-8 text-center sm:p-12 md:p-16">
            <h2 className="p-8 text-6xl tracking-wide">
              There seems to be a <br/>glitch somewhere.
            </h2>
            <h3 className='p-16 text-2xl'>We're not sure what went wrong. <br/>You can refresh or use the Go Home button to go back.</h3>
            <Button className="rounded-sm border border-neutral-50 bg-blue-950 p-8 text-2xl text-neutral-50">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ErrorBoundaryFallback;
