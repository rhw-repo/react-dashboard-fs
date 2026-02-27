'use no memo';
// see https://react.dev/reference/react-compiler/directives/use-no-memo
/* Disable optimisation prevent memoization breaking table functionality:
"TanStack table returns a stable reference for table, so that means that
we cannot get the freshest updates during renders, unless we opt out of memoization."
https://github.com/facebook/react/issues/33057
*/
import * as React from 'react';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends { id: string }, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(() => new Set());

  const table = useReactTable<TData>({
    columns,
    data,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Stable between renders as per Tanstack Table docs
  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  // Page-scoped ids
  const pageRowIds = React.useMemo(() => rows.map((row) => row.original.id), [rows]);
  const pageIdSet = React.useMemo(() => new Set(pageRowIds), [pageRowIds]);

  // Prune selection to current page whenever page changes
  React.useEffect(() => {
    setSelectedRows((prev) => {
      if (prev.size === 0) return prev;

      let changed = false;
      const next = new Set<string>();
      for (const id of prev) {
        if (pageIdSet.has(id)) next.add(id);
        else changed = true;
      }
      return changed ? next : prev;
    });
  }, [pageIdSet]);

  /* Compute 'select all rows on page' checkbox state 
  (tri-state) based on page-scoped selection. */
  const selectedInpageCount = React.useMemo(() => {
    let count = 0;
    for (const id of selectedRows) if (pageIdSet.has(id)) count++;
    return count;
  }, [selectedRows, pageIdSet]);

  const pageCount = pageRowIds.length;

  const selectAllState: CheckedState =
    pageCount === 0
      ? false
      : selectedInpageCount === 0
        ? false
        : selectedInpageCount === pageCount
          ? true
          : 'indeterminate';

  const handleSelectAll = (checked: CheckedState) => {
    if (checked === 'indeterminate') {
      return;
    }

    setSelectedRows((prev) => {
      const next = new Set(prev);

      if (checked === true) {
        for (const id of pageRowIds) next.add(id);
      } else {
        for (const id of pageRowIds) next.delete(id);
      }

      return next;
    });
  };

  const handleSelectRow = (id: string, isChecked: boolean) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (isChecked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table className="text-neutral-50">
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {/* Select-all checkbox (current page) */}
                <TableHead className="w-8">
                  <Checkbox
                    checked={selectAllState}
                    onCheckedChange={handleSelectAll}
                    className="rounded-sm"
                    aria-label="Select all rows on this page"
                  />
                </TableHead>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="border-x border-neutral-50 text-neutral-50">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                const isSelected = selectedRows.has(id);
                return (
                  <TableRow
                    key={row.id}
                    data-state={isSelected ? 'selected' : undefined}
                    className="data-[state=selected]:bg-gray-800 data-[state=selected]:text-neutral-50"
                  >
                    {/* Per-row checkbox */}
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleSelectRow(id, checked === true)}
                        className="rounded-sm"
                        aria-label={`Select row ${id}`}
                      />
                    </TableCell>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={`border-x border-neutral-50 ${cell.column.id === 'postcode' ? 'text-right tabular-nums' : ''}`}
                      >
                        {/* getContext() = "get the render props for this cell at this time",
                        memory peg = everything this cell needs to know to render itself */}
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button variant="outline" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
          {'<<'}
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
          {' '}
          {'>>'}
        </Button>
      </div>
    </div>
  );
}
