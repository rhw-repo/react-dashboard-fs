import { describe, it, expect } from 'vitest';
import { statusPillClass, statusSquareClass } from '@/components/ui/task-timeline-table/statusCellClassNames';
import { getColumns } from '@/components/ui/records-list-table/RecordsListColumns';

describe('RecordsListTable - Data Transformation', () => {
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
    it('returns bg-amber-700/40 and squircle Tailwind utility classes for status of bronze', () => {
      expect(statusSquareClass('bronze')).toContain('bg-amber-700/40');
      expect(statusSquareClass('bronze')).toContain('rounded-xl [corner-shape:squircle]');
    });

    it('returns bg-slate-300/40 and squircle Tailwind utility classes for status of silver', () => {
      expect(statusSquareClass('silver')).toContain('bg-slate-300/40');
      expect(statusSquareClass('silver')).toContain('rounded-xl [corner-shape:squircle]');
    });

    it('returns bg-amber-400/40 and squircle Tailwind utility classes for status of gold', () => {
      expect(statusSquareClass('gold')).toContain('bg-amber-400/40');
      expect(statusSquareClass('gold')).toContain('rounded-xl [corner-shape:squircle]');
    });

    it('returns bg-red-600/25, text-purple-400 and squircle Tailwind utility classes for status of "do not contact"', () => {
      expect(statusSquareClass('do not contact')).toContain('bg-red-600/25');
      expect(statusSquareClass('do not contact')).toContain('text-purple-400');
      expect(statusSquareClass('do not contact')).toContain('rounded-xl [corner-shape:squircle]');
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
    const mockSelectedRows = new Set<string>();
    const mockSelectAllState = false;
    const mockOnSelectAll = () => {};
    const mockOnSelectRow = () => {};
    const mockOnEditRow = () => {};

    // Single call site for the factory, so a future signature change is one edit, not sixteen.
    const columns = () =>
      getColumns(mockSelectedRows, mockSelectAllState, mockOnSelectAll, mockOnSelectRow, mockOnEditRow);

    it('returns 10 columns', () => {
      expect(columns()).toHaveLength(10);
    });

    it('places columns in correct order', () => {
      const cols = columns();
      expect(cols[0].id).toBe('select');
      expect(cols[1].id).toBe('edit');
      expect(cols[2].id).toBe('status');
      expect(cols[3].id).toBe('name');
      expect(cols[4].id).toBe('address');
      expect(cols[5].id).toBe('postcode');
      expect(cols[6].id).toBe('notes');
      expect(cols[7].id).toBe('nextTask');
      expect(cols[8].id).toBe('taskDeadline');
      expect(cols[9].id).toBe('status2');
    });

    it('makes all columns sortable except columns with id of select or edit', () => {
      columns()
        .filter((col) => col.id !== 'select' && col.id !== 'edit')
        .forEach((col) => {
          expect(col.enableSorting).toBe(true);
        });
    });

    it('disables sorting for select and edit columns', () => {
      const cols = columns();
      expect(cols[0].enableSorting).toBe(false);
      expect(cols[1].enableSorting).toBe(false);
    });

    it('returns select column with 60px width', () => {
      const col = columns()[0];
      expect(col.size).toBe(60);
      expect(col.minSize).toBe(60);
      expect(col.maxSize).toBe(60);
    });

    it('returns edit column with 80px width', () => {
      const col = columns()[1];
      expect(col.size).toBe(80);
      expect(col.minSize).toBe(80);
      expect(col.maxSize).toBe(80);
    });

    it('returns status column with 80px width', () => {
      const col = columns()[2];
      expect(col.size).toBe(80);
      expect(col.minSize).toBe(80);
      expect(col.maxSize).toBe(80);
    });

    it('returns name column with 200px width', () => {
      const col = columns()[3];
      expect(col.size).toBe(200);
      expect(col.minSize).toBe(200);
      expect(col.maxSize).toBe(200);
    });

    it('returns address column with 200px width', () => {
      const col = columns()[4];
      expect(col.size).toBe(200);
      expect(col.minSize).toBe(200);
      expect(col.maxSize).toBe(200);
    });

    it('returns postcode column with 80px width', () => {
      const col = columns()[5];
      expect(col.size).toBe(80);
      expect(col.minSize).toBe(80);
      expect(col.maxSize).toBe(80);
    });

    it('returns notes column with 600px width', () => {
      const col = columns()[6];
      expect(col.size).toBe(600);
      expect(col.minSize).toBe(600);
      expect(col.maxSize).toBe(600);
    });

    it('returns nextTask column with 300px width', () => {
      const col = columns()[7];
      expect(col.size).toBe(300);
      expect(col.minSize).toBe(300);
      expect(col.maxSize).toBe(300);
    });

    it('returns taskDeadline column with 95px width', () => {
      const col = columns()[8];
      expect(col.size).toBe(95);
      expect(col.minSize).toBe(95);
      expect(col.maxSize).toBe(95);
    });

    it('returns status2 column with 80px width', () => {
      const col = columns()[9];
      expect(col.size).toBe(80);
      expect(col.minSize).toBe(80);
      expect(col.maxSize).toBe(80);
    });

    it('returns a total of 1775px for all column widths added together', () => {
      const total = columns().reduce((sum, col) => sum + (col.size || 0), 0);
      expect(total).toBe(1775);
    });

    it('all columns have required properties', () => {
      columns().forEach((col) => {
        expect(col.cell).toBeDefined();
        expect(col.header).toBeDefined();
        expect(col.size).toBeDefined();
        expect(col.minSize).toBeDefined();
        expect(col.maxSize).toBeDefined();
      });
    });
  });
});