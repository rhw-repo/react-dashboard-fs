import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Person } from "../../../types/types";
import { StatusCell } from "./StatusCell";

const columnHelper = createColumnHelper<Person>();

export const columns = [
  columnHelper.accessor("status", {
    header: "Status",
    cell: StatusCell,
    enableSorting: true,
  }),

  columnHelper.accessor("name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor("address", {
    header: "Address",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor("postcode", {
    header: "Postcode",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
];
