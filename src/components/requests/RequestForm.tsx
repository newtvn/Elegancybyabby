"use client";

import { useState } from "react";
import { Send, Upload } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { saveDemoRequest, fileToDataUrl, isSupabaseConfigured } from "@/lib/demo-store";

export function RequestForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const { showToast } = useToast();

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.description) return;

    setLoading(true);
    try {
      let reference_image: string | null = null;

      if (isSupabaseConfigured()) {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();

        if (file) {
          const ext = file.name.split(".").pop();
          const path = `${crypto.randomUUID()}.${ext}`;
          const { error: uploadError } = await supabase.storage
            .from("request-images")
            .upload(path, file);
          if (!uploadError) {
            const { data } = supabase.storage.from("request-images").getPublicUrl(path);
            reference_image = data.publicUrl;
          }
        }

        const { error } = await supabase.from("special_requests").insert({
          ...form,
          reference_image,
        });
        if (error) throw error;
      } else {
        // Demo mode — save to localStorage
        if (file) {
          reference_image = await fileToDataUrl(file);
        }
        saveDemoRequest({ ...form, reference_image });
      }

      showToast("Your request has been submitted! We'll get back to you soon.");
      setForm({ full_name: "", email: "", phone: "", description: "" });
      setFile(null);
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
      <Input label="Full Name" placeholder="Your full name" value={form.full_name} onChange={update("full_name")} required />
      <Input label="Email" type="email" placeholder="your@email.com" value={form.email} onChange={update("email")} required />
      <Input label="Phone Number" type="tel" placeholder="+254..." value={form.phone} onChange={update("phone")} required />
      <Textarea label="Describe Your Desired Piece" placeholder="Tell us what you're looking for..." value={form.description} onChange={update("description")} required />

      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">
          Reference Image (Optional)
        </label>
        <label className="flex items-center justify-center gap-2 w-full py-6 bg-bg-secondary border border-[#e5e5e5] rounded-xl cursor-pointer hover:border-[#cccccc] transition-colors">
          <Upload className="w-5 h-5 text-text-muted" />
          <span className="text-sm text-text-muted">{file ? file.name : "Click to upload an image"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="sr-only"
          />
        </label>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        <Send className="w-4 h-4" />
        {loading ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  );
}
