"use client";

import { useRouter } from "next/navigation";

import { MoreHorizontal, Package } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/product";

interface ProductsTableProps {
  products: Product[];
}

/* export function ProductsTable({
  products,
}: ProductsTableProps) {
  return ( */
export function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter();
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <TableHeader>Código</TableHeader>
              <TableHeader>Produto</TableHeader>
              <TableHeader>Código de barras</TableHeader>
              <TableHeader>Unidade</TableHeader>
              <TableHeader>Preço</TableHeader>
              <TableHeader>Estoque</TableHeader>
              <TableHeader>Status</TableHeader>
              <th className="w-14 px-4 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-12 text-center text-sm text-slate-500"
                >
                  Nenhum produto encontrado.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => router.push(`/products/${product.id}`)}
                  className="cursor-pointer transition-colors hover:bg-slate-50"
                >
                  <TableCell>
                    <span className="font-mono font-medium text-slate-900">
                      {product.code}
                    </span>
                  </TableCell>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                        <Package className="h-4 w-4 text-slate-500" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <TableCell>{product.barcode ?? "—"}</TableCell>

                  <TableCell>{product.unit}</TableCell>

                  <TableCell>{formatCurrency(product.price)}</TableCell>

                  <td className="px-5 py-4">
                    {product.stock === 0 ? (
                      <Badge variant="danger">Sem estoque</Badge>
                    ) : product.stock <= 10 ? (
                      <Badge variant="warning">{product.stock}</Badge>
                    ) : (
                      <span className="text-sm text-slate-600">
                        {product.stock}
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    {product.status === "ACTIVE" ? (
                      <Badge variant="success">Ativo</Badge>
                    ) : (
                      <Badge>Inativo</Badge>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <button
                      type="button"
                      aria-label="Ações do produto"
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
        <p className="text-sm text-slate-500">
          Mostrando {products.length} produtos
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

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="px-5 py-4 text-sm text-slate-600">{children}</td>;
}
