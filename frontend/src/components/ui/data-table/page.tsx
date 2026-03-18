'use no memo';
import { columns } from './columns';
import type { Person } from '../../../types/types';
import { person } from '../../../data/data';
import { DataTable } from './data-table';
import Navbar from '../navbar/navbar';

export default function DemoPage() {
  'use no memo';
  return (
    <div className="grid-cols-[1fr 9fr] container mx-auto grid py-10">
      <aside>
        <Navbar />{' '}
      </aside>
      <main className="col-start-2">
        <article className="grid grid-cols-3 gap-4">
          <DataTable<Person> columns={columns} data={person as Person[]} />
          <DataTable<Person> columns={columns} data={person as Person[]} />
          <DataTable<Person> columns={columns} data={person as Person[]} />
        </article>
      </main>
    </div>
  );
}
