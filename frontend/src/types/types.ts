export type Person = {
  id: string;
  name: string;
  nextTask?: string;
  taskDeadline?: string;
  status: 'bronze' | 'silver' | 'gold' | 'do not contact';
  status2?: 'bronze' | 'silver' | 'gold' | 'do not contact';
};

export type FullPerson = Person & {
  address?: string;
  email?: string;
  postcode?: string;
  notes?: string;
};
