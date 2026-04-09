"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/Toast";
import { CartItem } from "./CartItem";
import { CheckoutForm } from "./CheckoutForm";

export function CartPanel() {
  const [open, setOpen] = useState(false);
  const { items, total, updateQuantity, removeItem, clear } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const handler = () => setOpen((prev) => !prev);
    window.addEventListener("toggle-cart", handler);
    return () => window.removeEventListener("toggle-cart", handler);
  }, []);

  const handleOrderSent = () => {
    clear();
    setOpen(false);
    showToast("Order sent! Check WhatsApp to confirm.");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#e5e5e5]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-text-primary" />
                <h2 className="text-lg text-text-primary font-bold">Your Cart</h2>
              </div>
              <button onClick={() => setOpen(false)} className="text-text-muted hover:text-text-primary cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-text-muted">
                  <ShoppingBag className="w-12 h-12 mb-3 opacity-20" />
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-[#e5e5e5]">
                <div className="flex justify-between mb-4">
                  <span className="text-text-muted text-sm">Total</span>
                  <span className="text-text-primary font-bold text-lg">
                    KSh {total.toLocaleString("en-KE")}
                  </span>
                </div>
                <CheckoutForm items={items} onOrderSent={handleOrderSent} />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
