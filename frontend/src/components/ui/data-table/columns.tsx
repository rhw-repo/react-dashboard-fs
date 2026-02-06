"use client";

import { type ColumnDef } from "@tanstack/react-table";

type Person = {
  id: string;
  name: string;
  address: string;
  postcode: string;
  status: "uncontacted" | "contacted" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "postcode",
    header: "Postcode",
  },
];
