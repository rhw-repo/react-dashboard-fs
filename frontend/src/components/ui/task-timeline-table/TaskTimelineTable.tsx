'use no memo';
// see https://react.dev/reference/react-compiler/directives/use-no-memo
/* Disable optimisation prevent memoization breaking table functionality:
   TanStack table returns a stable reference for table, so that means that
   we cannot get the freshest updates during renders, unless we opt out of memoization.
   https://github.com/facebook/react/issues/33057
*/
import * as React from 'react';
import { Button } from '@/components/ui/Button';
// import styles from './TaskTimelineTable.module.css';
import { getColumns } from './TaskTimelineColumns';
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

export function TaskTimelineTable({ data, initialColumnVisibility }: DataTableProps): React.ReactNode {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const columns = getColumns();

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

  // Debug: log column info, id is derived from the accessorKey
  React.useEffect(() => {
    const totalSize = table.getTotalSize();
    headerGroups.forEach((headerGroup) => {
      headerGroup.headers.forEach((header) => {
        console.log(`Column ID: ${header.column.id}, Size: ${header.getSize()}px`);
      });
    });
    console.log(`Total Table Size: ${totalSize}px`);
  }, [headerGroups, table]);

  return (
    <div>
      <div className={`w-fit overflow-hidden rounded-md border-0 lg:border`}>
        {/* Default: was stacked grid (mobile). from `lg:` revert to semantic table - TBC */}
        <Table
          responsiveWidth={false}
          className="table table-fixed border-x border-neutral-50 text-neutral-50"
          style={{ width: `${totalWidth}px` }}
        >
          {/* Column headers: were hidden on mobile, visible from `lg:` TBC*/}
          <TableHeader className="table-header-group">
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="border-x border-neutral-50 text-neutral-50"
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
                return (
                  <TableRow
                    key={row.id}
                    className={
                      'border border-accent data-[state=selected]:bg-gray-800 data-[state=selected]:text-neutral-50'
                    }
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
