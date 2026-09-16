import type { Deal } from "@/types/deal";

export const dealsMock: Deal[] = [
  {
    id: "3",
    title: "Novo contrato de distribuição",
    customerId: "3",
    customerName: "Distribuidora Gamma",

    stage: "QUALIFICATION",
    status: "OPEN",
    priority: "MEDIUM",

    value: 75030.5,
    probability: 35,

    salesperson: "Administrador",

    items: [
      {
        id: "1",
        productId: "1",
        productCode: "000125",
        productDescription: "Produto Alpha",
        quantity: 100,
        unit: "UN",
        unitPrice: 125.9,
        discountPercent: 5,
        total: 11960.5,
      },
      {
        id: "2",
        productId: "2",
        productCode: "000126",
        productDescription: "Produto Beta",
        quantity: 80,
        unit: "CX",
        unitPrice: 289,
        discountPercent: 0,
        total: 23120,
      },
      {
        id: "3",
        productId: "4",
        productCode: "000128",
        productDescription: "Produto Delta",
        quantity: 940,
        unit: "KG",
        unitPrice: 42.5,
        discountPercent: 0,
        total: 39950,
      },
    ],

    createdAt: "2026-08-28T10:20:00",
    updatedAt: "2026-09-01T09:40:00",
  },
];