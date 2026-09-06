import { notFound } from "next/navigation";
import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { productsMock } from "@/features/products/products.mock";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  const product = productsMock.find(
    (item) => item.id === id
  );

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para produtos
        </Link>
      </div>

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
            <Package className="h-5 w-5 text-slate-600" />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-slate-900">
                {product.description}
              </h1>

              {product.status === "ACTIVE" ? (
                <Badge variant="success">
                  Ativo
                </Badge>
              ) : (
                <Badge>Inativo</Badge>
              )}
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Código {product.code}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          label="Código"
          value={product.code}
        />

        <InfoCard
          label="Código de barras"
          value={product.barcode ?? "—"}
        />

        <InfoCard
          label="Unidade"
          value={product.unit}
        />

        <InfoCard
          label="Estoque"
          value={String(product.stock)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard
          label="Preço de venda"
          value={formatCurrency(product.price)}
        />

        <InfoCard
          label="Preço mínimo"
          value={
            product.minimumPrice !== undefined
              ? formatCurrency(
                  product.minimumPrice
                )
              : "—"
          }
        />
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}