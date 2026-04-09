"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/components/ui/Toast";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const liked = isWishlisted(product.id);

  const handleAdd = () => {
    addItem(product);
    showToast(`${product.name} added to cart`);
  };

  const handleWishlist = () => {
    toggleItem(product);
    showToast(liked ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden card-shadow hover:card-shadow-hover transition-shadow duration-300 ${
        featured ? "row-span-2" : ""
      }`}
    >
      <div className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">Categories</p>
            <h3 className="text-base text-text-primary capitalize font-semibold">{product.category}</h3>
          </div>
          <button
            onClick={handleWishlist}
            className={`transition-colors cursor-pointer ${liked ? "text-red-500" : "text-text-muted hover:text-red-500"}`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-red-500" : ""}`} />
          </button>
        </div>
      </div>

      <div className={`relative overflow-hidden mx-4 my-3 rounded-xl bg-bg-secondary ${featured ? "h-56" : "h-40"}`}>
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-text-muted/30" />
          </div>
        )}
      </div>

      <div className="px-4 pb-4">
        <h3 className="text-sm font-semibold text-text-primary truncate mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-text-primary">
            KSh {product.price.toLocaleString("en-KE")}
          </span>
          <button
            onClick={handleAdd}
            className="text-xs font-medium text-text-primary border border-[#e5e5e5] rounded-full px-3 py-1.5 hover:bg-bg-dark hover:text-white hover:border-bg-dark transition-all cursor-pointer inline-flex items-center gap-1"
          >
            Add To Cart <ShoppingBag className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
