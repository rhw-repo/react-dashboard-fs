'use no memo';
import { useQuery } from '@tanstack/react-query';
import type { Person } from '../../../types/types';
import { fetchData } from '../utils/api';
//import { person } from '../../../data/data';
import { TaskTimelineTable } from './TaskTimelineTable';
import Navbar from '../navbar/Navbar';
import { BurnUpChart } from '../burn-up-chart/BurnUpChart';

// Fallback in case undefined during loading following the useQuery call
const EMPTY_DATA: Person[] = [];

export default function TaskTimeLinePage() {
  'use no memo';
  // Single data fetch - reused for all three tables
 // const data = person as Person[];

 const { data: fetchedData, isLoading, isError, error } = useQuery({
queryKey: ["timelineTasks"],
queryFn: () => fetchData<Person[]>("/data/asset/data/mock-table-data.json")
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

    // TEMP: TODO PROVIDE CORRECT UI TO INDICATE A LOADING STATE 
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // TEMP: TODO PROVIDE CORRECT UI FOR ERROR MESSAGE 
  if (isError) {
  return <div>An error has occurred: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }

// Expected: guaranteed Person[] array - fetchedData can be undefined whilst loading
// Using EMPTY_DATA (defined outside function) maintains a stable memory reference.
// Fallback to stable reference; prevents unnecessary Table re-renders if not loaded
const safeData = fetchedData ?? EMPTY_DATA;

  return (
    <div className="mx-auto grid h-screen max-w-550 grid-cols-[5%_95%] overflow-auto">
      <aside className="justify-self-end">
        <Navbar />{' '}
      </aside>
      <main className="col-start-2 h-full overflow-x-auto py-10">
        <article className="grid min-w-max grid-cols-3 gap-4">
          <TaskTimelineTable data={safeData} initialColumnVisibility={visibility1} />
          <TaskTimelineTable data={safeData} initialColumnVisibility={visibility2} />
          <TaskTimelineTable data={safeData} initialColumnVisibility={visibility3} />
        </article>
        <article className="mt-8 grid h-1/2 grid-cols-2 gap-4">
          <BurnUpChart />
        </article>
      </main>
    </div>
  );
}
