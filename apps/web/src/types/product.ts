export type ProductStatus = "ACTIVE" | "INACTIVE";

export interface Product {
  id: string;

  code: string;
  barcode?: string;

  description: string;
  unit: string;

  price: number;
  minimumPrice?: number;

  stock: number;

  status: ProductStatus;

  // Será utilizado futuramente na integração com o ERP
  erpProductKey?: number;
  erpCompanyKey?: number;

  createdAt: string;
}
