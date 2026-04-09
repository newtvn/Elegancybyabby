import { Product } from "@/types";

const WISHLIST_KEY = "elegancybyabby-wishlist";

export function getWishlist(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveWishlist(items: Product[]): void {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}

export function toggleWishlistItem(items: Product[], product: Product): Product[] {
  const exists = items.some((item) => item.id === product.id);
  if (exists) {
    return items.filter((item) => item.id !== product.id);
  }
  return [...items, product];
}

export function isInWishlist(items: Product[], productId: string): boolean {
  return items.some((item) => item.id === productId);
}
