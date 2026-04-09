"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item;

  return (
    <div className="flex gap-3 py-4 border-b border-[#e5e5e5]">
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-bg-secondary shrink-0">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-bg-secondary" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-primary font-medium truncate">{product.name}</p>
        <p className="text-sm text-text-primary font-bold">
          KSh {(product.price * quantity).toLocaleString("en-KE")}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
            className="w-6 h-6 rounded-lg border border-[#e5e5e5] flex items-center justify-center text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm text-text-primary w-6 text-center">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            className="w-6 h-6 rounded-lg border border-[#e5e5e5] flex items-center justify-center text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            <Plus className="w-3 h-3" />
          </button>
          <button
            onClick={() => onRemove(product.id)}
            className="ml-auto text-text-muted hover:text-red-500 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
