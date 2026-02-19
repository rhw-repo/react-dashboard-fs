"use no memo";
import { columns } from "./columns";
import { person } from "../../../data/data";
import { DataTable } from "./data-table";

export default function DemoPage() {
  "use no memo";
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={person} />
    </div>
  );
}
