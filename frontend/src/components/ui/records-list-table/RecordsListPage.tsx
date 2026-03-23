'use no memo';
import type { Person } from '../../../types/types';
import { person } from '../../../data/data';
import { RecordsListTable } from './RecordsListTable';
import Navbar from '../navbar/Navbar';

export default function RecordsListTablePage() {
  'use no memo';
  const data = person as Person[];

  const visibility = {
    select: true,
    status: true,
    name: true,
    nextTask: true,
    taskDeadline: true,
    status2: true,
  };

  return (
    <div className="mx-auto grid max-w-550 grid-cols-[1fr_9fr] overflow-auto py-10">
      <aside className="justify-self-end">
        <Navbar />
      </aside>
      <main className="col-start-2">
        <RecordsListTable data={data} initialColumnVisibility={visibility} />
      </main>
    </div>
  );
}
