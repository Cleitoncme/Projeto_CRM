import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { dealsMock } from "@/features/deals/deals.mock";
import type { Deal } from "@/types/deal";

interface DealDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
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

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}

export default async function DealDetailsPage({
  params,
}: DealDetailsPageProps) {
  const { id } = await params;

  const deal = dealsMock.find((item) => item.id === id);

  if (!deal) {
    notFound();
  }

  const dealValue = deal.items.reduce((total, item) => total + item.total, 0);

  const weightedValue = dealValue * (deal.probability / 100);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/deals"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para oportunidades
        </Link>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              {deal.title}
            </h1>

            <DealStatusBadge status={deal.status} />
          </div>

          <p className="mt-2 text-sm text-slate-500">{deal.customerName}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge>{stageLabels[deal.stage]}</Badge>

          <Badge>Prioridade {priorityLabels[deal.priority]}</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          label="Valor da oportunidade"
          value={currencyFormatter.format(deal.value)}
        />

        <InfoCard label="Probabilidade" value={`${deal.probability}%`} />

        <InfoCard
          label="Valor ponderado"
          value={currencyFormatter.format(weightedValue)}
        />

        <InfoCard
          label="Previsão de fechamento"
          value={
            deal.expectedCloseDate
              ? formatDate(deal.expectedCloseDate)
              : "Não informada"
          }
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 xl:col-span-2">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Informações comerciais
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Dados principais da oportunidade.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <DetailItem label="Etapa" value={stageLabels[deal.stage]} />

            <DetailItem label="Status" value={statusLabels[deal.status]} />

            <DetailItem
              label="Prioridade"
              value={priorityLabels[deal.priority]}
            />

            <DetailItem
              label="Responsável"
              value={deal.salesperson ?? "Não informado"}
            />

            <DetailItem
              label="Criada em"
              value={formatDateTime(deal.createdAt)}
            />

            <DetailItem
              label="Última atualização"
              value={formatDateTime(deal.updatedAt)}
            />
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Cliente e contato
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Relacionamento vinculado à oportunidade.
            </p>
          </div>

          <div className="space-y-5">
            <DetailItem label="Cliente" value={deal.customerName} />

            <DetailItem
              label="Contato"
              value={deal.contactName ?? "Não informado"}
            />
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Produtos da oportunidade
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Itens negociados nesta oportunidade comercial.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50">
              <tr>
                <TableHeader>Código</TableHeader>
                <TableHeader>Produto</TableHeader>
                <TableHeader>Quantidade</TableHeader>
                <TableHeader>Unidade</TableHeader>
                <TableHeader>Preço unit.</TableHeader>
                <TableHeader>Desconto</TableHeader>
                <TableHeader>Total</TableHeader>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {deal.items.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    Nenhum produto vinculado a esta oportunidade.
                  </td>
                </tr>
              ) : (
                deal.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-5 py-4 text-sm font-medium text-slate-900">
                      {item.productCode}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {item.productDescription}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {item.quantity}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {item.unit}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {currencyFormatter.format(item.unitPrice)}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {item.discountPercent ?? 0}%
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                      {currencyFormatter.format(item.total)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {/* <tbody className="divide-y divide-slate-100">
              {deal.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-5 py-4 text-sm font-medium text-slate-900">
                    {item.productCode}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {item.productDescription}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {item.quantity}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {item.unit}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {currencyFormatter.format(item.unitPrice)}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {item.discountPercent ?? 0}%
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                    {currencyFormatter.format(item.total)}
                  </td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Observações
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Informações adicionais da negociação.
          </p>
        </div>

        <div className="mt-4 rounded-lg bg-slate-50 p-4">
          <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
            {deal.notes ?? "Nenhuma observação registrada."}
          </p>
        </div>
      </section>
    </div>
  );
}

interface InfoCardProps {
  label: string;
  value: string;
}

function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-2 text-xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}

function DealStatusBadge({ status }: { status: Deal["status"] }) {
  if (status === "WON") {
    return <Badge variant="success">Ganha</Badge>;
  }

  if (status === "LOST") {
    return <Badge variant="danger">Perdida</Badge>;
  }

  return <Badge>Aberta</Badge>;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(`${date}T12:00:00`));
}

function formatDateTime(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));
}
