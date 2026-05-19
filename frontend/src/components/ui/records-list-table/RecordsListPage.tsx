'use no memo';
import { useQuery } from '@tanstack/react-query';
import type { Person } from '../../../types/types';
import { fetchData } from '../utils/fetchData';
//import { person } from '../../../data/data';
import { RecordsListTable } from './RecordsListTable';
import Navbar from '../navbar/Navbar';
import EmptyLoadingSpinner from '../loading-fallback-ui/EmptyLoadingSpinner';

// Fallback in case undefined during loading following the useQuery call
const EMPTY_DATA: Person[] = [];

export default function RecordsListTablePage() {
  'use no memo';
  // const data = person as Person[];

  // Set state fot the required polling time in milliseconds 
  // const [intervalMs, setIntervalMs] = useState(15000);

  const { data: fetchedData, isLoading } = useQuery({
    queryKey: ['recordsListData'],
    queryFn: ({ signal}) => fetchData<Person[]>('/data/asset/data/mock-table-data.json', signal
    ),
    /*
    configure correct path from this example to set up polling 
    queryFn: async () => {
      const res = await fetch('/api/data')
      return res.data
    },
    // Refetch the data every 15 seconds when browser in focus
    refetchInterval: intervalMS, 
    // Ensure that refetch happens even when browser not in focus 
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
      <main className="col-start-2 place-content-center">
        <RecordsListTable data={safeData} initialColumnVisibility={visibility} />
      </main>
    </div>
  );
}
