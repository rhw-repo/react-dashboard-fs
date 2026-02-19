"use no memo";
import { columns } from "./columns";
import { person } from "../../../data/data";
import { DataTable } from "./data-table";

export default function DemoPage() {
  "use no memo";
  return (
    //<div className="mx-auto py-10 max-w-sm sm:max-w-7xl md:max-w-7xl lg:max-w-7-xl">
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={person} />
    </div>
  );
}
