import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Person } from '../../../types/types';
import { StatusCell } from './StatusCell';

/* Refactored: now use plain `ColumnDef<Person>[]` instead of `createColumnHelper`.
 `DataTable` expects one consistent column value type across the `columns`
 prop, but `createColumnHelper` infers a different `TValue` per column.
 That mismatch causes a generic assignment error.*/

export const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: StatusCell,
    enableSorting: true,
    size: 10,
    minSize: 10,
    maxSize: 10,
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
    size: 40,
    minSize: 40,
    maxSize: 100,
  },
  {
    accessorKey: 'nextTask',
    header: 'Next Task',
    cell: ({ row }) => row.original.nextTask,
    enableSorting: true,
    size: 50,
    minSize: 50,
    maxSize: 100,
  },
  {
    accessorKey: 'taskDeadline',
    header: 'Task Deadline',
    cell: ({ row }) => row.original.taskDeadline,
    enableSorting: true,
    size: 20,
    minSize: 20,
    maxSize: 20,
  },
  {
    accessorKey: 'status2',
    header: 'Status 2',
    cell: StatusCell,
    enableSorting: true,
    size: 10,
    minSize: 10,
    maxSize: 10,
  },
];
