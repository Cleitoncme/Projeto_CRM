export type DealStatus = "OPEN" | "WON" | "LOST";

export type DealStage =
  | "PROSPECTING"
  | "QUALIFICATION"
  | "PROPOSAL"
  | "NEGOTIATION"
  | "CLOSING";

export type DealPriority = "LOW" | "MEDIUM" | "HIGH";

export interface DealItem {
  id: string;

  productId: string;
  productCode: string;
  productDescription: string;

  quantity: number;
  unit: string;

  unitPrice: number;
  discountPercent?: number;

  total: number;
}

export interface Deal {
  id: string;

  title: string;

  customerId: string;
  customerName: string;

  contactName?: string;

  stage: DealStage;
  status: DealStatus;
  priority: DealPriority;

  value: number;
  probability: number;

  expectedCloseDate?: string;

  salesperson?: string;

  notes?: string;

  // Produtos vinculados à oportunidade
  items: DealItem[];

  createdAt: string;
  updatedAt: string;
}
