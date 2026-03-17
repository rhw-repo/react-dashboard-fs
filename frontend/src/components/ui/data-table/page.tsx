'use no memo';
import { columns } from './columns';
import { person } from '../../../data/data';
import { DataTable } from './data-table';
import Navbar from '../navbar/navbar';

export default function DemoPage() {
  'use no memo';
  return (
    <div className="grid-cols-[1fr 9fr] container mx-auto grid gap-4 py-10">
      <aside>
        <Navbar />{' '}
      </aside>
      <main className="col-start-2">
        <article>
          <DataTable columns={columns} data={person} />
        </article>
      </main>
    </div>
  );
}
