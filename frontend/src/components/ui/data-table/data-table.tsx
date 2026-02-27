'use no memo';
// see https://react.dev/reference/react-compiler/directives/use-no-memo
/* Disable optimisation prevent memoization breaking table functionality:
   TanStack table returns a stable reference for table, so that means that
   we cannot get the freshest updates during renders, unless we opt out of memoization.
   https://github.com/facebook/react/issues/33057
*/
import * as React from 'react';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import styles from './data-table.module.css';

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

  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  const pageRowIds = React.useMemo(() => rows.map((row) => row.original.id), [rows]);
  const pageIdSet = React.useMemo(() => new Set(pageRowIds), [pageRowIds]);

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
    if (checked === 'indeterminate') return;

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
      <div className={`m-4 overflow-hidden rounded-md border ${styles['table-responsive']}`}>
        {/* default: stacked grid (mobile). from `sm:` revert to semantic table */}
        <Table className="block text-neutral-50">
          {/* column headers: hidden on mobile, visible from `sm:` */}
          <TableHeader className="hidden sm:table-header-group">
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id} className="grid grid-cols-[1fr_2fr] p-4 sm:table-row">
                <TableHead className="hidden w-8 sm:table-cell">
                  <Checkbox
                    checked={selectAllState}
                    onCheckedChange={handleSelectAll}
                    className="rounded-sm"
                    aria-label="Select all rows on this page"
                  />
                </TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="hidden border-x border-neutral-50 text-neutral-50 sm:table-cell"
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
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
                    className={
                      'grid grid-cols-1 gap-2 border border-neutral-50 p-3 data-[state=selected]:bg-gray-800 data-[state=selected]:text-neutral-50 sm:table-row sm:border-x sm:border-accent sm:p-0'
                    }
                  >
                    {/* per-row checkbox (always shown) */}
                    <TableCell className="block sm:table-cell">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => handleSelectRow(id, checked === true)}
                          className="rounded-sm"
                          aria-label={`Select row ${id}`}
                        />
                      </div>
                    </TableCell>

                    {row.getVisibleCells().map((cell) => {
                      const colId = cell.column.id;
                      return (
                        <TableCell
                          key={cell.id}
                          className={`block sm:table-cell sm:border-x sm:border-neutral-50 ${colId === 'postcode' ? 'text-right tabular-nums' : ''}`}
                        >
                          {/* Stacked layout; TODO add labels in mobile  */}
                          <div className="mt-1 sm:mt-0">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow className="grid grid-cols-1 p-4 sm:table-row">
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
          {'>>'}
        </Button>
      </div>
    </div>
  );
}
