export type PaymentMethod = 
  | "CashApp" 
  | "Apple Pay" 
  | "Venmo" 
  | "Chime" 
  | "Bank Transfer" 
  | "Zelle";

export interface Category {
  id: number;
  name: string;
  slug: string;
  minAge: number;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  category: Category;
  price: number;
  image: string;
  images?: string[];
  description: string;
  highlights: string[];
  temperament: string;
  careLevel: "Easy" | "Moderate" | "Advanced";
  size: "Small" | "Medium" | "Large";
  popularity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id?: string;
  name: string;
  email: string;
  phone: string;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  total: number;
  notes?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  publishedAt: string;
  author: string;
  tags: string[];
}

