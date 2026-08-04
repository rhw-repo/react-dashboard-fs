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
 * Wills/codicils are stored as parallel arrays (index N of datesOfWills
 * corresponds to index N of willIds), not as an array of {date, id} objects.
 * Dates are typed as Date here to match the taskDeadline convention on
 * Person — the update payload re-serializes them to ISO strings.
 */
export type OtherData = {
  datesOfWills: Date[];
  willIds: string[];
  datesOfCodicils: Date[];
  codicilIds: string[];
  dob?: Date;
  executorIds: string[];
  beneficiaryIds: string[];
  contactNumbers: string[];
  emailAddresses: string[];
  previousAddresses: string[];
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
  otherData?: OtherData;
};
