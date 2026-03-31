'use no memo';
import type { Person } from '../../../types/types';
import { person } from '../../../data/data';
import { TaskTimelineTable } from './TaskTimelineTable';
import Navbar from '../navbar/Navbar';
import { BurnUpChart } from '../burn-up-chart/BurnUpChart';

export default function TaskTimeLinePage() {
  'use no memo';
  // Single data fetch - reused for all three tables
  const data = person as Person[];

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

  return (
    <div className="mx-auto grid h-screen max-w-550 grid-cols-[5%_95%] overflow-auto">
      <aside className="justify-self-end">
        <Navbar />{' '}
      </aside>
      <main className="col-start-2 h-full overflow-x-auto py-10">
        <article className="grid min-w-max grid-cols-3 gap-4">
          <TaskTimelineTable data={data} initialColumnVisibility={visibility1} />
          <TaskTimelineTable data={data} initialColumnVisibility={visibility2} />
          <TaskTimelineTable data={data} initialColumnVisibility={visibility3} />
        </article>
        <article className="mt-4 grid h-96 grid-cols-2 gap-4">
          <BurnUpChart />
        </article>
      </main>
    </div>
  );
}
