import { useQuery, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { fetchData } from '../utils/api';
import type { Person } from '../../../types/types';
import { TaskTimelineTable } from './TaskTimelineTable';
import EmptyLoadingSpinner from '../loading-fallback-ui/EmptyLoadingSpinner';
import { ErrorFallbackUI } from '../error-fallback-ui/ErrorFallbackUI';
import { GENERAL_ERROR_CONTENT } from '../error-fallback-ui/errorContent';

const EMPTY_DATA: Person[] = [];

export function TaskTimelineSection() {
  /*const { data: fetchedData } = useQuery({
    queryKey: ['timelineTasks'],
   /* queryFn: () => fetchData<Person[]>('/data/asset/data/mock-table-data.json'),
    throwOnError: true, */

  // TEST display of ErrorBoundaryFallbackUI by passing in non-existant path
  const { data: fetchedData, isLoading } = useQuery({
    queryKey: ['timelineTasks'],
    // Pass a non-existent path to trigger the !response.ok block
    queryFn: () => fetchData<Person[]>('/data/asset/data/THIS-FILE-DOES-NOT-EXIST.json'),
    throwOnError: true,
    retry: false, // Prevents waiting for 3 retries
  });

  const safeData = fetchedData ?? EMPTY_DATA;

  // Table 1
  const todoVisibility = {
    status: true,
    name: true,
    nextTask: true,
    taskDeadline: true,
    status2: true,
  };

  // Table 2
  const inProgressVisibility = {
    status: true,
    name: true,
    nextTask: true,
    taskDeadline: true,
    status2: true,
  };

  // Table 3
  const doneVisibility = {
    status: true,
    name: true,
    nextTask: true,
    taskDeadline: true,
    status2: true,
  };

  if (isLoading) {
    return <EmptyLoadingSpinner />;
  }

  return (
    <article className="flex w-max gap-4">
      <TaskTimelineTable data={safeData} initialColumnVisibility={todoVisibility} />
      <TaskTimelineTable data={safeData} initialColumnVisibility={inProgressVisibility} />
      <TaskTimelineTable data={safeData} initialColumnVisibility={doneVisibility} />
    </article>
  );
}

export function TaskTimelineSectionWrapper() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className="relative h-[40vh] w-full overflow-hidden rounded-xl border border-dashed border-white/10">
              <div className="absolute -top-20 left-1/2 w-full max-w-4xl origin-top -translate-x-1/2 scale-[0.5] pt-0">
                <ErrorFallbackUI onAction={resetErrorBoundary} content={GENERAL_ERROR_CONTENT} />
              </div>
            </div>
          )}
        >
          <TaskTimelineSection />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
