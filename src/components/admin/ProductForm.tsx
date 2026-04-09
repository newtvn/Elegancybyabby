"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Upload, X } from "lucide-react";
import { Product, Category } from "@/types";
import { CATEGORIES } from "@/lib/constants";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { saveDemoProduct, updateDemoProduct, fileToDataUrl, isSupabaseConfigured } from "@/lib/demo-store";

interface ProductFormProps {
  product?: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const isEditing = !!product;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    category: (product?.category || "women") as Category,
    is_trending: product?.is_trending || false,
  });
  const [existingImages, setExistingImages] = useState<string[]>(product?.images || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewFiles((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert new files to data URLs for image storage
      const newImageUrls: string[] = [];
      for (const file of newFiles) {
        const dataUrl = await fileToDataUrl(file);
        newImageUrls.push(dataUrl);
      }

      const allImages = [...existingImages, ...newImageUrls];

      if (isSupabaseConfigured()) {
        // Use Supabase
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();

        // Upload files to Supabase Storage
        const uploadedUrls: string[] = [];
        for (const file of newFiles) {
          const ext = file.name.split(".").pop();
          const path = `${crypto.randomUUID()}.${ext}`;
          const { error: uploadError } = await supabase.storage.from("product-images").upload(path, file);
          if (!uploadError) {
            const { data } = supabase.storage.from("product-images").getPublicUrl(path);
            uploadedUrls.push(data.publicUrl);
          }
        }

        const supaImages = [...existingImages, ...uploadedUrls];
        const productData = {
          name: form.name,
          description: form.description,
          price: parseInt(form.price, 10),
          category: form.category,
          is_trending: form.is_trending,
          images: supaImages,
          updated_at: new Date().toISOString(),
        };

        if (isEditing) {
          await supabase.from("products").update(productData).eq("id", product.id);
        } else {
          await supabase.from("products").insert(productData);
        }
      } else {
        // Demo mode — save to localStorage
        if (isEditing) {
          updateDemoProduct(product.id, {
            name: form.name,
            description: form.description,
            price: parseInt(form.price, 10),
            category: form.category,
            is_trending: form.is_trending,
          }, allImages);
        } else {
          saveDemoProduct(
            {
              name: form.name,
              description: form.description,
              price: parseInt(form.price, 10),
              category: form.category,
              is_trending: form.is_trending,
              images: allImages,
            },
            allImages
          );
        }
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <Input label="Product Name" placeholder="Gold Chunky Hoop Earrings" value={form.name} onChange={update("name")} required />
      <Textarea label="Description" placeholder="Describe the product..." value={form.description} onChange={update("description")} required />
      <Input label="Price (KSh)" type="number" placeholder="1200" value={form.price} onChange={update("price")} required min="1" />

      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Category</label>
        <select
          value={form.category}
          onChange={update("category")}
          className="w-full bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-[#cccccc]"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.slug}>{cat.label}</option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <div className={`w-10 h-5 rounded-full transition-colors relative ${form.is_trending ? "bg-bg-dark" : "bg-[#e5e5e5]"}`}
          onClick={() => setForm((prev) => ({ ...prev, is_trending: !prev.is_trending }))}>
          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${form.is_trending ? "left-5.5" : "left-0.5"}`} />
        </div>
        <span className="text-sm text-text-primary">Mark as Trending</span>
      </label>

      {existingImages.length > 0 && (
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Current Images</label>
          <div className="flex gap-2 flex-wrap">
            {existingImages.map((url) => (
              <div key={url} className="relative w-20 h-20 rounded-xl overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setExistingImages((prev) => prev.filter((img) => img !== url))}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">{isEditing ? "Add More Images" : "Product Images"}</label>
        <label className="flex items-center justify-center gap-2 w-full py-8 bg-bg-secondary border border-[#e5e5e5] border-dashed rounded-xl cursor-pointer hover:border-[#cccccc] transition-colors">
          <Upload className="w-5 h-5 text-text-muted" />
          <span className="text-sm text-text-muted">Click to upload images</span>
          <input type="file" accept="image/*" multiple onChange={handleFileChange} className="sr-only" />
        </label>
        {newFiles.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {newFiles.map((file, i) => (
              <div key={i} className="flex items-center gap-2 bg-bg-secondary rounded-lg px-3 py-1.5 text-xs text-text-muted">
                {file.name}
                <button type="button" onClick={() => setNewFiles((prev) => prev.filter((_, idx) => idx !== i))} className="cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        <Save className="w-4 h-4" />
        {loading ? "Saving..." : isEditing ? "Update Product" : "Add Product"}
      </Button>
    </form>
  );
}
