import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { PageHeader } from "@/components/layout/page-header";

import { CustomersTable } from "@/features/customers/components/customers-table";
import { CustomersToolbar } from "@/features/customers/components/customers-toolbar";

import { customersMock } from "@/features/customers/customers.mock";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Clientes"
        description="Gerencie os clientes e empresas da operação comercial."
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            Novo cliente
          </Button>
        }
      />

      <CustomersToolbar />

      <CustomersTable customers={customersMock} />
    </div>
  );
}