import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";

import { DealsList } from "@/features/deals/components/deals-list";
import { dealsMock } from "@/features/deals/deals.mock";

export default function DealsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Oportunidades"
        description="Gerencie as oportunidades comerciais e acompanhe o avanço das negociações."
        actions={
          <Link href="/deals/new">
            <Button>
              <Plus className="h-4 w-4" />
              Nova oportunidade
            </Button>
          </Link>
        }
      />

      <DealsList deals={dealsMock} />
    </div>
  );
}
