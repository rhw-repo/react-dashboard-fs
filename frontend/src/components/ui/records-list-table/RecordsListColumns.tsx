import type { ColumnDef } from '@tanstack/react-table';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import type { Person } from '../../../types/types';
import { StatusCell } from '../task-timeline-table/StatusCell';

export function getColumns(
  selectedRows: Set<string>,
  selectAllState: CheckedState,
  onSelectAll: (checked: CheckedState) => void,
  onSelectRow: (id: string, isChecked: boolean) => void,
): ColumnDef<Person>[] {
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
        <div className="flex items-center justify-center">
          <Checkbox
            checked={selectedRows.has(row.original.id)}
            onCheckedChange={(checked) => onSelectRow(row.original.id, checked === true)}
            className="rounded-sm"
            aria-label={`Select row ${row.original.id}`}
          />
        </div>
      ),
      enableSorting: false,
      size: 10,
      minSize: 10,
      maxSize: 10,
    },
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
}
