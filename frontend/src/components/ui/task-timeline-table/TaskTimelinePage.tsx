'use no memo';
import Navbar from '../navbar/Navbar';
import { BurnUpChart } from '../burn-up-chart/BurnUpChart';
import { TaskTimelineSectionWrapper } from './TaskTimeLineTablesSection';

export default function TaskTimeLinePage() {
  'use no memo';
  return (
    <div className="h-screen w-full overflow-auto">
    <div className="mx-auto grid h-max min-h-full w-max min-w-[1200px] max-w-550 grid-cols-[9rem_1fr] border-2 border-transparent [border-image:linear-gradient(to_top,#4f46e5,#18181b)_1]">
      <aside className="justify-self-start">
        <Navbar />{' '}
      </aside>

      <main className="col-start-2 min-h-full  min-w-full py-10">
        <article className="flex w-full gap-4">
          <div className="flex-1 px-20">
            <TaskTimelineSectionWrapper />
          </div>
        </article>

        <article className="mt-24 grid h-[550px] w-full grid-cols-2 gap-4 px-20">
          <div className="col-span-1 col-start-1 h-full">
            <BurnUpChart />
          </div>

          <div className="relative col-span-1 col-start-2 h-full shadow-xl shadow-indigo-500/50">
            <p className="absolute top-4 left-4 z-10 rounded bg-black/60 px-2 py-1 text-[17px] font-extralight text-white backdrop-blur-sm">
              Placeholder for Kanban Board
            </p>
            <img
              src="https://mintcdn.com/kan/tZr6SCXtNIaMjnC7/images/hero-dark.png?w=2500&fit=max&auto=format&n=tZr6SCXtNIaMjnC7&q=85&s=e3c16964a05107ab04b31add4a7efa47"
              alt="Temporary placeholder image of kanban board to demo the layout"
              className="absolute inset-0 h-full w-full max-w-none rounded-md bg-muted/20 object-contain"
            />
          </div>
        </article>
      </main>
    </div>
    </div>
  );
}