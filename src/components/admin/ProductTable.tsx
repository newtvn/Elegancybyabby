"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Trash2, Star } from "lucide-react";
import { Product, Category } from "@/types";
import { CATEGORIES } from "@/lib/constants";
import { deleteDemoProduct, isSupabaseConfigured } from "@/lib/demo-store";
import { Button } from "@/components/ui/Button";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products: initialProducts }: ProductTableProps) {
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState<Category | "all">("all");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setDeleting(product.id);

    if (product.id.startsWith("demo-") || product.id.startsWith("seed-")) {
      // Demo product — remove from local state and localStorage
      deleteDemoProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } else if (isSupabaseConfigured()) {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        for (const imageUrl of product.images) {
          const path = imageUrl.split("/product-images/").pop();
          if (path) await supabase.storage.from("product-images").remove([path]);
        }
        await supabase.from("products").delete().eq("id", product.id);
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
      } catch {
        alert("Failed to delete product.");
      }
    }

    setDeleting(null);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Category | "all")}
          className="bg-white border border-[#e5e5e5] rounded-xl px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-[#cccccc]"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.slug}>{cat.label}</option>
          ))}
        </select>
        <Link href="/admin/products/new" className="ml-auto">
          <Button size="sm">Add Product</Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden card-shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e5e5e5]">
              <th className="text-left text-[10px] uppercase tracking-[0.15em] text-text-muted px-4 py-3">Name</th>
              <th className="text-left text-[10px] uppercase tracking-[0.15em] text-text-muted px-4 py-3 hidden sm:table-cell">Category</th>
              <th className="text-left text-[10px] uppercase tracking-[0.15em] text-text-muted px-4 py-3">Price</th>
              <th className="text-left text-[10px] uppercase tracking-[0.15em] text-text-muted px-4 py-3 hidden md:table-cell">Trending</th>
              <th className="text-right text-[10px] uppercase tracking-[0.15em] text-text-muted px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b border-[#f0f0f0] hover:bg-bg-secondary transition-colors">
                <td className="px-4 py-3 text-sm text-text-primary font-medium">{product.name}</td>
                <td className="px-4 py-3 text-sm text-text-muted capitalize hidden sm:table-cell">{product.category}</td>
                <td className="px-4 py-3 text-sm text-text-primary font-semibold">KSh {product.price.toLocaleString("en-KE")}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  {product.is_trending && <Star className="w-4 h-4 text-gold fill-gold" />}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <button className="text-text-muted hover:text-text-primary transition-colors p-1 cursor-pointer"><Edit className="w-4 h-4" /></button>
                    </Link>
                    <button
                      onClick={() => handleDelete(product)}
                      disabled={deleting === product.id}
                      className="text-text-muted hover:text-red-500 transition-colors p-1 disabled:opacity-40 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-text-muted">No products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
