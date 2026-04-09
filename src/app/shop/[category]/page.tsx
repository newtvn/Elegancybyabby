import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES, SITE_NAME } from "@/lib/constants";
import { Category, Product } from "@/types";
import { CategoryHeader } from "@/components/shop/CategoryHeader";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getSeedProductsByCategory } from "@/lib/seed-products";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.label} Jewelry | ${SITE_NAME}`,
    description: cat.description,
  };
}

export default async function ShopCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  let products: Product[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category", category as Category)
      .order("created_at", { ascending: false });
    products = (data as Product[]) || [];
  } catch {
    // Supabase not configured yet
  }

  if (products.length === 0) {
    products = getSeedProductsByCategory(category);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 mesh-bg min-h-screen">
      <CategoryHeader label={cat.label} description={cat.description} />
      <ProductGrid products={products} />
    </div>
  );
}
