import { DataTable } from "./components/ui/data-table/data-table";
import { columns } from "./components/ui/data-table/columns";
import { person } from "./components/data/data";

function App() {
  return (
    <>
      <main className="bg-neutral-50 w-full h-screen flex justify-center items-center">
        <section className="flex justify-center items-center gap-8">
          <DataTable columns={columns} data={person} />
        </section>
      </main>
    </>
  );
}

export default App;
