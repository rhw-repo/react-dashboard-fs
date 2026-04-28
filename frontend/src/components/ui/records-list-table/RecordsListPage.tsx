'use no memo';
import { useQuery } from '@tanstack/react-query';
import type { Person } from '../../../types/types';
import { fetchData } from '../utils/api';
//import { person } from '../../../data/data';
import { RecordsListTable } from './RecordsListTable';
import Navbar from '../navbar/Navbar';

// Fallback in case undefined during loading following the useQuery call
const EMPTY_DATA: Person[] = [];

export default function RecordsListTablePage() {
  'use no memo';
 // const data = person as Person[];

  const { data: fetchedData, isLoading, isError, error } = useQuery({
queryKey: ["recordsListData"],
queryFn: () => fetchData<Person[]>("/data/asset/data/mock-table-data.json")
 });

  const visibility = {
    select: true,
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

  // Expected: guaranteed Person[] array 
// fetchedData can be undefined whilst loading
// Using EMPTY_DATA (defined outside function) maintains a stable memory reference.
// Fallback to stable reference; prevents unnecessary Table re-renders if so
const safeData = fetchedData ?? EMPTY_DATA;

  return (
    <div className="mx-auto grid max-w-550 grid-cols-[1fr_9fr] overflow-auto py-10">
      <aside className="justify-self-end">
        <Navbar />
      </aside>
      <main className="col-start-2">
        <RecordsListTable data={safeData} initialColumnVisibility={visibility} />
      </main>
    </div>
  );
}
