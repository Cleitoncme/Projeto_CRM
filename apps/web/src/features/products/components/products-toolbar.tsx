"use client";

import { Filter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: "ALL" | "ACTIVE" | "INACTIVE";
  onStatusChange: (
    value: "ALL" | "ACTIVE" | "INACTIVE"
  ) => void;

  stock: "ALL" | "AVAILABLE" | "LOW" | "OUT";
  onStockChange: (
    value: "ALL" | "AVAILABLE" | "LOW" | "OUT"
  ) => void;

  onClearFilters: () => void;
}

export function ProductsToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  stock,
  onStockChange,
  onClearFilters,
}: ProductsToolbarProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Buscar por código, descrição ou código de barras..."
            className="pl-10"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <select
            value={status}
            onChange={(event) =>
              onStatusChange(
                event.target.value as
                  | "ALL"
                  | "ACTIVE"
                  | "INACTIVE"
              )
            }
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="ALL">
              Todos os status
            </option>
            <option value="ACTIVE">
              Ativos
            </option>
            <option value="INACTIVE">
              Inativos
            </option>
          </select>

          <select
            value={stock}
            onChange={(event) =>
              onStockChange(
                event.target.value as
                  | "ALL"
                  | "AVAILABLE"
                  | "LOW"
                  | "OUT"
              )
            }
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="ALL">
              Todo estoque
            </option>
            <option value="AVAILABLE">
              Com estoque
            </option>
            <option value="LOW">
              Estoque baixo
            </option>
            <option value="OUT">
              Sem estoque
            </option>
          </select>

          <Button
            type="button"
            variant="outline"
            onClick={onClearFilters}
          >
            <Filter className="h-4 w-4" />
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
}