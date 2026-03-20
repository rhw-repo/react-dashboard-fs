import { type CellContext } from '@tanstack/react-table';

import type { Person } from '../../../types/types';

function statusPillClass(status: unknown): string {
  if (typeof status !== 'string')
    return 'flex items-center justify-center text-center rounded-sm bg-slate-600/10 text-slate-200';
  switch (status) {
    case 'bronze':
      return 'flex items-center justify-center text-center p-4 max-w-16 rounded-md bg-yellow-950';
    case 'silver':
      return 'flex items-center justify-center text-center p-4 max-w-16 rounded-md bg-mist-500';
    case 'gold':
      return 'flex items-center justify-center text-center p-4 max-w-16 rounded-md bg-amber-400';
    case 'do not contact':
      return 'flex items-center justify-center text-center p-4 max-w-16 rounded-sm bg-red-600/20 text-purple-400';
    default:
      return 'flex items-center justify-center text-center p-4 max-w-16 rounded-sm bg-slate-600/10 text-slate-200';
  }
}

export function StatusCell(info: CellContext<Person, unknown>) {
  const status = info.getValue();

  return <span className={statusPillClass(status)}></span>;
}

export function StatusCellWithText(info: CellContext<Person, unknown>) {
  const status = info.getValue();

  return <span className={statusPillClass(status)}>{String(status)}</span>;
}
