import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Person } from '../../../types/types';
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

  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue(),
    enableSorting: true,
    size: 60,
    minSize: 60,
    maxSize: 80,
  }),

  columnHelper.accessor('address', {
    header: 'Address',
    cell: (info) => info.getValue(),
    enableSorting: true,
    size: 140,
    minSize: 140,
    maxSize: 180,
  }),

  columnHelper.accessor('postcode', {
    header: 'Postcode',
    cell: (info) => info.getValue(),
    enableSorting: true,
    size: 30,
    minSize: 30,
    maxSize: 30,
  }),
];
