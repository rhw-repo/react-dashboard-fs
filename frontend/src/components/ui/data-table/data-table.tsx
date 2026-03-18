//'use no memo';
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

/*interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}*/

interface DataTableProps<TData extends { id: string }> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

function getSelectAllState(pageCount: number, selectedInPageCount: number): CheckedState {
  if (pageCount === 0 || selectedInPageCount === 0) return false;
  if (selectedInPageCount === pageCount) return true;
  return 'indeterminate';
}

// export function DataTable<TData extends { id: string }, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
export function DataTable<TData extends { id: string }>({ columns, data }: DataTableProps<TData>) {
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
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
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

  const selectedInPageCount = React.useMemo(() => {
    let count = 0;
    for (const id of selectedRows) if (pageIdSet.has(id)) count++;
    return count;
  }, [selectedRows, pageIdSet]);

  const pageCount = pageRowIds.length;

  const selectAllState = getSelectAllState(pageCount, selectedInPageCount);

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
      <div className={`overflow-hidden rounded-md border-0 lg:border ${styles['table-responsive']}`}>
        {/* Default: stacked grid (mobile). from `lg:` revert to semantic table */}
        <Table className="block text-neutral-50 lg:table lg:table-fixed">
          {/* Column headers: hidden on mobile, visible from `lg:` */}
          <TableHeader className="hidden lg:table-header-group">
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id} className="grid grid-cols-[1fr_2fr] p-4 lg:table-row">
                <TableHead className="hidden w-4 max-w-8 min-w-4 lg:table-cell [&:has([role=checkbox])]:px-0">
                  <div className="flex h-full w-full items-center justify-center">
                    <Checkbox
                      checked={selectAllState}
                      onCheckedChange={handleSelectAll}
                      className="mx-auto translate-y-0 rounded-sm"
                      aria-label="Select all rows on this page"
                    />
                  </div>
                </TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="hidden border-x border-neutral-50 text-neutral-50 lg:table-cell"
                    style={{
                      width: `${header.getSize()}px`,
                      minWidth: header.column.columnDef.minSize ? `${header.column.columnDef.minSize}px` : undefined,
                      maxWidth: header.column.columnDef.maxSize ? `${header.column.columnDef.maxSize}px` : undefined,
                    }}
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
                      'grid grid-cols-1 gap-2 border border-neutral-50 p-3 data-[state=selected]:bg-gray-800 data-[state=selected]:text-neutral-50 lg:table-row lg:border-x lg:border-accent lg:p-0'
                    }
                  >
                    {/* per-row checkbox (always shown) */}
                    <TableCell className="block lg:table-cell">
                      <div className="flex items-center justify-center space-x-2">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => handleSelectRow(id, checked === true)}
                          className="rounded-sm"
                          aria-label={`Select row ${id}`}
                        />
                      </div>
                    </TableCell>

                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id} className={`block lg:table-cell lg:border-x lg:border-neutral-50`}>
                          <div className="mt-1 truncate lg:mt-0">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow className="grid grid-cols-1 p-4 lg:table-row">
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center space-x-2 py-4">
        <p className="text-center">Temp display: pagination server side</p>
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
