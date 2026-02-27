import DemoPage from './components/ui/data-table/page';
import { Profiler } from 'react';

function App() {
  function onRender(
    id: string,
    phase: 'mount' | 'update' | 'nested-update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
  ) {
    console.log(
      `[Profiler:${id}] phase=${phase} actual=${actualDuration.toFixed(2)}ms base=${baseDuration.toFixed(2)}ms start=${startTime.toFixed(2)} commit=${commitTime.toFixed(2)}`,
    );
  }

  return (
    <>
      <main className="flex min-h-dvh w-full justify-center bg-stone-950 sm:items-center">
        <section className="flex items-center gap-8"></section>
        <Profiler id="DemoPage" onRender={onRender}>
          <DemoPage />
        </Profiler>
      </main>
    </>
  );
}

export default App;
