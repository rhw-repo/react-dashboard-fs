import { describe, it, expect } from 'vitest';
import { statusPillClass, statusSquareClass } from '@/components/ui/task-timeline-table/statusCellClassNames';
import { getColumns } from '@/components/ui/task-timeline-table/TaskTimelineColumns';

describe('TaskTimelineTable - Data Transformation', () => {
  describe('statusPillClass', () => {
    it('maps bronze to yellow-950', () => {
      expect(statusPillClass('bronze')).toContain('bg-yellow-950');
    });

    it('maps silver to mist-500', () => {
      expect(statusPillClass('silver')).toContain('bg-mist-500');
    });

    it('maps gold to amber-400', () => {
      expect(statusPillClass('gold')).toContain('bg-amber-400');
    });

    it('maps "do not contact" to red-600/20 with purple text', () => {
      expect(statusPillClass('do not contact')).toContain('bg-red-600/20');
      expect(statusPillClass('do not contact')).toContain('text-purple-400');
    });

    it('returns default class for unknown values', () => {
      expect(statusPillClass('unknown')).toContain('bg-slate-600/10');
    });

    it('returns default class for non-string input', () => {
      expect(statusPillClass(null)).toContain('bg-slate-600/10');
      expect(statusPillClass(undefined)).toContain('bg-slate-600/10');
      expect(statusPillClass(123)).toContain('bg-slate-600/10');
    });

    it('includes pill styling', () => {
      const result = statusPillClass('bronze');
      expect(result).toContain('px-4 py-2 max-w-14');
    });
  });

  describe('statusSquareClass', () => {
    it('maps bronze to yellow-950', () => {
      expect(statusSquareClass('bronze')).toContain('bg-yellow-950');
    });

    it('maps silver to mist-500', () => {
      expect(statusSquareClass('silver')).toContain('bg-mist-500');
    });

    it('maps gold to amber-400', () => {
      expect(statusSquareClass('gold')).toContain('bg-amber-400');
    });

    it('maps "do not contact" to red-600/20 with purple text', () => {
      expect(statusSquareClass('do not contact')).toContain('bg-red-600/20');
      expect(statusSquareClass('do not contact')).toContain('text-purple-400');
    });

    it('returns default class for unknown values', () => {
      expect(statusSquareClass('unknown')).toContain('bg-slate-600/10');
    });

    it('returns default class for non-string input', () => {
      expect(statusSquareClass(null)).toContain('bg-slate-600/10');
      expect(statusSquareClass(undefined)).toContain('bg-slate-600/10');
      expect(statusSquareClass(456)).toContain('bg-slate-600/10');
    });

    it('includes square sizing', () => {
      const result = statusSquareClass('bronze');
      expect(result).toContain('w-8 h-8');
    });

    it('does not include pill classes', () => {
      const result = statusSquareClass('gold');
      expect(result).not.toContain('max-w-14');
      expect(result).not.toContain('px-4');
      expect(result).not.toContain('py-2');
    });
  });

  describe('getColumns', () => {
    it('returns 5 columns', () => {
      expect(getColumns()).toHaveLength(5);
    });

    it('columns in correct order', () => {
      const cols = getColumns();
      expect(cols[0].id).toBe('status');
      expect(cols[1].id).toBe('name');
      expect(cols[2].id).toBe('nextTask');
      expect(cols[3].id).toBe('taskDeadline');
      expect(cols[4].id).toBe('status2');
    });

    it('all columns sortable', () => {
      getColumns().forEach((col) => {
        expect(col.enableSorting).toBe(true);
      });
    });

    it('status: 80px width', () => {
      const col = getColumns()[0];
      expect(col.size).toBe(80);
      expect(col.minSize).toBe(80);
      expect(col.maxSize).toBe(80);
    });

    it('name: 120px width', () => {
      const col = getColumns()[1];
      expect(col.size).toBe(120);
      expect(col.minSize).toBe(120);
      expect(col.maxSize).toBe(120);
    });

    it('nextTask: 300px width', () => {
      const col = getColumns()[2];
      expect(col.size).toBe(300);
      expect(col.minSize).toBe(300);
      expect(col.maxSize).toBe(300);
    });

    it('taskDeadline: 70px width', () => {
      const col = getColumns()[3];
      expect(col.size).toBe(70);
      expect(col.minSize).toBe(70);
      expect(col.maxSize).toBe(70);
    });

    it('status2: 60px width', () => {
      const col = getColumns()[4];
      expect(col.size).toBe(60);
      expect(col.minSize).toBe(60);
      expect(col.maxSize).toBe(60);
    });

    it('total width 630px', () => {
      const total = getColumns().reduce((sum, col) => sum + (col.size || 0), 0);
      expect(total).toBe(630);
    });

    it('all columns have required properties', () => {
      getColumns().forEach((col) => {
        expect(col.cell).toBeDefined();
        expect(col.header).toBeDefined();
      });
    });
  });
});