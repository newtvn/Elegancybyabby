"use client";

import { useCallback, useSyncExternalStore } from "react";
import { CartItem, Product } from "@/types";
import * as cartLib from "@/lib/cart";

let listeners: (() => void)[] = [];
let cartSnapshot: CartItem[] = [];

function emitChange() {
  cartSnapshot = cartLib.getCart();
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot() {
  return cartSnapshot;
}

function getServerSnapshot() {
  return [] as CartItem[];
}

if (typeof window !== "undefined") {
  cartSnapshot = cartLib.getCart();
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addItem = useCallback((product: Product) => {
    const updated = cartLib.addToCart(cartLib.getCart(), product);
    cartLib.saveCart(updated);
    emitChange();
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const updated = cartLib.updateQuantity(cartLib.getCart(), productId, quantity);
    cartLib.saveCart(updated);
    emitChange();
  }, []);

  const removeItem = useCallback((productId: string) => {
    const updated = cartLib.removeFromCart(cartLib.getCart(), productId);
    cartLib.saveCart(updated);
    emitChange();
  }, []);

  const clear = useCallback(() => {
    cartLib.clearCart();
    emitChange();
  }, []);

  const total = cartLib.getCartTotal(items);

  return { items, total, addItem, updateQuantity, removeItem, clear };
}
