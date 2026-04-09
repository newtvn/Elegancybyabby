import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";
import { ProductForm } from "@/components/admin/ProductForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  let product: Product | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("products").select("*").eq("id", id).single();
    product = data as Product;
  } catch {
    // Supabase not configured
  }

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
