import {
  CircleDollarSign,
  ShoppingCart,
  Target,
  TrendingUp,
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";

const stats = [
  {
    title: "Pipeline",
    value: "R$ 420.000",
    description: "28 oportunidades",
    icon: Target,
  },
  {
    title: "Forecast",
    value: "R$ 180.000",
    description: "Previsão mensal",
    icon: TrendingUp,
  },
  {
    title: "Vendas ganhas",
    value: "R$ 92.000",
    description: "Este mês",
    icon: CircleDollarSign,
  },
  {
    title: "Pedidos ERP",
    value: "18",
    description: "5 aguardando faturamento",
    icon: ShoppingCart,
  },
];

const activities = [
  {
    id: 1,
    time: "09:00",
    title: "Retornar Comercial ABC",
    type: "Ligação",
  },
  {
    id: 2,
    time: "10:30",
    title: "Follow-up Empresa XYZ",
    type: "Follow-up",
  },
  {
    id: 3,
    time: "14:00",
    title: "Reunião Cliente Alfa",
    type: "Reunião",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Visão geral da operação comercial."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {stat.description}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                  <Icon className="h-5 w-5 text-slate-600" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white xl:col-span-2">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-950">
              Pipeline comercial
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Distribuição das oportunidades por etapa.
            </p>
          </div>

          <div className="space-y-5 p-5">
            <PipelineItem
              name="Novo"
              count={22}
              value="R$ 120.000"
              width="80%"
            />

            <PipelineItem
              name="Qualificado"
              count={13}
              value="R$ 95.000"
              width="65%"
            />

            <PipelineItem
              name="Proposta"
              count={8}
              value="R$ 130.000"
              width="48%"
            />

            <PipelineItem
              name="Negociação"
              count={5}
              value="R$ 75.000"
              width="32%"
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-950">
              Atividades de hoje
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Próximas ações comerciais.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4 px-5 py-4"
              >
                <span className="w-12 shrink-0 text-sm font-medium text-slate-900">
                  {activity.time}
                </span>

                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {activity.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {activity.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-950">
            Status da integração
          </h2>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-3">
          <IntegrationStatus
            title="ERP"
            status="Conectado"
            description="Última sincronização há 2 min"
          />

          <IntegrationStatus
            title="Produtos"
            status="Atualizado"
            description="1.248 produtos sincronizados"
          />

          <IntegrationStatus
            title="Pedidos"
            status="Normal"
            description="Nenhuma falha pendente"
          />
        </div>
      </section>
    </div>
  );
}

type PipelineItemProps = {
  name: string;
  count: number;
  value: string;
  width: string;
};

function PipelineItem({
  name,
  count,
  value,
  width,
}: PipelineItemProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <div>
          <span className="text-sm font-medium text-slate-900">
            {name}
          </span>

          <span className="ml-2 text-xs text-slate-500">
            {count} oportunidades
          </span>
        </div>

        <span className="text-sm font-medium text-slate-700">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width }}
        />
      </div>
    </div>
  );
}

type IntegrationStatusProps = {
  title: string;
  status: string;
  description: string;
};

function IntegrationStatus({
  title,
  status,
  description,
}: IntegrationStatusProps) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-900">
          {title}
        </p>

        <span className="flex items-center gap-1.5 text-xs font-medium text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          {status}
        </span>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}