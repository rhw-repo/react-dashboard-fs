export type Person = {
  id: string;
  name: string;
  address: string;
  postcode: string;
  status: "uncontacted" | "contacted" | "success" | "failed";
  email: string;
};
