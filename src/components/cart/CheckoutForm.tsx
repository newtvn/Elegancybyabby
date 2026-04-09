"use client";

import { useState } from "react";
import { Send, Smartphone } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CartItem } from "@/types";
import { buildWhatsAppURL } from "@/lib/whatsapp";
import { MPESA_NUMBER } from "@/lib/constants";

interface CheckoutFormProps {
  items: CartItem[];
  onOrderSent: () => void;
}

export function CheckoutForm({ items, onOrderSent }: CheckoutFormProps) {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");

  const canSubmit = name.trim() && area.trim() && items.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const url = buildWhatsAppURL(items, name.trim(), area.trim());
    window.open(url, "_blank");
    onOrderSent();
  };

  return (
    <div className="space-y-4">
      {/* M-Pesa payment info */}
      <div className="bg-bg-secondary rounded-xl p-4 border border-[#e5e5e5]">
        <div className="flex items-center gap-2 mb-2">
          <Smartphone className="w-4 h-4 text-text-primary" />
          <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">Pay via M-Pesa</span>
        </div>
        <p className="text-xs text-text-muted leading-relaxed">
          Pochi la Biashara / Lipa na M-Pesa<br />
          Number: <span className="font-semibold text-text-primary">{MPESA_NUMBER}</span>
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Delivery area / location" value={area} onChange={(e) => setArea(e.target.value)} />
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full disabled:opacity-40 disabled:cursor-not-allowed"
          size="lg"
        >
          <Send className="w-4 h-4" />
          Send Order via WhatsApp
        </Button>
      </div>
    </div>
  );
}
