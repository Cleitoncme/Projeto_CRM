"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";

import { Plus, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CustomerSearchDialog } from "./customer-search-dialog";
import { ProductSearchDialog } from "./product-search-dialog";

import type { Deal, DealItem } from "@/types/deal";
import type { Customer } from "@/types/customers";
import type { Product } from "@/types/product";

interface DealFormProps {
  initialData?: Deal;
}

type DealFormItem = DealItem;

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function DealForm({ initialData }: DealFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");

  const [customerId, setCustomerId] = useState(initialData?.customerId ?? "");

  const [customerName, setCustomerName] = useState(
    initialData?.customerName ?? "",
  );

  const [contactName, setContactName] = useState(
    initialData?.contactName ?? "",
  );

  const [stage, setStage] = useState<Deal["stage"]>(
    initialData?.stage ?? "PROSPECTING",
  );

  const [priority, setPriority] = useState<Deal["priority"]>(
    initialData?.priority ?? "MEDIUM",
  );

  const [probability, setProbability] = useState(
    initialData?.probability ?? 20,
  );

  const [expectedCloseDate, setExpectedCloseDate] = useState(
    initialData?.expectedCloseDate ?? "",
  );

  const [salesperson, setSalesperson] = useState(
    initialData?.salesperson ?? "Administrador",
  );

  const [notes, setNotes] = useState(initialData?.notes ?? "");

  const [items, setItems] = useState<DealFormItem[]>(initialData?.items ?? []);

  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);

  const [productDialogOpen, setProductDialogOpen] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const dealValue = useMemo(() => {
    return items.reduce((total, item) => total + item.total, 0);
  }, [items]);

  function calculateItemTotal(
    quantity: number,
    unitPrice: number,
    discountPercent = 0,
  ) {
    const gross = quantity * unitPrice;
    const discountValue = gross * (discountPercent / 100);

    return gross - discountValue;
  }

  function addItem() {
    const hasEmptyItem = items.some((item) => !item.productId);

    if (hasEmptyItem) {
      return;
    }

    const newItem: DealFormItem = {
      id: crypto.randomUUID(),
      productId: "",
      productCode: "",
      productDescription: "",
      quantity: 1,
      unit: "UN",
      unitPrice: 0,
      discountPercent: 0,
      total: 0,
    };
    /*  function addItem() {
    const hasEmptyItem = items.some((item) => !item.productId);

    if (hasEmptyItem) {
      return;
    }

    const newItem: DealFormItem = {
      id: crypto.randomUUID(),
      productId: "",
      productCode: "",
      productDescription: "",
      quantity: 1,
      unit: "UN",
      unitPrice: 0,
      discountPercent: 0,
      total: 0,
    }; */

    setItems((currentItems) => [...currentItems, newItem]);
  }

  function removeItem(itemId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    );
  }

  function updateItem(
    itemId: string,
    field: keyof DealFormItem,
    value: string | number,
  ) {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        const updatedItem: DealFormItem = {
          ...item,
          [field]: value,
        };

        updatedItem.total = calculateItemTotal(
          Number(updatedItem.quantity),
          Number(updatedItem.unitPrice),
          Number(updatedItem.discountPercent ?? 0),
        );

        return updatedItem;
      }),
    );
  }

  function handleSelectCustomer(customer: Customer) {
    setCustomerId(customer.id);
    setCustomerName(customer.name);
  }

  function openProductSearch(itemId: string) {
    setSelectedItemId(itemId);
    setProductDialogOpen(true);
  }

  function handleSelectProduct(product: Product) {
    if (!selectedItemId) {
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== selectedItemId) {
          return item;
        }

        const total = calculateItemTotal(
          item.quantity,
          product.price,
          item.discountPercent ?? 0,
        );

        return {
          ...item,

          productId: product.id,
          productCode: product.code,
          productDescription: product.description,

          unit: product.unit,
          unitPrice: product.price,

          total,
        };
      }),
    );

    setSelectedItemId(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = {
      title,

      customerId,
      customerName,
      contactName,

      stage,
      priority,
      probability,

      expectedCloseDate,
      salesperson,

      notes,

      items,

      value: dealValue,
    };

    console.log("Oportunidade:", formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Dados da oportunidade
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Informe os dados principais da negociação.
            </p>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Título
              </label>

              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ex.: Novo contrato de distribuição"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Cliente
              </label>

              <div className="flex gap-2">
                <Input
                  value={customerName}
                  readOnly
                  placeholder="Selecione um cliente"
                />

                <button
                  type="button"
                  onClick={() => setCustomerDialogOpen(true)}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                  aria-label="Pesquisar cliente"
                  title="Pesquisar cliente"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Contato
              </label>

              <Input
                value={contactName}
                onChange={(event) => setContactName(event.target.value)}
                placeholder="Contato do cliente"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Etapa
              </label>

              <select
                value={stage}
                onChange={(event) =>
                  setStage(event.target.value as Deal["stage"])
                }
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="PROSPECTING">Prospecção</option>

                <option value="QUALIFICATION">Qualificação</option>

                <option value="PROPOSAL">Proposta</option>

                <option value="NEGOTIATION">Negociação</option>

                <option value="CLOSING">Fechamento</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Prioridade
              </label>

              <select
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value as Deal["priority"])
                }
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="LOW">Baixa</option>

                <option value="MEDIUM">Média</option>

                <option value="HIGH">Alta</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Probabilidade (%)
              </label>

              <Input
                type="number"
                min={0}
                max={100}
                value={probability}
                onChange={(event) => setProbability(Number(event.target.value))}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Previsão de fechamento
              </label>

              <Input
                type="date"
                value={expectedCloseDate}
                onChange={(event) => setExpectedCloseDate(event.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Responsável
              </label>

              <Input
                value={salesperson}
                onChange={(event) => setSalesperson(event.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Produtos
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Adicione os itens negociados nesta oportunidade.
              </p>
            </div>

            <Button type="button" onClick={addItem}>
              <Plus className="h-4 w-4" />
              Adicionar produto
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-slate-50">
                <tr>
                  <TableHeader>Código</TableHeader>

                  <TableHeader>Produto</TableHeader>

                  <TableHeader>Quantidade</TableHeader>

                  <TableHeader>Unidade</TableHeader>

                  <TableHeader>Preço unit.</TableHeader>

                  <TableHeader>Desconto</TableHeader>

                  <TableHeader>Total</TableHeader>

                  <TableHeader />
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-10 text-center text-sm text-slate-500"
                    >
                      Nenhum produto adicionado.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => {
                    const isNewItem = !item.productId;

                    return (
                      <tr
                        key={item.id}
                        className={
                          isNewItem
                            ? "bg-white"
                            : "bg-slate-50/80 text-slate-600"
                        }
                      >
                        <td className="px-3 py-3">
                          <div className="flex gap-2">
                            <Input
                              value={item.productCode}
                              readOnly
                              placeholder="Código"
                            />

                            <button
                              type="button"
                              onClick={() => openProductSearch(item.id)}
                              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                              aria-label="Pesquisar produto pelo código"
                              title="Pesquisar produto"
                            >
                              <Search className="h-4 w-4" />
                            </button>
                          </div>
                        </td>

                        <td className="px-3 py-3">
                          <div className="flex gap-2">
                            <Input
                              value={item.productDescription}
                              readOnly
                              placeholder="Selecione o produto"
                            />

                            <button
                              type="button"
                              onClick={() => openProductSearch(item.id)}
                              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                              aria-label="Pesquisar produto pela descrição"
                              title="Pesquisar produto"
                            >
                              <Search className="h-4 w-4" />
                            </button>
                          </div>
                        </td>

                        <td className="px-3 py-3">
                          <Input
                            type="number"
                            min={0.01}
                            step="0.01"
                            value={item.quantity}
                            onChange={(event) =>
                              updateItem(
                                item.id,
                                "quantity",
                                Number(event.target.value),
                              )
                            }
                          />
                        </td>

                        <td className="px-3 py-3">
                          <Input value={item.unit} readOnly />
                        </td>

                        <td className="px-3 py-3">
                          <Input
                            type="number"
                            min={0}
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(event) =>
                              updateItem(
                                item.id,
                                "unitPrice",
                                Number(event.target.value),
                              )
                            }
                          />
                        </td>

                        <td className="px-3 py-3">
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            step="0.01"
                            value={item.discountPercent ?? 0}
                            onChange={(event) =>
                              updateItem(
                                item.id,
                                "discountPercent",
                                Number(event.target.value),
                              )
                            }
                          />
                        </td>

                        <td className="px-5 py-3 text-sm font-semibold text-slate-900">
                          {currencyFormatter.format(item.total)}
                        </td>

                        <td className="px-3 py-3">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                            aria-label="Remover produto"
                            title="Remover produto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-5 py-4">
            <div className="w-full max-w-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-900">
                  Total da oportunidade
                </span>

                <span className="text-lg font-semibold text-slate-950">
                  {currencyFormatter.format(dealValue)}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Observações
          </label>

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={5}
            placeholder="Informações adicionais da negociação..."
            className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </section>

        <div className="flex justify-end gap-3">
          <Button type="submit">
            {initialData ? "Salvar alterações" : "Criar oportunidade"}
          </Button>
        </div>
      </form>

      <CustomerSearchDialog
        open={customerDialogOpen}
        onClose={() => setCustomerDialogOpen(false)}
        onSelect={handleSelectCustomer}
      />

      <ProductSearchDialog
        open={productDialogOpen}
        onClose={() => {
          setProductDialogOpen(false);
          setSelectedItemId(null);
        }}
        onSelect={handleSelectProduct}
      />
    </>
  );
}

function TableHeader({ children }: { children?: ReactNode }) {
  return (
    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}
