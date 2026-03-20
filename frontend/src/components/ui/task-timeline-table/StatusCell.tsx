import { type CellContext } from '@tanstack/react-table';

import type { Person } from '../../../types/types';

function statusPillClass(status: unknown): string {
  if (typeof status !== 'string')
    return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-sm bg-slate-600/10 text-slate-200 font-black';
  switch (status) {
    case 'bronze':
      return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-md bg-yellow-950 font-black';
    case 'silver':
      return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-md bg-mist-500 font-black';
    case 'gold':
      return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-md bg-amber-400 font-black';
    case 'do not contact':
      return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-sm bg-red-600/20 text-purple-400 font-black';
    default:
      return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-sm bg-slate-600/10 text-slate-200 font-black';
  }
}

function statusSquareClass(status: unknown): string {
  if (typeof status !== 'string')
    return 'flex items-center justify-center w-8 h-8 rounded-sm bg-slate-600/10 text-slate-200';
  switch (status) {
    case 'bronze':
      return 'flex items-center justify-center w-8 h-8 rounded-md bg-yellow-950';
    case 'silver':
      return 'flex items-center justify-center w-8 h-8 rounded-md bg-mist-500';
    case 'gold':
      return 'flex items-center justify-center w-8 h-8 rounded-md bg-amber-400';
    case 'do not contact':
      return 'flex items-center justify-center w-8 h-8 rounded-sm bg-red-600/20 text-purple-400';
    default:
      return 'flex items-center justify-center w-8 h-8 rounded-sm bg-slate-600/10 text-slate-200';
  }
}

export function StatusCell(info: CellContext<Person, unknown>) {
  const status = info.getValue();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className={statusSquareClass(status)}></span>
    </div>
  );
}

export function StatusCellWithText(info: CellContext<Person, unknown>) {
  const status = info.getValue();

  return <span className={statusPillClass(status)}>{String(status).toUpperCase()}</span>;
}
