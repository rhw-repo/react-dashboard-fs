'use no memo';
import type { Person } from '../../../types/types';
import { person } from '../../../data/data';
import { RecordsListTable } from './records-list-table';
import Navbar from '../navbar/navbar';

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
    <div className="grid-cols-[1fr 9fr] container grid min-w-screen py-10">
      <aside>
        <Navbar />
      </aside>
      <main className="col-start-2">
        <RecordsListTable data={data} initialColumnVisibility={visibility} />
      </main>
    </div>
  );
}
