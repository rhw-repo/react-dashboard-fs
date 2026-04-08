import { type CellContext } from '@tanstack/react-table';

import type { Person } from '../../../types/types';
import { statusPillClass, statusSquareClass } from './statusCellClassNames';

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
