"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Product } from "@/types";
import * as wishlistLib from "@/lib/wishlist";

let listeners: (() => void)[] = [];
let wishlistSnapshot: Product[] = [];

function emitChange() {
  wishlistSnapshot = wishlistLib.getWishlist();
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot() {
  return wishlistSnapshot;
}

function getServerSnapshot() {
  return [] as Product[];
}

if (typeof window !== "undefined") {
  wishlistSnapshot = wishlistLib.getWishlist();
}

export function useWishlist() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleItem = useCallback((product: Product) => {
    const updated = wishlistLib.toggleWishlistItem(wishlistLib.getWishlist(), product);
    wishlistLib.saveWishlist(updated);
    emitChange();
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlistLib.isInWishlist(items, productId),
    [items]
  );

  return { items, toggleItem, isWishlisted };
}
