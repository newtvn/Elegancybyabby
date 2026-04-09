"use client";

import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/constants";
import { DashboardCards } from "@/components/admin/DashboardCards";
import { getDemoProducts, getDemoRequests, isSupabaseConfigured } from "@/lib/demo-store";
import { SEED_PRODUCTS } from "@/lib/seed-products";

export default function AdminDashboardPage() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadData() {
      if (isSupabaseConfigured()) {
        try {
          const { createClient } = await import("@/lib/supabase/client");
          const supabase = createClient();
          const { data: products } = await supabase.from("products").select("category");
          const { count } = await supabase
            .from("special_requests")
            .select("*", { count: "exact", head: true })
            .eq("status", "pending");

          setTotalProducts(products?.length || 0);
          setPendingRequests(count || 0);

          const counts: Record<string, number> = {};
          CATEGORIES.forEach((cat) => {
            counts[cat.slug] = (products || []).filter((p: { category: string }) => p.category === cat.slug).length;
          });
          setCategoryCounts(counts);
          return;
        } catch {
          // Fall through to demo
        }
      }

      // Demo mode
      const demoProducts = getDemoProducts();
      const allProducts = [...demoProducts, ...SEED_PRODUCTS];
      const demoRequests = getDemoRequests();

      setTotalProducts(allProducts.length);
      setPendingRequests(demoRequests.filter((r) => r.status === "pending").length);

      const counts: Record<string, number> = {};
      CATEGORIES.forEach((cat) => {
        counts[cat.slug] = allProducts.filter((p) => p.category === cat.slug).length;
      });
      setCategoryCounts(counts);
    }

    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-text-primary mb-6 font-bold">Dashboard</h1>
      <DashboardCards categoryCounts={categoryCounts} totalProducts={totalProducts} pendingRequests={pendingRequests} />
    </div>
  );
}
