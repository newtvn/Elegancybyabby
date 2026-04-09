"use client";

import { motion } from "framer-motion";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import Link from "next/link";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-text-muted text-lg mb-4">No items in this category yet.</p>
        <Link
          href="/requests"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-primary border border-[#e5e5e5] rounded-full px-5 py-2.5 hover:bg-bg-dark hover:text-white hover:border-bg-dark transition-all"
        >
          Request a custom piece
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}
