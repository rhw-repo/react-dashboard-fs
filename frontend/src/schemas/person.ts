import { z } from 'zod';

const statusEnum = z.enum(['bronze', 'silver', 'gold', 'do not contact']);

export const recordSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  address: z.string(),
  postcode: z.string(),
  nextTask: z.string(),
  taskDeadline: z.union([z.date(), z.undefined()]),
  status2: z.union([z.literal(''), statusEnum]),
});

/**
 * Shape of RecordEditForm's values — a coerced subset of FullPerson
 * (optional fields defaulted to '' / undefined) that satisfies recordSchema.
 * Not interchangeable with Person/FullPerson.
 */
export type RecordFormValues = z.infer<typeof recordSchema>;
