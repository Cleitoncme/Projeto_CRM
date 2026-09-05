import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";

type CrmLayoutProps = {
  children: ReactNode;
};

export default function CrmLayout({
  children,
}: CrmLayoutProps) {
  return <AppShell>{children}</AppShell>;
}