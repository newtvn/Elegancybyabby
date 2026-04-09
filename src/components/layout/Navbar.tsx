"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronDown, Menu } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { useCart } from "@/hooks/useCart";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 pt-4">
          <motion.div
            animate={{
              backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(10, 10, 10, 0.9)",
              color: scrolled ? "#0a0a0a" : "#ffffff",
            }}
            className="rounded-full px-6 py-3 flex items-center justify-between backdrop-blur-xl border border-white/10"
          >
            {/* Logo */}
            <Link href="/" className="font-serif italic text-lg tracking-wide" style={{ color: "inherit" }}>
              Elegancy
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className={`text-sm transition-colors ${pathname === "/" ? "opacity-100" : "opacity-70 hover:opacity-100"}`} style={{ color: "inherit" }}>
                Home
              </Link>

              <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
                <button className={`flex items-center gap-1 text-sm transition-colors cursor-pointer ${pathname.startsWith("/shop") ? "opacity-100" : "opacity-70 hover:opacity-100"}`} style={{ color: "inherit" }}>
                  Collection <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <AnimatePresence>
                  {shopOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl border border-[#e5e5e5] p-2 min-w-[200px] shadow-lg"
                    >
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/shop/${cat.slug}`}
                          className="block px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-xl transition-colors"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/requests" className={`text-sm transition-colors ${pathname === "/requests" ? "opacity-100" : "opacity-70 hover:opacity-100"}`} style={{ color: "inherit" }}>
                Custom Orders
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("toggle-cart"))}
                className="relative transition-colors cursor-pointer opacity-80 hover:opacity-100"
                style={{ color: "inherit" }}
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden cursor-pointer opacity-80 hover:opacity-100"
                style={{ color: "inherit" }}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
