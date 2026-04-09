import { describe, it, expect } from 'vitest';
import { statusPillClass, statusSquareClass } from '@/components/ui/task-timeline-table/statusCellClassNames';
import { getColumns } from '@/components/ui/records-list-table/RecordsListColumns';

describe('RecordsListTable - Data Transformation', () => {
  describe('statusPillClass', () => {
    it('returns bg-yellow-950 Tailwind utility class for status of bronze', () => {
      expect(statusPillClass('bronze')).toContain('bg-yellow-950');
    });

    it('returns bg-mist-500 Tailwind utility class for status of silver', () => {
      expect(statusPillClass('silver')).toContain('bg-mist-500');
    });

    it('returns bg-amber-400 Tailwind utility class for status of gold', () => {
      expect(statusPillClass('gold')).toContain('bg-amber-400');
    });

    it('returns bg-red-600/20 and text-purple-400 Tailwind utility classes for status of "do not contact"', () => {
      expect(statusPillClass('do not contact')).toContain('bg-red-600/20');
      expect(statusPillClass('do not contact')).toContain('text-purple-400');
    });

    it('returns bg-slate-600/10 Tailwind utility class for status of unknown values', () => {
      expect(statusPillClass('unknown')).toContain('bg-slate-600/10');
    });

    it('returns bg-slate-600/10 Tailwind utility class for status of non-string input', () => {
      expect(statusPillClass(null)).toContain('bg-slate-600/10');
      expect(statusPillClass(undefined)).toContain('bg-slate-600/10');
      expect(statusPillClass(123)).toContain('bg-slate-600/10');
    });

    it('returns style rules for pill shape', () => {
      const result = statusPillClass('bronze');
      expect(result).toContain('px-4 py-2 max-w-14');
    });
  });

  describe('statusSquareClass', () => {
    it('returns bg-yellow-950 Tailwind utility class for status of bronze', () => {
      expect(statusSquareClass('bronze')).toContain('bg-yellow-950');
    });

    it('returns bg-mist-500 Tailwind utility class for status of silver', () => {
      expect(statusSquareClass('silver')).toContain('bg-mist-500');
    });

    it('returns bg-amber-400 Tailwind utility class for status of gold', () => {
      expect(statusSquareClass('gold')).toContain('bg-amber-400');
    });

    it('returns bg-red-600/20 and text-purple-400 Tailwind utility classes for status of "do not contact"', () => {
      expect(statusSquareClass('do not contact')).toContain('bg-red-600/20');
      expect(statusSquareClass('do not contact')).toContain('text-purple-400');
    });

    it('returns bg-slate-600/10 Tailwind utility class for status of unknown values', () => {
      expect(statusSquareClass('unknown')).toContain('bg-slate-600/10');
    });

    it('returns bg-slate-600/10 Tailwind utility class for status of non-string input', () => {
      expect(statusSquareClass(null)).toContain('bg-slate-600/10');
      expect(statusSquareClass(undefined)).toContain('bg-slate-600/10');
      expect(statusSquareClass(456)).toContain('bg-slate-600/10');
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

    it('returns 5 columns', () => {
      

      expect(getColumns(mockSelectedRows, mockSelectAllState, mockOnSelectAll, mockOnSelectRow)).toHaveLength(9);
    });

    it('places columns in correct order', () => {
      const cols = (getColumns(mockSelectedRows, mockSelectAllState, mockOnSelectAll, mockOnSelectRow));
      expect(cols[1].id).toBe('status');
      expect(cols[2].id).toBe('name');
      expect(cols[3].id).toBe('address');
      expect(cols[4].id).toBe('postcode');
      expect(cols[5].id).toBe('notes');
    });

    it('makes all columns sortable except column with id of select', () => {
     (getColumns(mockSelectedRows, mockSelectAllState, mockOnSelectAll, mockOnSelectRow)).filter(col => col.id !== 'select').forEach((col) => {
        expect(col.enableSorting).toBe(true);
      });
    });

    it('returns select column with 40px width', () => {
      const col = (getColumns(mockSelectedRows, mockSelectAllState, mockOnSelectAll, mockOnSelectRow))[0];
      expect(col.size).toBe(40);
      expect(col.minSize).toBe(40);
      expect(col.maxSize).toBe(40);
    });

    it('returns status column with 80px width', () => {
      const col = (getColumns(mockSelectedRows, mockSelectAllState, mockOnSelectAll, mockOnSelectRow))[1];
      expect(col.size).toBe(80);
      expect(col.minSize).toBe(80);
      expect(col.maxSize).toBe(80);
    });

    it('returns name column with 200px width', () => {
      const col = (getColumns(mockSelectedRows, mockSelectAllState, mockOnSelectAll, mockOnSelectRow))[2];
      expect(col.size).toBe(200);
      expect(col.minSize).toBe(200);
      expect(col.maxSize).toBe(200);
    });

    it('returns address column with 200px width', () => {
      const col = (getColumns(mockSelectedRows, mockSelectAllState, mockOnSelectAll, mockOnSelectRow))[3];
      expect(col.size).toBe(200);
      expect(col.minSize).toBe(200);
      expect(col.maxSize).toBe(200);
    });

    it('returns postcode column with 60px width', () => {
      const col = (getColumns(mockSelectedRows, mockSelectAllState, mockOnSelectAll, mockOnSelectRow))[4];
      expect(col.size).toBe(80);
      expect(col.minSize).toBe(80);
      expect(col.maxSize).toBe(80);
    });

    it('returns notes column with 900px width', () => {
      const col = (getColumns(mockSelectedRows, mockSelectAllState, mockOnSelectAll, mockOnSelectRow))[5];
      expect(col.size).toBe(900);
      expect(col.minSize).toBe(900);
      expect(col.maxSize).toBe(900);
    });

    it('returns nextTask column with 300px width', () => {
      const col = (getColumns(mockSelectedRows, mockSelectAllState, mockOnSelectAll, mockOnSelectRow))[6];
      expect(col.size).toBe(300);
      expect(col.minSize).toBe(300);
      expect(col.maxSize).toBe(300);
    });

    it('returns taskDeadline column with 80px width', () => {
      const col = (getColumns(mockSelectedRows, mockSelectAllState, mockOnSelectAll, mockOnSelectRow))[7];
      expect(col.size).toBe(80);
      expect(col.minSize).toBe(80);
      expect(col.maxSize).toBe(80);
    });

    it('returns status2 column with 60px width', () => {
      const col = (getColumns(mockSelectedRows, mockSelectAllState, mockOnSelectAll, mockOnSelectRow))[8];
      expect(col.size).toBe(60);
      expect(col.minSize).toBe(60);
      expect(col.maxSize).toBe(60);
    });

    it('returns a total of 1940px for all column widths added together', () => {
      const total = (getColumns(mockSelectedRows, mockSelectAllState, mockOnSelectAll, mockOnSelectRow)).reduce((sum, col) => sum + (col.size || 0), 0);
      expect(total).toBe(1940);
    });

    it('all columns have required properties', () => {
      (getColumns(mockSelectedRows, mockSelectAllState, mockOnSelectAll, mockOnSelectRow)).forEach((col) => {
        expect(col.cell).toBeDefined();
        expect(col.header).toBeDefined();
        expect(col.size).toBeDefined();
        expect(col.minSize).toBeDefined();
        expect(col.maxSize).toBeDefined();
      });
    });
  });
});