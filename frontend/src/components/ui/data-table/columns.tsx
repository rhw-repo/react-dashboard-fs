import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Person } from '../../../data/data';
//import { StatusCell } from './StatusCell';

const columnHelper = createColumnHelper<Person>();

export const columns = [
  columnHelper.accessor('status', {
    header: 'Status',
    //cell: StatusCell,
    cell: (info) => info.getValue(),
    enableSorting: true,
    size: 10,
    minSize: 10,
    maxSize: 10,
  }),

  columnHelper.accessor('name', {
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    // Ensure renders a value from cell
    cell: (info) => info.getValue(),
    enableSorting: true,
    size: 40,
    minSize: 40,
    maxSize: 100,
  }),

  columnHelper.accessor('nextTask', {
    header: 'Next Task',
    cell: (info) => info.getValue(),
    enableSorting: true,
    size: 50,
    minSize: 50,
    maxSize: 100,
  }),
  columnHelper.accessor('taskDeadline', {
    header: 'Task Deadline',
    cell: (info) => info.getValue(),
    enableSorting: true,
    size: 10,
    minSize: 10,
    maxSize: 10,
  }),
  columnHelper.accessor('status2', {
    header: 'Status 2',
    cell: (info) => info.getValue(),
    enableSorting: true,
    size: 60,
    minSize: 60,
    maxSize: 80,
  }),
];
