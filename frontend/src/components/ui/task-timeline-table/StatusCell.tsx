import { type CellContext } from '@tanstack/react-table';

import type { Person } from '../../../types/types';
import { statusPillClass, statusSquareClass } from './statusCellClassNames';

export function StatusCell(info: CellContext<Person, unknown>) {
  const status = info.getValue();

  // "Do not contact" shows a phone-slash icon instead of a coloured squircle. The SVG has no
  // fill of its own, so it's applied as a CSS mask over a red background: as an <img> it would
  // render black and vanish on the dark theme. The w-8 h-8 wrapper keeps it the same footprint
  // as the squircles so the column stays aligned.
  const statusMarker = status === 'do not contact' ? (
    <span className="flex h-8 w-8 items-center justify-center" role="img" aria-label="Do not contact" title="Do not contact">
      <span className="size-6 bg-red-500 [mask:url(/images/phone-slash-solid-full.svg)_center/contain_no-repeat]" />
    </span>
  ) : status ? (
     <span className={statusSquareClass(status)}></span>
  ) : (
    <span className={statusSquareClass(status)} title="Not Assigned">
      <span className="text-[0.938rem] leading-none">N/A</span>
    </span>
  );

  {/*return (
    <div className="flex h-full w-full items-center justify-center">
      <span className={statusSquareClass(status)}></span>
    </div>
  );
}*/}


  return (
    <div className="flex h-full w-full items-center justify-center">
      <span>{statusMarker}</span>
    </div>
  );
}
  

export function StatusCellWithText(info: CellContext<Person, unknown>) {
  const status = info.getValue();

  return <span className={statusPillClass(status)}>{String(status).toUpperCase()}</span>;
}
