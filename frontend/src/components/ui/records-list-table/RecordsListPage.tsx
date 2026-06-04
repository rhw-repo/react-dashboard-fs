'use no memo';
import { useQuery } from '@tanstack/react-query';
import type { Person } from '../../../types/types';
import { fetchData } from '../utils/fetchData';
import { RecordsListTable } from './RecordsListTable';
import Navbar from '../navbar/Navbar';
import EmptyLoadingSpinner from '../loading-fallback-ui/EmptyLoadingSpinner';

const EMPTY_DATA: Person[] = [];

export default function RecordsListTablePage() {
  'use no memo';

  const { data: fetchedData, isLoading } = useQuery({
    queryKey: ['recordsListData'],
    queryFn: ({ signal }) => fetchData<Person[]>('/data/asset/data/mock-table-data.json', signal),
    // Uncomment for polling
    /*
    refetchInterval: 15_000,
    refetchIntervalInBackground: true,
    */
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

  const safeData = fetchedData ?? EMPTY_DATA;

  return (
    <div className="mx-auto grid min-h-screen max-w-550 grid-cols-[1fr_9fr] overflow-auto py-10">
      <aside className="justify-self-end">
        <Navbar />
      </aside>
      <main className="col-start-2 place-content-center">
        <RecordsListTable data={safeData} initialColumnVisibility={visibility} />
      </main>
    </div>
  );
}
