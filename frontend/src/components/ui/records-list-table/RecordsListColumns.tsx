import type { ColumnDef } from '@tanstack/react-table';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import type { FullPerson } from '../../../types/types';
import { StatusCell, StatusCellWithText } from '../task-timeline-table/StatusCell';

/* 
Absecnce of a value for status2 handled in StatusCell.tsx
*/

export function getColumns(
  selectedRows: Set<string>,
  selectAllState: CheckedState,
  onSelectAll: (checked: CheckedState) => void,
  onSelectRow: (id: string, isChecked: boolean) => void,
): ColumnDef<FullPerson>[] {
  return [
    {
      id: 'select',
      header: () => (
        <div className="flex h-full w-full items-center justify-center">
          <Checkbox
            checked={selectAllState}
            onCheckedChange={onSelectAll}
            className="mx-auto translate-y-0 rounded-sm"
            aria-label="Select all rows on this page"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex h-full w-full items-center justify-center">
          <Checkbox
            checked={selectedRows.has(row.original.id)}
            onCheckedChange={(checked) => onSelectRow(row.original.id, checked === true)}
            className="rounded-sm"
            aria-label={`Select row ${row.original.id}`}
          />
        </div>
      ),
      enableSorting: false,
      size: 40,
      minSize: 40,
      maxSize: 40,
    },
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
      size: 200,
      minSize: 200,
      maxSize: 200,
    },
    {
      id: 'address',
      accessorKey: 'address',
      header: 'Address',
     // cell: ({ row }) => row.original.address,
      cell: (info) => {
      const address = info.getValue(); 
      if (!address) return 'N/A';
      return address;
      },
      enableSorting: true,
      size: 200,
      minSize: 200,
      maxSize: 200,
    },
    {
      id: 'postcode',
      accessorKey: 'postcode',
      header: 'Postcode',
      //cell: ({ row }) => row.original.postcode,
      cell: (info) => {
      const postcode = info.getValue(); 
      if (!postcode) return 'N/A';
      return postcode;
      },
      enableSorting: true,
      size: 80,
      minSize: 80,
      maxSize: 80,
    },
    {
      id: 'notes',
      accessorKey: 'notes',
      header: 'Notes',
      //cell: ({ row }) => row.original.notes,
      cell: (info) => {
      const notes = info.getValue(); 
      if (!notes) return 'Unassigned';
      return notes;
      },
      enableSorting: true,
      size: 900,
      minSize: 900,
      maxSize: 900,
    },
    {
      id: 'nextTask',
      accessorKey: 'nextTask',
      header: 'Next Task',
      //cell: ({ row }) => row.original.nextTask,
      cell: (info) => {
      const task = info.getValue(); 
      if (!task) return 'Unassigned';
      return task;
      },
      enableSorting: true,
      size: 300,
      minSize: 300,
      maxSize: 300,
    },
    {
      id: 'taskDeadline',
      accessorKey: 'taskDeadline',
      header: 'Task Deadline',
      //cell: ({ row }) => row.original.taskDeadline,
      cell: (info) => {
      const taskDeadline = info.getValue(); 
      if (!taskDeadline) return 'N/A';
      return taskDeadline;
      },
      enableSorting: true,
      size: 80,
      minSize: 80,
      maxSize: 80,
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
