"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/components/ui/Toast";

const featuredProducts: Product[] = [
  {
    id: "feat-1",
    name: "Gold Chunky Hoops",
    description: "Hypoallergenic thick gold hoop earrings",
    category: "women",
    price: 1200,
    images: ["https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&h=500&fit=crop&q=80"],
    is_trending: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "feat-2",
    name: "Dainty Chain Necklace",
    description: "Hypoallergenic gold-tone chain with pendant",
    category: "women",
    price: 1300,
    images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop&q=80"],
    is_trending: true,
    created_at: "2026-01-02T00:00:00Z",
    updated_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "feat-3",
    name: "Crystal Drop Earrings",
    description: "Elegant crystal drop earrings with hypoallergenic posts",
    category: "women",
    price: 1500,
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop&q=80"],
    is_trending: true,
    created_at: "2026-01-03T00:00:00Z",
    updated_at: "2026-01-03T00:00:00Z",
  },
];

const originalPrices: Record<string, number> = {
  "feat-1": 1500,
  "feat-2": 1600,
  "feat-3": 1800,
};

function FeaturedCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const liked = isWishlisted(product.id);
  const origPrice = originalPrices[product.id];

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden card-shadow hover:card-shadow-hover transition-shadow group"
    >
      <div className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">Hypoallergenic</p>
            <h3 className="text-base text-text-primary font-semibold">{product.name}</h3>
          </div>
          <button
            onClick={handleWishlist}
            className={`transition-colors cursor-pointer ${liked ? "text-red-500" : "text-text-muted hover:text-red-500"}`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-red-500" : ""}`} />
          </button>
        </div>
        <span className="inline-block text-[10px] bg-bg-secondary text-text-secondary px-2 py-0.5 rounded mt-1">
          Sale
        </span>
      </div>
      <div className="h-40 overflow-hidden mx-4 my-3 rounded-xl bg-bg-secondary relative">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="px-4 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-text-primary">KSh {product.price.toLocaleString()}</span>
          {origPrice && (
            <span className="text-xs text-text-muted line-through">KSh {origPrice.toLocaleString()}</span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="text-xs font-medium text-text-primary border border-[#e5e5e5] rounded-full px-3 py-1.5 hover:bg-bg-dark hover:text-white hover:border-bg-dark transition-all cursor-pointer inline-flex items-center gap-1"
        >
          Add To Cart <ShoppingBag className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}

export function Featured() {
  return (
    <section className="py-24 mesh-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <ScrollReveal>
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight mb-6 font-bold">
                Earrings &amp;<br />
                <span className="italic">Accessories</span>
              </h2>
              <p className="text-text-muted leading-relaxed mb-8 max-w-md">
                Discover our collection of hypoallergenic jewelry — from bold statement hoops to delicate chain necklaces. Every piece is skin-friendly, lightweight, and crafted to make you shine.
              </p>
              <Link href="/shop/women">
                <Button variant="primary" size="lg">Shop Collection</Button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Right — Product Cards */}
          <div>
            <div className="flex justify-end gap-2 mb-6">
              <button className="w-10 h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center text-text-primary hover:bg-bg-dark hover:text-white hover:border-bg-dark transition-all cursor-pointer">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-bg-dark text-white flex items-center justify-center hover:bg-bg-dark-secondary transition-all cursor-pointer">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {featuredProducts.slice(0, 2).map((product, i) => (
                <FeaturedCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
