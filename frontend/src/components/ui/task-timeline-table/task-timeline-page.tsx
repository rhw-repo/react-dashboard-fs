'use no memo';
import type { Person } from '../../../types/types';
import { person } from '../../../data/data';
import { TaskTimelineTable } from './task-timeline-table';
import Navbar from '../navbar/navbar';

export default function TaskTimeLinePage() {
  'use no memo';
  // Single data fetch - reused for all three tables
  const data = person as Person[];

  // Table 1: All columns including select
  const visibility1 = {
    select: true,
    status: true,
    name: true,
    nextTask: true,
    taskDeadline: true,
    status2: true,
  };

  // Table 2: Hide select, focus on tasks
  const visibility2 = {
    select: false,
    status: true,
    name: true,
    nextTask: true,
    taskDeadline: true,
    status2: false,
  };

  // Table 3: Hide select, focus on status
  const visibility3 = {
    select: false,
    status: true,
    name: true,
    nextTask: false,
    taskDeadline: false,
    status2: true,
  };

  return (
    <div className="grid-cols-[1fr 9fr] container grid min-w-screen py-10">
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
