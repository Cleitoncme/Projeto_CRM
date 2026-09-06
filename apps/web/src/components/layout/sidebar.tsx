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
  X,
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

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-slate-950",
          "transform transition-transform duration-200 ease-in-out",
          "lg:translate-x-0",
          open
            ? "translate-x-0"
            : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
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

          {/* Botão fechar - mobile */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
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
                  onClick={onClose}
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
            onClick={onClose}
            className={[
              "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
              pathname === "/settings" ||
              pathname.startsWith("/settings/")
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:bg-slate-900 hover:text-white",
            ].join(" ")}
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
    </>
  );
}