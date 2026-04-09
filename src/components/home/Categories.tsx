"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const categories = [
  {
    slug: "women",
    label: "Earrings",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&h=400&fit=crop&q=80",
  },
  {
    slug: "women",
    label: "Necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&q=80",
  },
  {
    slug: "men",
    label: "Chains",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&q=80",
  },
  {
    slug: "women",
    label: "Bracelets",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop&q=80",
  },
  {
    slug: "children",
    label: "Hair Accessories",
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&h=400&fit=crop&q=80",
  },
  {
    slug: "official",
    label: "Formal Pieces",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&q=80",
  },
];

export function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">Categories</p>
              <h2 className="font-serif text-3xl md:text-4xl text-text-primary">
                Browse by Category
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center text-text-primary hover:bg-bg-dark hover:text-white hover:border-bg-dark transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full bg-bg-dark text-white flex items-center justify-center hover:bg-bg-dark-secondary transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={`${cat.slug}-${cat.label}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="shrink-0"
            >
              <Link href={`/shop/${cat.slug}`} className="group block">
                <div className="w-[280px] bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-shadow duration-300">
                  <div className="p-4 pb-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">Categories</p>
                    <h3 className="font-serif text-xl text-text-primary mt-1">{cat.label}</h3>
                  </div>
                  <div className="h-48 overflow-hidden mx-4 rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 pt-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-primary border border-[#e5e5e5] rounded-full px-3 py-1.5 group-hover:bg-bg-dark group-hover:text-white group-hover:border-bg-dark transition-all">
                      Shop Now <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
