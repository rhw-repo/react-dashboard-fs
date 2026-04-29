import { type FallbackProps } from 'react-error-boundary';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';


//TODO: SB - error logging tbc
const ErrorBoundaryFallback = ({ error }: FallbackProps) => {
   const handleClick = () => {
      window.location.href = "/";
   }

  return (
    <main role="alert">
      {/*
<h2>Something went wrong outside the router</h2>
      <pre style={{ color: 'red', border: '2px solid pink', padding: '20px', fontSize: '3rem' }}>
        {(error as Error).message}
      </pre>
        */}

      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4 sm:p-8 md:p-12 dark:bg-slate-950">
        <Card className="flex min-h-[75vh] w-full max-w-5xl flex-col overflow-hidden border-slate-300 bg-slate-700 text-slate-50 shadow-xl">
          <CardContent className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            {/*<img
              src="/images/pavel-herceg-zWOQD6fFCBs-unsplash.webp"
              alt="A dog with a puzzled expression sits behind a blank laptop"
              className="max-w-m m-12 mx-auto rounded-2xl"
            />*/}
            <h2 className="mb-8 text-6xl tracking-wide">
     There seems to be a <br />
              glitch somewhere.
            </h2>

            <p className="py-4 text-3xl font-semibold tracking-wide">We aren't sure what went wrong. </p>
            <p className="py-4 text-3xl font-semibold tracking-wide"> </p>
            <p className="pt-4 pb-16 text-3xl font-semibold tracking-wide">
              Refresh the page or use the Go Home button to go back.
            </p>

            <Button onClick={handleClick} className="rounded-sm border border-neutral-50 bg-blue-950 p-8 text-2xl text-neutral-50 transition-colors hover:bg-blue-900">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ErrorBoundaryFallback;
