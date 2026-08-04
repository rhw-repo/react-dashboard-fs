import type { RecordFormValues } from '@/schemas/person';

export type Person = {
  _id: string;
  name: string;
  nextTask?: string;
  taskDeadline?: Date;
  status: 'bronze' | 'silver' | 'gold' | 'do not contact';
  status2?: 'bronze' | 'silver' | 'gold' | 'do not contact';
};

export type PersonFile = {
  _id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  archived?: boolean;
};

/**
 * FullPerson is the concrete dataset shape.
 * It extends the public Person with optional contact/address fields
 * for the individual record view page.
 */
export type FullPerson = Person & {
  address?: string;
  email?: string;
  postcode?: string;
  notes?: PersonFile[];
  otherData?: RecordFormValues['otherData'];
};
