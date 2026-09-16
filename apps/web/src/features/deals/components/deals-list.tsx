"use client";

import { useMemo, useState } from "react";

import type { Deal } from "@/types/deal";
import { DealsToolbar } from "./deals-toolbar";
import { DealsTable } from "./deals-table";

interface DealsListProps {
  deals: Deal[];
}

type StatusFilter = "ALL" | Deal["status"];
type StageFilter = "ALL" | Deal["stage"];
type PriorityFilter = "ALL" | Deal["priority"];

export function DealsList({ deals }: DealsListProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("ALL");
  const [stage, setStage] = useState<StageFilter>("ALL");
  const [priority, setPriority] = useState<PriorityFilter>("ALL");

  const filteredDeals = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return deals.filter((deal) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        deal.title.toLowerCase().includes(normalizedSearch) ||
        deal.customerName.toLowerCase().includes(normalizedSearch) ||
        (deal.contactName ?? "").toLowerCase().includes(normalizedSearch);

      const matchesStatus = status === "ALL" || deal.status === status;

      const matchesStage = stage === "ALL" || deal.stage === stage;

      const matchesPriority = priority === "ALL" || deal.priority === priority;

      return matchesSearch && matchesStatus && matchesStage && matchesPriority;
    });
  }, [deals, search, status, stage, priority]);

  function clearFilters() {
    setSearch("");
    setStatus("ALL");
    setStage("ALL");
    setPriority("ALL");
  }

  return (
    <div className="space-y-4">
      <DealsToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        stage={stage}
        onStageChange={setStage}
        priority={priority}
        onPriorityChange={setPriority}
        onClearFilters={clearFilters}
      />

      <DealsTable deals={filteredDeals} />
    </div>
  );
}
