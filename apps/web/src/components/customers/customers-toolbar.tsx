"use client";

import {
  Filter,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CustomersToolbar() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <Input
          placeholder="Buscar por cliente, CNPJ ou CPF..."
          className="pl-10"
        />
      </div>

      <div className="flex gap-2">
        <Button variant="outline">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>
    </div>
  );
}