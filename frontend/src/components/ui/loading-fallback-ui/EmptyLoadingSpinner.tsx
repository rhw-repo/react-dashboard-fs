import { Spinner } from '@/components/ui/spinner';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

const EmptyLoadingSpinner = () => {
  return (
    <article className="flex h-full items-center justify-center">
      <div className="flex items-center gap-4 [--radius:1.2rem]">
        <Empty className="w-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner data-icon="inline-start" className="size-8" />
            </EmptyMedia>
            <EmptyTitle>Loading</EmptyTitle>
            <EmptyDescription>Please wait.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </article>
  );
};

export default EmptyLoadingSpinner;
