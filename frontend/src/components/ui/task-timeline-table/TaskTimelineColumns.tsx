import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Person } from '../../../types/types';
import { StatusCell, StatusCellWithText } from './StatusCell';

/* Refactored: now use plain `ColumnDef<Person>[]` instead of `createColumnHelper`.
 `DataTable` expects one consistent column value type across the `columns`
 prop, but `createColumnHelper` infers a different `TValue` per column.
 That mismatch causes a generic assignment error.*/

export function getColumns(): ColumnDef<Person>[] {
  return [
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      cell: StatusCellWithText,
      enableSorting: true,
      size: 80,
      minSize: 80,
      maxSize: 80,
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.original.name,
      enableSorting: true,
      size: 120,
      minSize: 120,
      maxSize: 120,
    },
    {
      id: 'nextTask',
      accessorKey: 'nextTask',
      header: 'Next Task',
      cell: (info) => {
        const task = info.getValue();
        if (!task) return 'Unassigned';
        return task;
      },
      enableSorting: true,
      size: 280,
      minSize: 250,
      maxSize: 280,
    },
    {
      id: 'taskDeadline',
      accessorKey: 'taskDeadline',
      header: 'Deadline',
      cell: (cellContext) => {
        const cellValue = cellContext.getValue();
        if (!cellValue) return 'N/A';
        const parsedDate = cellValue instanceof Date ? cellValue : new Date(cellValue as string);
        return isNaN(parsedDate.getTime()) ? 'N/A' : parsedDate.toLocaleDateString();
      },
      enableSorting: true,
      size: 95,
      minSize: 95,
      maxSize: 95,
    },
    {
      id: 'status2',
      accessorKey: 'status2',
      header: 'Status 2',
      cell: StatusCell,
      enableSorting: true,
      size: 60,
      minSize: 60,
      maxSize: 60,
    },
  ];
}
