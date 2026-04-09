export type Category =
  | "men"
  | "women"
  | "children"
  | "official"
  | "outdoors"
  | "corporate";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  is_trending: boolean;
  created_at: string;
  updated_at: string;
}

export interface SpecialRequest {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  description: string;
  reference_image: string | null;
  status: "pending" | "reviewed" | "completed";
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
