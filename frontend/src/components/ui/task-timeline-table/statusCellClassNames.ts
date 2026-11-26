export function statusPillClass(status: unknown): string {
  if (typeof status !== 'string')
    return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-sm bg-slate-600/20 text-slate-200';
  switch (status) {
    case 'bronze':
      return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-md bg-amber-700/40';
    case 'silver':
      return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-md bg-slate-300/40';
    case 'gold':
      return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-md bg-amber-400/40';
    case 'do not contact':
      return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-sm bg-red-600/25 text-purple-400';
    default:
      return 'flex items-center justify-center text-center text-xs px-4 py-2 max-w-14 rounded-sm bg-slate-600/20 text-slate-200';
  }
}

// Known statuses get a squircle: `corner-shape: squircle` turns the rounded-xl corners into
// smooth superellipse curves in browsers that support it (Chromium); elsewhere the property is
// ignored and the marker falls back to a plain rounded-xl square.
export function statusSquareClass(status: unknown): string {
  if (typeof status !== 'string')
    return 'flex items-center justify-center w-8 h-8 rounded-sm bg-slate-600/20 text-slate-200';
  switch (status) {
    case 'bronze':
      return 'flex items-center justify-center w-8 h-8 rounded-xl [corner-shape:squircle] bg-amber-700/40';
    case 'silver':
      return 'flex items-center justify-center w-8 h-8 rounded-xl [corner-shape:squircle] bg-slate-300/40';
    case 'gold':
      return 'flex items-center justify-center w-8 h-8 rounded-xl [corner-shape:squircle] bg-amber-400/40';
    case 'do not contact':
      return 'flex items-center justify-center w-8 h-8 rounded-xl [corner-shape:squircle] bg-red-600/25 text-purple-400';
    default:
      return 'flex items-center justify-center w-8 h-8 rounded-sm bg-slate-600/20 text-slate-200';
  }
}
