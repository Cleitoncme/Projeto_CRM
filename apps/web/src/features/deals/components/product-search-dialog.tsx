"use client";

import { useMemo, useState, type ReactNode } from "react";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { productsMock } from "@/features/products/products.mock";
import type { Product } from "@/types/product";

interface ProductSearchDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (product: Product) => void;
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function ProductSearchDialog({
  open,
  onClose,
  onSelect,
}: ProductSearchDialogProps) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return productsMock;
    }

    return productsMock.filter((product) => {
      return (
        product.code.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        (product.barcode ?? "").toLowerCase().includes(normalizedSearch)
      );
    });
  }, [search]);

  if (!open) {
    return null;
  }

  function handleSelect(product: Product) {
    onSelect(product);
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
        aria-label="Fechar pesquisa de produtos"
        onClick={handleClose}
        className="absolute inset-0 bg-slate-950/50"
      />

      <div className="relative z-10 flex max-h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Pesquisar produto
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Pesquise pelo código, descrição ou código de barras.
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
              placeholder="Pesquisar produto..."
              className="pl-9"
              autoFocus
            />
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full min-w-[850px]">
            <thead className="sticky top-0 bg-slate-50">
              <tr>
                <TableHeader>Código</TableHeader>
                <TableHeader>Produto</TableHeader>
                <TableHeader>Unidade</TableHeader>
                <TableHeader>Preço</TableHeader>
                <TableHeader>Estoque</TableHeader>
                <TableHeader />
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    Nenhum produto encontrado.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-slate-900">
                      {product.code}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-900">
                        {product.description}
                      </p>

                      {product.barcode && (
                        <p className="mt-1 text-xs text-slate-500">
                          {product.barcode}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {product.unit}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {currencyFormatter.format(product.price)}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {product.stock}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleSelect(product)}
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

function TableHeader({ children }: { children?: ReactNode }) {
  return (
    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}
