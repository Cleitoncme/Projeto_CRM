"use client";

import { useMemo, useState } from "react";

import type { Product } from "@/types/product";

import { ProductsTable } from "./products-table";
import { ProductsToolbar } from "./products-toolbar";

interface ProductsListProps {
  products: Product[];
}

type StatusFilter = "ALL" | "ACTIVE" | "INACTIVE";

type StockFilter =
  | "ALL"
  | "AVAILABLE"
  | "LOW"
  | "OUT";

export function ProductsList({
  products,
}: ProductsListProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<StatusFilter>("ALL");
  const [stock, setStock] =
    useState<StockFilter>("ALL");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.code
          .toLowerCase()
          .includes(normalizedSearch) ||
        product.description
          .toLowerCase()
          .includes(normalizedSearch) ||
        product.barcode
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        status === "ALL" ||
        product.status === status;

      const matchesStock =
        stock === "ALL" ||
        (stock === "AVAILABLE" &&
          product.stock > 10) ||
        (stock === "LOW" &&
          product.stock > 0 &&
          product.stock <= 10) ||
        (stock === "OUT" &&
          product.stock === 0);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesStock
      );
    });
  }, [products, search, status, stock]);

  function clearFilters() {
    setSearch("");
    setStatus("ALL");
    setStock("ALL");
  }

  return (
    <div className="space-y-4">
      <ProductsToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        stock={stock}
        onStockChange={setStock}
        onClearFilters={clearFilters}
      />

      <ProductsTable
        products={filteredProducts}
      />
    </div>
  );
}