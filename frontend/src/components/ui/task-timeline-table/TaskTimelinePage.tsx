'use no memo';
//import { /*useQuery,*/ QueryErrorResetBoundary } from '@tanstack/react-query';
//import type { Person } from '../../../types/types';
//import { fetchData } from '../utils/api';
//import { person } from '../../../data/data';
//import { TaskTimelineTable } from './TaskTimelineTable';

//import EmptyLoadingSpinner from '@/components/ui/loading-fallback-ui/EmptyLoadingSpinner';
//import { ErrorBoundary } from 'react-error-boundary';
//import { ErrorFallbackUI } from '../error-fallback-ui/ErrorFallbackUI';
//import { GENERAL_ERROR_CONTENT } from '../error-fallback-ui/errorContent';
import Navbar from '../navbar/Navbar';
import { BurnUpChart } from '../burn-up-chart/BurnUpChart';
import { TaskTimelineSectionWrapper } from './TaskTimeLineTablesSection';

export default function TaskTimeLinePage() {
  'use no memo';
  return (
    <div className="mx-auto grid min-h-screen max-w-550 grid-cols-[5%_95%] px-20">
      <aside className="justify-self-end">
        <Navbar />{' '}
      </aside>

      <main className="col-start-2 h-full w-max min-w-full py-10">
   
              <article className="flex w-full gap-4">
                <div className="flex-1 min-w-0">
                <TaskTimelineSectionWrapper />
                </div>
              </article>
    
        <article className="mt-8 grid h-[50vh] w-full grid-cols-2 gap-4">
          <div className="col-span-1 col-start-1 h-full min-w-0">
            <BurnUpChart />
          </div>

          <div className="relative col-span-1 col-start-2 inline-block h-full w-237.5 align-top">
            <p className="absolute top-4 left-4 z-10 rounded bg-black/60 px-2 py-1 text-[17px] font-extralight text-white backdrop-blur-sm">
              Placeholder for Kanban Board
            </p>
            <img
              src="https://mintcdn.com/kan/tZr6SCXtNIaMjnC7/images/hero-dark.png?w=2500&fit=max&auto=format&n=tZr6SCXtNIaMjnC7&q=85&s=e3c16964a05107ab04b31add4a7efa47"
              alt="Temporary placeholder image of kanban board to demo the layout"
              className="h-full w-full max-w-none rounded-md bg-muted/20 object-contain"
            />
          </div>
        </article>
      </main>
    </div>
  );
}

// Fallback in case undefined during loading following the useQuery call
/*const EMPTY_DATA: Person[] = [];

export default function TaskTimeLinePage() {
  'use no memo';
  // Single data fetch - reused for all three tables

  const { data: fetchedData, isLoading } = useQuery({
    queryKey: ['timelineTasks'],
    queryFn: () => fetchData<Person[]>('/data/asset/data/mock-table-data.json'),
    throwOnError: true,
  });

  // Table 1
  const visibility1 = {
    status: true,
    name: true,
    nextTask: true,
    taskDeadline: true,
    status2: true,
  };

  // Table 2
  const visibility2 = {
    status: true,
    name: true,
    nextTask: true,
    taskDeadline: true,
    status2: true,
  };

  // Table 3
  const visibility3 = {
    status: true,
    name: true,
    nextTask: true,
    taskDeadline: true,
    status2: true,
  };

  if (isLoading) {
    return <EmptyLoadingSpinner />;
  }

  // Expected: guaranteed Person[] array
  // fetchedData can be undefined whilst loading
  // Using EMPTY_DATA (defined outside function) maintains a stable memory reference.
  // Fallback to stable reference; prevents unnecessary Table re-renders if so
  const safeData = fetchedData ?? EMPTY_DATA;

  // TESTING const reset = () => window.location.reload();

  // TEMP trigger RouteErrorFallback.tsx to test
  // TODO delete line below and comment above
  //throw new Error("Testing my error boundary for errors inside the router!");

  */

/*   <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              // Button fires 'resetErrorBoundary' 
              fallbackRender={({ resetErrorBoundary }) => (
                <ErrorFallbackUI onAction={resetErrorBoundary} content={GENERAL_ERROR_CONTENT} />
              )}
            >
              <article className="flex w-max gap-4">
                <TaskTimelineTable data={safeData} initialColumnVisibility={visibility1} />
                <TaskTimelineTable data={safeData} initialColumnVisibility={visibility2} />
                <TaskTimelineTable data={safeData} initialColumnVisibility={visibility3} />
              </article>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        */
