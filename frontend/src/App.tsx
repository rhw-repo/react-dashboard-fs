import TestButton from "./components/TestButton";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <main className="bg-cyan-950 w-full h-screen flex justify-center items-center">
        <section className="flex justify-center items-center gap-8">
          <TestButton />
          <Button>shadcn Button</Button>
        </section>
      </main>
    </>
  );
}

export default App;
