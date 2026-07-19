"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Luggage, CalendarCheck, Users, FileText, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/trips", label: "Trips", icon: Luggage },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/blog", label: "Blog", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-cream-light">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-sm border border-brand-teal/10"
        aria-label="Toggle admin menu"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-brand-teal/10 transform transition-transform duration-200 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-teal text-white text-xs font-bold">BT</div>
            <div>
              <p className="font-serif font-bold text-brand-ink text-sm">Admin</p>
              <p className="text-[10px] text-brand-saffron uppercase tracking-wider">Dashboard</p>
            </div>
          </Link>
        </div>

        <nav className="px-3 space-y-1">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-teal text-white"
                    : "text-brand-ink/60 hover:bg-brand-teal/5 hover:text-brand-teal"
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Link href="/" className="block text-center text-xs text-brand-ink/40 hover:text-brand-teal transition-colors">
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">{children}</div>
      </div>
    </div>
  );
}
