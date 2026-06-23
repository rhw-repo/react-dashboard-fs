import { z } from 'zod';

const statusEnum = z.enum(['bronze', 'silver', 'gold', 'do not contact']);

export const recordSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  address: z.string(),
  postcode: z.string(),
  notes: z.string(),
  nextTask: z.string(),
  taskDeadline: z.union([z.date(), z.undefined()]),
  status: statusEnum,
  status2: z.union([z.literal(''), statusEnum]),
});
