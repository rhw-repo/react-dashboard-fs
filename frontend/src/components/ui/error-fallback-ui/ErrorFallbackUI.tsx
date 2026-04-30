import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import type { ErrorContent } from './errorContent';

interface ErrorFallbackUIProps {
  onAction: () => void;
  title?: string;
  message?: string;
  content: ErrorContent;
}

// TODO - images and text content SB tbc
export const ErrorFallbackUI = ({ onAction, content }: ErrorFallbackUIProps) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4 sm:p-8 md:p-12 dark:bg-slate-950">
      <Card className="flex min-h-[75vh] w-full max-w-5xl flex-col overflow-hidden border-slate-300 bg-slate-850 text-slate-50 shadow-xl dark:shadow-slate-700/20">
        <CardContent className="flex flex-1 flex-col items-center justify-center p-8 text-center sm:p-12 md:p-16">
          {content.imageSrc && (
            <img
              src={content.imageSrc}
              alt={content.imageAlt}
              className="mx-auto mb-6 w-full h-auto max-w-sm rounded-2xl object-cover"
            />
          )}
          <h1 className="mb-8 text-4xl font-normal sm:font-light sm:text-6xl text-neutral-100 tracking-wide whitespace-pre-line">
           {content.title}
          </h1>

          <h2 className="py-4 text-2xl sm:text-3xl font-normal tracking-wide text-neutral-100">{content.description}</h2>
          <h3 className="pt-4 pb-16 text-3xl sm:text-4xl font-normal tracking-wide text-yellow-300">
            {content.instruction}
          </h3>
          <Button
            onClick={onAction}
            className="rounded-sm border border-neutral-50 bg-blue-950 p-8 text-2xl text-neutral-50 transition-colors hover:bg-blue-900"
          >
            {content.buttonText}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};
