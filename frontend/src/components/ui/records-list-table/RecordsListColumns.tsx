import type { ColumnDef } from '@tanstack/react-table';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import type { FullPerson } from '../../../types/types';
import { StatusCell, StatusCellWithText } from '../task-timeline-table/StatusCell';
import { RecordEditModal } from '../record-edit-modal/RecordEditModal';

/* 
Absence of a value for status2 handled in StatusCell.tsx
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
            checked={selectedRows.has(row.original._id)}
            onCheckedChange={(checked) => onSelectRow(row.original._id, checked === true)}
            className="rounded-sm"
            aria-label={`Select row ${row.original._id}`}
          />
        </div>
      ),
      enableSorting: false,
      size: 60,
      minSize: 60,
      maxSize: 60,
    },
    {
      id: 'edit',
      header: '',
      cell: ({ row }) => <RecordEditModal person={row.original} />,
      enableSorting: false,
      size: 80,
      minSize: 80,
      maxSize: 80,
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
      cell: (info) => {
        const notes = info.getValue() as FullPerson['notes'];
        if (!notes || notes.length === 0) return 'Unassigned';
        return notes.map((file) => file.fileName).join(' ');
      },
      enableSorting: true,
      size: 600,
      minSize: 600,
      maxSize: 600,
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
      size: 300,
      minSize: 300,
      maxSize: 300,
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
      header: 'Updated Status',
      cell: StatusCell,
      enableSorting: true,
      size: 80,
      minSize: 80,
      maxSize: 80,
    },
  ];
}
