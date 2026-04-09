"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg-dark">
      {/* Background jewelry image — grayscale premium */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1920&h=1080&fit=crop&q=80"
          alt="Fashion jewelry collection"
          className="w-full h-full object-cover opacity-50 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4"
          >
            Hair Accessories &amp; Hypoallergenic Jewelry
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-6 font-bold"
          >
            Redefining{" "}
            <span className="italic">Beauty</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/70 text-base md:text-lg max-w-md mb-10 leading-relaxed"
          >
            Hypoallergenic jewelry &amp; hair accessories that let you express your unique style. Next day delivery — pickup mtaani or doorstep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-4"
          >
            <Link href="/shop/women">
              <Button variant="dark" size="lg">Shop Now</Button>
            </Link>
            <Link href="/shop/men">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                Explore
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
