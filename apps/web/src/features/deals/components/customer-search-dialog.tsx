"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { customersMock } from "@/features/customers/customers.mock";
import type { Customer } from "@/types/customers";

interface CustomerSearchDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (customer: Customer) => void;
}

export function CustomerSearchDialog({
  open,
  onClose,
  onSelect,
}: CustomerSearchDialogProps) {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return customersMock;
    }

    return customersMock.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(normalizedSearch) ||
        customer.document.toLowerCase().includes(normalizedSearch) ||
        customer.city.toLowerCase().includes(normalizedSearch) ||
        customer.state.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [search]);

  if (!open) {
    return null;
  }

  function handleSelect(customer: Customer) {
    onSelect(customer);
    setSearch("");
    onClose();
  }

  function handleClose() {
    setSearch("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Fechar pesquisa de clientes"
        onClick={handleClose}
        className="absolute inset-0 bg-slate-950/50"
      />

      <div className="relative z-10 flex max-h-[80vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Pesquisar cliente
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Localize o cliente pelo nome, documento ou cidade.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-slate-200 p-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar cliente..."
              className="pl-9"
              autoFocus
            />
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full min-w-[700px]">
            <thead className="sticky top-0 bg-slate-50">
              <tr>
                <TableHeader>Cliente</TableHeader>
                <TableHeader>Documento</TableHeader>
                <TableHeader>Cidade</TableHeader>
                <TableHeader>UF</TableHeader>
                <TableHeader />
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-900">
                        {customer.name}
                      </p>

                      {customer.tradeName && (
                        <p className="mt-1 text-xs text-slate-500">
                          {customer.tradeName}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {customer.document}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {customer.city}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {customer.state}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleSelect(customer)}
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                      >
                        Selecionar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TableHeader({ children }: { children?: React.ReactNode }) {
  return (
    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}
