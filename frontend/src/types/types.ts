export type Person = {
  id: string;
  name: string;
  nextTask: string;
  taskDeadline: string;
  status: 'uncontacted' | 'contacted' | 'in progress' | 'completed';
  status2: 'bronze' | 'silver' | 'gold' | 'do not contact';
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
};
