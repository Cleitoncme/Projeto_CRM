import {
  MoreHorizontal,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import type {
  Customer,
  CustomerErpStatus,
} from "@/types/customer";

interface CustomersTableProps {
  customers: Customer[];
}

export function CustomersTable({
  customers,
}: CustomersTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <TableHeader>Cliente</TableHeader>
              <TableHeader>CNPJ / CPF</TableHeader>
              <TableHeader>Localização</TableHeader>
              <TableHeader>Vendedor</TableHeader>
              <TableHeader>ERP</TableHeader>
              <TableHeader>Status</TableHeader>

              <th className="w-14 px-4 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="transition-colors hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                      <UserRound className="h-4 w-4 text-slate-500" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {customer.tradeName ??
                          customer.name}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {customer.name}
                      </p>
                    </div>
                  </div>
                </td>

                <TableCell>
                  {customer.document}
                </TableCell>

                <TableCell>
                  {customer.city}/{customer.state}
                </TableCell>

                <TableCell>
                  {customer.salesperson ?? "Não definido"}
                </TableCell>

                <td className="px-5 py-4">
                  <ErpBadge
                    status={customer.erpStatus}
                  />
                </td>

                <td className="px-5 py-4">
                  {customer.status === "ACTIVE" ? (
                    <Badge variant="success">
                      Ativo
                    </Badge>
                  ) : (
                    <Badge>Inativo</Badge>
                  )}
                </td>

                <td className="px-4 py-4">
                  <button
                    type="button"
                    aria-label="Ações do cliente"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
        <p className="text-sm text-slate-500">
          Mostrando {customers.length} clientes
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            disabled
            className="h-8 rounded-lg border border-slate-200 px-3 text-sm text-slate-500 disabled:opacity-50"
          >
            Anterior
          </button>

          <button
            type="button"
            disabled
            className="h-8 rounded-lg border border-slate-200 px-3 text-sm text-slate-500 disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}

function ErpBadge({
  status,
}: {
  status: CustomerErpStatus;
}) {
  switch (status) {
    case "SYNCED":
      return (
        <Badge variant="success">
          Sincronizado
        </Badge>
      );

    case "PENDING":
      return (
        <Badge variant="warning">
          Pendente
        </Badge>
      );

    case "ERROR":
      return (
        <Badge variant="danger">
          Erro
        </Badge>
      );

    case "NOT_LINKED":
      return <Badge>Não vinculado</Badge>;
  }
}

function TableHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}

function TableCell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <td className="px-5 py-4 text-sm text-slate-600">
      {children}
    </td>
  );
}