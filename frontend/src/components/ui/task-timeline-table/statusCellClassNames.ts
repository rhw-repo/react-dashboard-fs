export function statusPillClass(status: unknown): string {
  if (typeof status !== 'string')
    return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-sm bg-slate-600/10 text-slate-200';
  switch (status) {
    case 'bronze':
      return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-md bg-yellow-950';
    case 'silver':
      return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-md bg-mist-500';
    case 'gold':
      return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-md bg-amber-400';
    case 'do not contact':
      return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-sm bg-red-600/20 text-purple-400';
    default:
      return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-sm bg-slate-600/10 text-slate-200';
  }
}

export function statusSquareClass(status: unknown): string {
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
