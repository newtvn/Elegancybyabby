import { Product, SpecialRequest } from "@/types";

const PRODUCTS_KEY = "elegancybyabby-demo-products";
const REQUESTS_KEY = "elegancybyabby-demo-requests";

// --- Products ---

export function getDemoProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveDemoProduct(product: Omit<Product, "id" | "created_at" | "updated_at">, imageDataUrls: string[]): Product {
  const products = getDemoProducts();
  const newProduct: Product = {
    ...product,
    id: `demo-${crypto.randomUUID()}`,
    images: imageDataUrls,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  products.unshift(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return newProduct;
}

export function updateDemoProduct(id: string, updates: Partial<Product>, imageDataUrls?: string[]): void {
  const products = getDemoProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return;
  products[index] = {
    ...products[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  if (imageDataUrls !== undefined) {
    products[index].images = imageDataUrls;
  }
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function deleteDemoProduct(id: string): void {
  const products = getDemoProducts().filter((p) => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

// --- File to Data URL ---

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// --- Requests ---

export function getDemoRequests(): SpecialRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(REQUESTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveDemoRequest(request: Omit<SpecialRequest, "id" | "created_at" | "status">): SpecialRequest {
  const requests = getDemoRequests();
  const newRequest: SpecialRequest = {
    ...request,
    id: `demo-${crypto.randomUUID()}`,
    status: "pending",
    created_at: new Date().toISOString(),
  };
  requests.unshift(newRequest);
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  return newRequest;
}

export function updateDemoRequestStatus(id: string, status: SpecialRequest["status"]): void {
  const requests = getDemoRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) return;
  requests[index].status = status;
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
}

// --- Check if Supabase is configured ---

export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
