"use client";

import { useRouter } from "next/navigation";

import type { Deal } from "@/types/deal";

interface DealsTableProps {
  deals: Deal[];
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const stageLabels: Record<Deal["stage"], string> = {
  PROSPECTING: "Prospecção",
  QUALIFICATION: "Qualificação",
  PROPOSAL: "Proposta",
  NEGOTIATION: "Negociação",
  CLOSING: "Fechamento",
};

const statusLabels: Record<Deal["status"], string> = {
  OPEN: "Aberta",
  WON: "Ganha",
  LOST: "Perdida",
};

const priorityLabels: Record<Deal["priority"], string> = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
};

export function DealsTable({ deals }: DealsTableProps) {
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <TableHeader>Oportunidade</TableHeader>
              <TableHeader>Cliente</TableHeader>
              <TableHeader>Etapa</TableHeader>
              <TableHeader>Valor</TableHeader>
              <TableHeader>Probabilidade</TableHeader>
              <TableHeader>Prioridade</TableHeader>
              <TableHeader>Responsável</TableHeader>
              <TableHeader>Status</TableHeader>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {deals.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-12 text-center text-sm text-slate-500"
                >
                  Nenhuma oportunidade encontrada.
                </td>
              </tr>
            ) : (
              deals.map((deal) => (
                <tr
                  key={deal.id}
                  onClick={() => router.push(`/deals/${deal.id}`)}
                  className="cursor-pointer transition-colors hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{deal.title}</p>

                      {deal.contactName && (
                        <p className="mt-1 text-xs text-slate-500">
                          {deal.contactName}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {deal.customerName}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {stageLabels[deal.stage]}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-900">
                    {currencyFormatter.format(deal.value)}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {deal.probability}%
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {priorityLabels[deal.priority]}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {deal.salesperson ?? "—"}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {statusLabels[deal.status]}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface TableHeaderProps {
  children: React.ReactNode;
}

function TableHeader({ children }: TableHeaderProps) {
  return (
    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}
