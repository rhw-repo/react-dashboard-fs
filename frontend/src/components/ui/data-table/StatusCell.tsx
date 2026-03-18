import { type CellContext } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Person } from '../../../types/types';

const STATUS_OPTIONS: Person['status'][] = ['bronze', 'silver', 'gold', 'do not contact'];

function statusPillClass(status: Person['status']) {
  switch (status) {
    case 'bronze':
      return 'p-4 rounded-sm bg-yellow-950';
      break;
    case 'silver':
      return 'p-4 rounded-sm bg-mist-500';
      break;
    case 'gold':
      return 'p-4 rounded-sm bg-amber-400';
      break;
    case 'do not contact':
      return 'p-4 rounded-sm bg-red-600/20 text-purple-400';
      break;
    default:
      return 'p-4 rounded-sm bg-slate-600/10 text-slate-200';
  }
}

export function StatusMenu({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" aria-label={`Status menu for ${name}`} className="p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-35">
        <DropdownMenuLabel>Set Status:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {STATUS_OPTIONS.map((option) => (
          <DropdownMenuItem key={option} className="capitalize">
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function StatusCell(info: CellContext<Person, Person['status']>) {
  const status = info.getValue();
  //const name = info.row.original.name;

  return (
    <div className="flex items-center justify-center gap-2">
      <span className={statusPillClass(status)}></span>
      {/* <StatusMenu name={name} /> */}
    </div>
  );
}
