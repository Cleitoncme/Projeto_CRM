"use client";

import { Search, X } from "lucide-react";

interface DealsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: "ALL" | "OPEN" | "WON" | "LOST";
  onStatusChange: (value: "ALL" | "OPEN" | "WON" | "LOST") => void;

  stage:
    | "ALL"
    | "PROSPECTING"
    | "QUALIFICATION"
    | "PROPOSAL"
    | "NEGOTIATION"
    | "CLOSING";
  onStageChange: (
    value:
      | "ALL"
      | "PROSPECTING"
      | "QUALIFICATION"
      | "PROPOSAL"
      | "NEGOTIATION"
      | "CLOSING",
  ) => void;

  priority: "ALL" | "LOW" | "MEDIUM" | "HIGH";
  onPriorityChange: (value: "ALL" | "LOW" | "MEDIUM" | "HIGH") => void;

  onClearFilters: () => void;
}

export function DealsToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  stage,
  onStageChange,
  priority,
  onPriorityChange,
  onClearFilters,
}: DealsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar oportunidade, cliente ou contato..."
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value as DealsToolbarProps["status"])
        }
        className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm"
      >
        <option value="ALL">Todos os status</option>
        <option value="OPEN">Abertas</option>
        <option value="WON">Ganhas</option>
        <option value="LOST">Perdidas</option>
      </select>

      <select
        value={stage}
        onChange={(event) =>
          onStageChange(event.target.value as DealsToolbarProps["stage"])
        }
        className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm"
      >
        <option value="ALL">Todas as etapas</option>
        <option value="PROSPECTING">Prospecção</option>
        <option value="QUALIFICATION">Qualificação</option>
        <option value="PROPOSAL">Proposta</option>
        <option value="NEGOTIATION">Negociação</option>
        <option value="CLOSING">Fechamento</option>
      </select>

      <select
        value={priority}
        onChange={(event) =>
          onPriorityChange(event.target.value as DealsToolbarProps["priority"])
        }
        className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm"
      >
        <option value="ALL">Todas as prioridades</option>
        <option value="LOW">Baixa</option>
        <option value="MEDIUM">Média</option>
        <option value="HIGH">Alta</option>
      </select>

      <button
        type="button"
        onClick={onClearFilters}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
      >
        <X className="h-4 w-4" />
        Limpar
      </button>
    </div>
  );
}
