'use no memo';
import type { Person } from '../../../types/types';
import { person } from '../../../data/data';
import { TaskTimelineTable } from './TaskTimelineTable';
import Navbar from '../navbar/Navbar';

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
    <div className="grid-cols-[5% 95%] grid py-10">
      <aside>
        <Navbar />{' '}
      </aside>
      <main className="col-start-2">
        <article className="grid grid-cols-3 gap-4">
          <TaskTimelineTable data={data} initialColumnVisibility={visibility1} />
          <TaskTimelineTable data={data} initialColumnVisibility={visibility2} />
          <TaskTimelineTable data={data} initialColumnVisibility={visibility3} />
        </article>
      </main>
    </div>
  );
}
