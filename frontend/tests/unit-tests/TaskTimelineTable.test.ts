import { describe, it, expect } from 'vitest';
import { statusPillClass, statusSquareClass } from '@/components/ui/task-timeline-table/statusCellClassNames';
import { getColumns } from '@/components/ui/task-timeline-table/TaskTimelineColumns';

describe('TaskTimelineTable - Data Transformation', () => {
  describe('statusPillClass', () => {
    it('returns bg-amber-700/40 Tailwind utility class for status of bronze', () => {
      expect(statusPillClass('bronze')).toContain('bg-amber-700/40');
    });

    it('returns bg-slate-300/40 Tailwind utility class for status of silver', () => {
      expect(statusPillClass('silver')).toContain('bg-slate-300/40');
    });

    it('returns bg-amber-400/40 Tailwind utility class for status of gold', () => {
      expect(statusPillClass('gold')).toContain('bg-amber-400/40');
    });

    it('returns bg-red-600/25 and text-purple-400 Tailwind utility classes for status of "do not contact"', () => {
      expect(statusPillClass('do not contact')).toContain('bg-red-600/25');
      expect(statusPillClass('do not contact')).toContain('text-purple-400');
    });

    it('returns bg-slate-600/20 Tailwind utility class for status of unknown values', () => {
      expect(statusPillClass('unknown')).toContain('bg-slate-600/20');
    });

    it('returns bg-slate-600/20 Tailwind utility class for status of non-string input', () => {
      expect(statusPillClass(null)).toContain('bg-slate-600/20');
      expect(statusPillClass(undefined)).toContain('bg-slate-600/20');
      expect(statusPillClass(123)).toContain('bg-slate-600/20');
    });

    it('returns style rules for pill shape', () => {
      const result = statusPillClass('bronze');
      expect(result).toContain('px-4 py-2 max-w-14');
    });
  });

  describe('statusSquareClass', () => {
    // Shares its background colours with statusPillClass; shape is what differs,
    // so each case asserts the rounding too.
    it('returns bg-amber-700/40 and rounded-full Tailwind utility classes for status of bronze', () => {
      expect(statusSquareClass('bronze')).toContain('bg-amber-700/40');
      expect(statusSquareClass('bronze')).toContain('rounded-full');
    });

    it('returns bg-slate-300/40 and rounded-full Tailwind utility classes for status of silver', () => {
      expect(statusSquareClass('silver')).toContain('bg-slate-300/40');
      expect(statusSquareClass('silver')).toContain('rounded-full');
    });

    it('returns bg-amber-400/40 and rounded-full Tailwind utility classes for status of gold', () => {
      expect(statusSquareClass('gold')).toContain('bg-amber-400/40');
      expect(statusSquareClass('gold')).toContain('rounded-full');
    });

    it('returns bg-red-600/25, text-purple-400 and rounded-full Tailwind utility classes for status of "do not contact"', () => {
      expect(statusSquareClass('do not contact')).toContain('bg-red-600/25');
      expect(statusSquareClass('do not contact')).toContain('text-purple-400');
      expect(statusSquareClass('do not contact')).toContain('rounded-full');
    });

    it('returns bg-slate-600/20 and rounded-sm Tailwind utility classes for status of unknown values', () => {
      expect(statusSquareClass('unknown')).toContain('bg-slate-600/20');
      expect(statusSquareClass('unknown')).toContain('rounded-sm');
    });

    it('returns bg-slate-600/20 Tailwind utility class for status of non-string input', () => {
      expect(statusSquareClass(null)).toContain('bg-slate-600/20');
      expect(statusSquareClass(undefined)).toContain('bg-slate-600/20');
      expect(statusSquareClass(456)).toContain('bg-slate-600/20');
    });

    it('returns square sizing', () => {
      const result = statusSquareClass('bronze');
      expect(result).toContain('w-8 h-8');
    });

    it('returns default padding without pill-specific padding classes', () => {
      const result = statusSquareClass('gold');
      expect(result).not.toContain('px-4');
      expect(result).not.toContain('py-2');
      expect(result).not.toContain('max-w-14');
    });
  });

  describe('getColumns', () => {
    it('returns 5 columns', () => {
      expect(getColumns()).toHaveLength(5);
    });

    it('places columns in correct order', () => {
      const cols = getColumns();
      expect(cols[0].id).toBe('status');
      expect(cols[1].id).toBe('name');
      expect(cols[2].id).toBe('nextTask');
      expect(cols[3].id).toBe('taskDeadline');
      expect(cols[4].id).toBe('status2');
    });

    it('makes all columns sortable', () => {
      getColumns().forEach((col) => {
        expect(col.enableSorting).toBe(true);
      });
    });

    it('returns status column with 80px width', () => {
      const col = getColumns()[0];
      expect(col.size).toBe(80);
      expect(col.minSize).toBe(80);
      expect(col.maxSize).toBe(80);
    });

    it('returns name column with 120px width', () => {
      const col = getColumns()[1];
      expect(col.size).toBe(120);
      expect(col.minSize).toBe(120);
      expect(col.maxSize).toBe(120);
    });

    it('returns nextTask column with 280px width', () => {
      const col = getColumns()[2];
      expect(col.size).toBe(280);
      expect(col.minSize).toBe(250);
      expect(col.maxSize).toBe(280);
    });

    it('returns taskDeadline column with 95px width', () => {
      const col = getColumns()[3];
      expect(col.size).toBe(95);
      expect(col.minSize).toBe(95);
      expect(col.maxSize).toBe(95);
    });

    it('returns status2 column with 60px width', () => {
      const col = getColumns()[4];
      expect(col.size).toBe(60);
      expect(col.minSize).toBe(60);
      expect(col.maxSize).toBe(60);
    });

    it('returns a total of 635px for all column widths added together', () => {
      const total = getColumns().reduce((sum, col) => sum + (col.size || 0), 0);
      expect(total).toBe(635);
    });

    it('all columns have required properties', () => {
      getColumns().forEach((col) => {
        expect(col.cell).toBeDefined();
        expect(col.header).toBeDefined();
        expect(col.size).toBeDefined();
        expect(col.minSize).toBeDefined();
        expect(col.maxSize).toBeDefined();
      });
    });
  });
});