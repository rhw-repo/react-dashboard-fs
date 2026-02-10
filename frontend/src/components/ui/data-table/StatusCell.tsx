import { type CellContext } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Person } from "../../../types/types";

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

export function StatusMenu({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={`Status menu for ${name}`}
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
  );
}

export function StatusCell(info: CellContext<Person, Person["status"]>) {
  const status = info.getValue();
  const name = info.row.original.name;

  return (
    <div className="flex items-center justify-between gap-2">
      <span className={statusPillClass(status)}>{status}</span>
      <StatusMenu name={name} />
    </div>
  );
}
