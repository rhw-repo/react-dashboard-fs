"use no memo";
// see https://react.dev/reference/react-compiler/directives/use-no-memo
/* Disable optimisation prevent memoization breaking table functionality:
"TanStack table returns a stable reference for table, so that means that
we cannot get the freshest updates during renders, unless we opt out of memoization."
https://github.com/facebook/react/issues/33057
*/
import * as React from "react";
import { Button } from "../button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(
    new Set(),
  );

  const allSelected = selectedRows.size === data.length && data.length > 0;

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? new Set(data.map((row) => row.id)) : new Set());
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const table = useReactTable<TData>({
    columns,
    data,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Stable between renders
  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table className="text-neutral-50">
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {/* ✓ master checkbox */}
                <TableHead className="w-8">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-neutral-50 border-x border-neutral-50"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => {
                const id = row.original.id;
                const isSel = selectedRows.has(id);
                return (
                  <TableRow
                    key={row.id}
                    data-state={isSel ? "selected" : undefined}
                  >
                    {/* per-row checkbox */}
                    <TableCell>
                      <Checkbox
                        checked={isSel}
                        onCheckedChange={(v) => handleSelectRow(id, v === true)}
                      />
                    </TableCell>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="border-x border-neutral-50"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {" "}
          {">>"}
        </Button>
      </div>
    </div>
  );
}
