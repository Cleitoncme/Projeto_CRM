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
  Users,
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
    icon: Users,
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
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-800 bg-slate-950 lg:flex lg:flex-col">
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <div>
          <p className="text-sm font-semibold text-white">Projeto CRM</p>
          <p className="text-xs text-slate-400">Gestão comercial</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-white"
        >
          <Settings className="h-4 w-4" />
          Configurações
        </Link>
      </div>
    </aside>
  );
}