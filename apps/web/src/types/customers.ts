export type CustomerErpStatus =
  | "SYNCED"
  | "PENDING"
  | "ERROR"
  | "NOT_LINKED";

export type CustomerStatus = "ACTIVE" | "INACTIVE";

export interface Customer {
  id: string;

  name: string;
  tradeName?: string;
  document: string;

  city: string;
  state: string;

  salesperson?: string;

  status: CustomerStatus;
  erpStatus: CustomerErpStatus;

  erpCustomerKey?: number;

  createdAt: string;
}