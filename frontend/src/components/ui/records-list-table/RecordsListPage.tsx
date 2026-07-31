'use no memo';
import { useQuery } from '@tanstack/react-query';
import type { FullPerson } from '../../../types/types';
import { fetchData } from '../utils/fetchData';
import { API_ENDPOINTS } from '../utils/endpoints';
//import { person } from '../../../data/data';
import { RecordsListTable } from './RecordsListTable';
import Navbar from '../navbar/Navbar';
import EmptyLoadingSpinner from '../loading-fallback-ui/EmptyLoadingSpinner';
import { Button } from '../Button';

// Fallback in case undefined during loading following the useQuery call
const EMPTY_DATA: FullPerson[] = [];

export default function RecordsListTablePage() {
  'use no memo';

  const { data: fetchedData, isLoading } = useQuery({
    queryKey: ['people'],
    queryFn: ({ signal }) => fetchData<FullPerson[]>(API_ENDPOINTS.people, signal),
    refetchInterval: 15_000,
    refetchIntervalInBackground: true,
    throwOnError: true,
  });

  const visibility = {
    select: true,
    status: true,
    name: true,
    nextTask: true,
    taskDeadline: true,
    status2: true,
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <EmptyLoadingSpinner />
      </div>
    );
  }

  // Expected: guaranteed Person[] array
  // fetchedData can be undefined whilst loading
  // Using EMPTY_DATA (defined outside function) maintains a stable memory reference.
  // Fallback to stable reference; prevents unnecessary Table re-renders if so
  const safeData = fetchedData ?? EMPTY_DATA;

  return (
    <div className="mx-auto min-h-screen grid max-w-550 grid-cols-[1fr_9fr] overflow-auto py-10">
      <aside className="justify-self-end">
        <Navbar />
      </aside>
      <main className="col-start-2 place-content-center justify-self-center">
        <Button variant="outline" className="mx-4">Archive</Button>
        <RecordsListTable data={safeData} initialColumnVisibility={visibility} />
      </main>
    </div>
  );
}
