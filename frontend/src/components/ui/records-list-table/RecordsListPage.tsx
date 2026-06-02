'use no memo';
import { useQuery } from '@tanstack/react-query';
import type { Person } from '../../../types/types';
import { fetchData } from '../utils/api';
//import { person } from '../../../data/data';
import { RecordsListTable } from './RecordsListTable';
import Navbar from '../navbar/Navbar';
import EmptyLoadingSpinner from '../loading-fallback-ui/EmptyLoadingSpinner';

// Fallback in case undefined during loading following the useQuery call
const EMPTY_DATA: Person[] = [];

export default function RecordsListTablePage() {
  'use no memo';

  const {
    data: fetchedData,
    isLoading,
  } = useQuery({
    queryKey: ['recordsListData'],
    queryFn: () => fetchData<Person[]>('/data/asset/data/mock-table-data.json'),
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
    <div className="mx-auto grid min-h-screen max-w-550 grid-cols-[9rem_1fr] overflow-auto border-2 border-transparent [border-image:linear-gradient(to_top,#4f46e5,#18181b)_1]">
      <aside className="justify-self-start">
        <Navbar />
      </aside>
      <main className="col-start-2 flex place-content-center place-items-center min-h-screen">
        <RecordsListTable data={safeData} initialColumnVisibility={visibility} />
      </main>
    </div>
  );
}