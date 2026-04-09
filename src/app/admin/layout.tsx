"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, Inbox, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/requests", label: "Requests", icon: Inbox },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecking(false);
      setAuthed(true);
      return;
    }

    // Check demo auth
    const demoAuth = localStorage.getItem("elegancy-admin-demo");
    if (demoAuth === "true") {
      setAuthed(true);
      setChecking(false);
      return;
    }

    // Check Supabase auth
    (async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setAuthed(true);
        } else {
          router.push("/admin/login");
        }
      } catch {
        // Supabase not configured — redirect to login
        router.push("/admin/login");
      }
      setChecking(false);
    })();
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-secondary">
        <div className="text-text-muted text-sm">Loading...</div>
      </div>
    );
  }

  if (!authed) return null;

  const handleLogout = async () => {
    localStorage.removeItem("elegancy-admin-demo");
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Supabase not configured
    }
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-bg-secondary">
      <aside className="w-64 bg-white border-r border-[#e5e5e5] p-6 flex flex-col shrink-0">
        <Link href="/admin" className="italic text-lg text-text-primary mb-8 font-bold">
          Elegancy Admin
        </Link>
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  active ? "bg-bg-dark text-white" : "text-text-muted hover:text-text-primary hover:bg-bg-secondary"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-muted hover:text-red-500 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
