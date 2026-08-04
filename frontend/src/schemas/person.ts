import { z } from 'zod';

const statusEnum = z.enum(['bronze', 'silver', 'gold', 'do not contact']);

export const recordSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  address: z.string(),
  postcode: z.string(),
  nextTask: z.string(),
  taskDeadline: z.union([z.date(), z.undefined()]),
  status2: z.union([z.literal(''), statusEnum]),
  // Wills/codicils are stored as parallel arrays (index N of datesOfWills
  // corresponds to index N of willIds), not as an array of {date, id} objects.
  otherData: z.object({
    datesOfWills: z.array(z.date()),
    willIds: z.array(z.string()),
    datesOfCodicils: z.array(z.date()),
    codicilIds: z.array(z.string()),
    dob: z.union([z.date(), z.undefined()]),
    executorIds: z.array(z.string()),
    beneficiaryIds: z.array(z.string()),
    contactNumbers: z.array(z.string()),
    emailAddresses: z.array(z.string()),
    previousAddresses: z.array(z.string()),
  }),
});

/**
 * Shape of RecordEditForm's values — a coerced subset of FullPerson
 * (optional fields defaulted to '' / undefined) that satisfies recordSchema.
 * Not interchangeable with Person/FullPerson.
 */
export type RecordFormValues = z.infer<typeof recordSchema>;
