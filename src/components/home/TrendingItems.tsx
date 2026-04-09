import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TrendingGrid } from "./TrendingGrid";
import { getSeedTrendingProducts } from "@/lib/seed-products";

export async function TrendingItems() {
  let products: Product[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("is_trending", true)
      .limit(6)
      .order("created_at", { ascending: false });
    products = (data as Product[]) || [];
  } catch {
    // Supabase not configured yet — use seed data
  }

  if (products.length === 0) {
    products = getSeedTrendingProducts();
  }

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-3">Trending</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary font-bold">
              Most Loved Pieces
            </h2>
          </div>
        </ScrollReveal>
        <TrendingGrid products={products} />
      </div>
    </section>
  );
}
