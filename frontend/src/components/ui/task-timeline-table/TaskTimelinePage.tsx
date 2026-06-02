'use no memo';
import Navbar from '../navbar/Navbar';
import { BurnUpChart } from '../burn-up-chart/BurnUpChart';
import { TaskTimelineSectionWrapper } from './TaskTimeLineTablesSection';

export default function TaskTimeLinePage() {
  'use no memo';
  return (
    
    <div className="min-h-screen overflow-x-auto">
      <div className="mx-auto grid w-max min-w-full max-w-550 grid-cols-[9rem_1fr] border-2 border-transparent [border-image:linear-gradient(to_top,#4f46e5,#18181b)_1]" style={{minHeight: '100vh'}}>
      <aside className="justify-self-start">
        <Navbar />{' '}
      </aside>

      <main className="col-start-2 w-max min-w-full py-10">
        <article className="flex w-full gap-4">
          <div className="min-w-0 flex-1 px-20">
            <TaskTimelineSectionWrapper />
          </div>
        </article>

        <article className="mt-8 grid w-full grid-cols-2 gap-4" style={{ height: 'clamp(300px, 50vh, 600px)' }}>
          <div className="col-span-1 col-start-1 h-full min-w-0">
            <BurnUpChart />
          </div>

          <div className="relative col-span-1 col-start-2 h-full overflow-hidden shadow-xl shadow-indigo-500/50">
            <p className="absolute top-4 left-4 z-10 rounded bg-black/60 px-2 py-1 text-[17px] font-extralight text-white backdrop-blur-sm">
              Placeholder for Kanban Board
            </p>
            <img
              src="https://mintcdn.com/kan/tZr6SCXtNIaMjnC7/images/hero-dark.png?w=2500&fit=max&auto=format&n=tZr6SCXtNIaMjnC7&q=85&s=e3c16964a05107ab04b31add4a7efa47"
              alt="Temporary placeholder image of kanban board to demo the layout"
              className="h-full w-full max-w-full rounded-md bg-muted/20 object-contain aspect-video"
            />
          </div>
        </article>
      </main>
      </div>
    </div>
  );
}
