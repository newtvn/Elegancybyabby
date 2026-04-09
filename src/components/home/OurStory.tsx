"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function OurStory() {
  return (
    <section className="py-24 mesh-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden card-shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&h=750&fit=crop&q=80"
                  alt="Abby — founder of Elegancybyabby"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 card-shadow border border-[#e5e5e5]"
              >
                <p className="font-serif italic text-lg text-text-primary">&ldquo;Beauty is how</p>
                <p className="font-serif italic text-lg text-text-primary">you define it.&rdquo;</p>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-3">Our Story</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight mb-6">
                A Passion for<br />
                <span className="italic">Style &amp; Accessorizing</span>
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  It all started with a girl who saw beauty in the details — the way a pair
                  of earrings could lift a whole outfit, or how a simple necklace could make
                  you feel like a completely different person. That girl was Abby.
                </p>
                <p>
                  What began as a personal love for accessorizing grew into something bigger.
                  From vending at university flea markets to building a brand trusted by hundreds,
                  Abby turned her passion into Elegancybyabby — a store where every piece is
                  handpicked, hypoallergenic, and made to make you feel beautiful.
                </p>
                <p>
                  Today, we deliver next day — pickup mtaani or right to your doorstep. Because
                  beauty shouldn&apos;t wait, and neither should you.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
