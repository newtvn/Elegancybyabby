"use client";

import { motion } from "framer-motion";
import { Product } from "@/types";
import { ProductCard } from "@/components/shop/ProductCard";

export function TrendingGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
        >
          <ProductCard product={product} featured={i === 0} />
        </motion.div>
      ))}
    </div>
  );
}
