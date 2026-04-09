"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { ProductTable } from "@/components/admin/ProductTable";
import { getDemoProducts, isSupabaseConfigured } from "@/lib/demo-store";
import { getSeedProductsByCategory } from "@/lib/seed-products";
import { CATEGORIES } from "@/lib/constants";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      if (isSupabaseConfigured()) {
        try {
          const { createClient } = await import("@/lib/supabase/client");
          const supabase = createClient();
          const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
          setProducts((data as Product[]) || []);
          return;
        } catch {
          // Fall through to demo
        }
      }

      // Demo mode — merge demo products + seed products
      const demoProducts = getDemoProducts();
      const seedProducts = CATEGORIES.flatMap((cat) => getSeedProductsByCategory(cat.slug));
      setProducts([...demoProducts, ...seedProducts]);
    }

    loadProducts();

    // Re-load when navigating back after adding a product
    const handleFocus = () => loadProducts();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <div>
      <h1 className="font-serif text-2xl text-text-primary mb-6">Products</h1>
      <ProductTable products={products} />
    </div>
  );
}
