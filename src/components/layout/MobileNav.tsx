"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 p-8"
          >
            <button onClick={onClose} className="text-text-muted hover:text-text-primary mb-10 cursor-pointer">
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-1">
              <Link href="/" onClick={onClose} className="block py-3 text-text-primary hover:text-gold transition-colors text-lg">
                Home
              </Link>

              <div className="py-3">
                <span className="text-xs uppercase tracking-[0.15em] text-text-muted font-medium mb-3 block">
                  Collection
                </span>
                <div className="space-y-1 pl-3">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/shop/${cat.slug}`}
                      onClick={onClose}
                      className="block py-2 text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/requests" onClick={onClose} className="block py-3 text-text-primary hover:text-gold transition-colors text-lg">
                Custom Orders
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
