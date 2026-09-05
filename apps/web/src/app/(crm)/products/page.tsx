import { PageHeader } from "@/components/layout/page-header";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Produtos"
        description="Consulte produtos, preços e estoque integrados ao ERP."
      />

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-500">
          Módulo de produtos em desenvolvimento.
        </p>
      </div>
    </div>
  );
}