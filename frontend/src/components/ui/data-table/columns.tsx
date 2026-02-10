// "use client"; - redundant not using Next.js

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
//import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Person = {
  id: string;
  name: string;
  address: string;
  postcode: string;
  status: "uncontacted" | "contacted" | "success" | "failed";
  email: string;
};

// Temp: no db at this time
const STATUS_OPTIONS: Person["status"][] = [
  "uncontacted",
  "contacted",
  "success",
  "failed",
];

function statusPillClass(status: Person["status"]) {
  switch (status) {
    case "contacted":
      return "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-600/20 text-emerald-400";
    case "success":
      return "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-600/20 text-green-400";
    case "failed":
      return "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-600/20 text-red-400";
    case "uncontacted":
    default:
      return "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-600/10 text-slate-200";
  }
}

export const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row, getValue }) => {
      const status = getValue() as Person["status"];
      return (
        <div className="flex items-center justify-between gap-2">
          <span className={statusPillClass(status)}>{status}</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label={`Status menu for ${row.original.name}`}
                className="p-0"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-35">
              <DropdownMenuLabel>Set status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {STATUS_OPTIONS.map((opt) => (
                <DropdownMenuItem key={opt} className="capitalize">
                  {opt}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "postcode",
    header: "Postcode",
  },
];
