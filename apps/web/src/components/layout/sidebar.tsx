"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Activity,
  Boxes,
  Building2,
  ChartNoAxesCombined,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Target,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Clientes",
    href: "/customers",
    icon: Building2,
  },
  {
    name: "Pipeline",
    href: "/pipeline",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Oportunidades",
    href: "/deals",
    icon: Target,
  },
  {
    name: "Produtos",
    href: "/products",
    icon: Boxes,
  },
  {
    name: "Pedidos",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    name: "Atividades",
    href: "/activities",
    icon: Activity,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-800 bg-slate-950 lg:flex">
      <div className="flex h-16 items-center border-b border-slate-800 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            CRM
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Projeto CRM
            </p>

            <p className="text-xs text-slate-400">
              Gestão comercial
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Comercial
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white",
                ].join(" ")}
              >
                <Icon className="h-[18px] w-[18px]" />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800 p-3">
        <Link
          href="/settings"
          className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-900 hover:text-white"
        >
          <Settings className="h-[18px] w-[18px]" />
          Configurações
        </Link>

        <div className="mt-3 flex items-center gap-3 rounded-lg px-3 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">
            AD
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              Administrador
            </p>

            <p className="truncate text-xs text-slate-500">
              admin@empresa.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}