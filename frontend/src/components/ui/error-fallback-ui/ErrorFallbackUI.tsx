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
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4 sm:p-8 md:p-12 dark:bg-slate-950">
      <Card className="flex min-h-[75vh] w-full max-w-5xl flex-col overflow-hidden border-slate-300 bg-slate-700 text-slate-50 shadow-xl">
        <CardContent className="flex flex-1 flex-col items-center justify-center p-8 text-center sm:p-12 md:p-16">
          {content.imageSrc && (
            <img
              src={content.imageSrc}
              alt={content.imageAlt}
              className="mx-auto mb-6 max-w-sm rounded-2xl"
            />
          )}
          <h2 className="mb-8 text-6xl tracking-wide whitespace-pre-line">
           {content.title}
          </h2>

          <p className="py-4 text-3xl font-semibold tracking-wide">{content.description}</p>
          <p className="pt-4 pb-16 text-3xl font-semibold tracking-wide">
            {content.instruction}
          </p>
          <Button
            onClick={onAction}
            className="rounded-sm border border-neutral-50 bg-blue-950 p-8 text-2xl text-neutral-50 transition-colors hover:bg-blue-900"
          >
            {content.buttonText}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
