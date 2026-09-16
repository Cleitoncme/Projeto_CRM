import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { DealForm } from "@/features/deals/components/deal-form";

export default function NewDealPage() {
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

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
          Nova oportunidade
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Cadastre uma nova oportunidade comercial e adicione os produtos da
          negociação.
        </p>
      </div>

      <DealForm />
    </div>
  );
}
