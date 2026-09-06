import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";


/* import { ProductsTable } from "@/features/products/components/products-table";
import { ProductsToolbar } from "@/features/products/components/products-toolbar"; */
import { ProductsList } from "@/features/products/components/products-list";
import { productsMock } from "@/features/products/products.mock";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Produtos"
        description="Consulte e gerencie o catálogo de produtos."
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            Novo produto
          </Button>
        }
      />

      <ProductsList products={productsMock} />
    </div>
  );
}