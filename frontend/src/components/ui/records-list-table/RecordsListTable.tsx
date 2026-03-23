'use no memo';
// see https://react.dev/reference/react-compiler/directives/use-no-memo
/* Disable optimisation prevent memoization breaking table functionality:
   TanStack table returns a stable reference for table, so that means that
   we cannot get the freshest updates during renders, unless we opt out of memoization.
   https://github.com/facebook/react/issues/33057
*/
import * as React from 'react';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { Button } from '@/components/ui/Button';
//import styles from './RecordsListTable.module.css';
import { getColumns } from './RecordsListColumns';
import type { Person } from '../../../types/types';

import {
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';

// Type-safe column visibility configuration
type ColumnId = 'select' | 'status' | 'name' | 'nextTask' | 'taskDeadline' | 'status2';
type SafeColumnVisibility = Partial<Record<ColumnId, boolean>>;

interface DataTableProps {
  data: Person[];
  initialColumnVisibility?: SafeColumnVisibility;
}

function getSelectAllState(pageCount: number, selectedInPageCount: number): CheckedState {
  if (pageCount === 0 || selectedInPageCount === 0) return false;
  if (selectedInPageCount === pageCount) return true;
  return 'indeterminate';
}

export function RecordsListTable({ data, initialColumnVisibility }: DataTableProps): React.ReactNode {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set());

  const pageRowIds = React.useMemo(() => data.map((row) => row.id), [data]);
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

  const columns = getColumns(selectedRows, selectAllState, handleSelectAll, handleSelectRow);

  const table = useReactTable<Person>({
    columns,
    data,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      columnVisibility: initialColumnVisibility || {
        select: false,
        status: true,
        name: true,
        nextTask: true,
        taskDeadline: true,
        status2: true,
      },
    },
  });

  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;
  const totalWidth = table.getTotalSize();

  {
    /*<div className={`overflow-hidden rounded-md border-0 lg:border ${styles['table-responsive']}`}>*/
  }
  return (
    <div>
      <div className="w-fit overflow-hidden rounded-md border">
        {/* Default: was stacked grid (mobile). from `lg:` revert to semantic table - TBC */}
        <Table
          responsiveWidth={false}
          className="table table-fixed text-neutral-50"
          style={{ width: `${totalWidth}px` }}
        >
          {/* Column headers: were hidden on mobile, visible from `lg:` TBC*/}
          <TableHeader className="table-header-group">
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="border-x border-neutral-50 text-neutral-50 [&:has([role=checkbox])]:px-0"
                    style={{
                      width: `${header.column.columnDef.size}px`,
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
                    className={'border-accent data-[state=selected]:bg-gray-800 data-[state=selected]:text-neutral-50'}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          className={`border-x border-neutral-50`}
                          style={{
                            width: `${cell.column.columnDef.size}px`,
                          }}
                        >
                          <div className="truncate">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
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
