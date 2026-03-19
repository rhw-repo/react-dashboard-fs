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
      accessorKey: 'status',
      header: 'Status',
      cell: StatusCellWithText,
      enableSorting: true,
      size: 50,
      minSize: 50,
      maxSize: 50,
    },
    {
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
      minSize: 80,
      maxSize: 150,
    },
    {
      accessorKey: 'nextTask',
      header: 'Next Task',
      cell: ({ row }) => row.original.nextTask,
      enableSorting: true,
      size: 180,
      minSize: 120,
      maxSize: 250,
    },
    {
      accessorKey: 'taskDeadline',
      header: 'Task Deadline',
      cell: ({ row }) => row.original.taskDeadline,
      enableSorting: true,
      size: 60,
      minSize: 60,
      maxSize: 60,
    },
    {
      accessorKey: 'status2',
      header: 'Status 2',
      cell: StatusCell,
      enableSorting: true,
      size: 50,
      minSize: 50,
      maxSize: 50,
    },
  ];
}
