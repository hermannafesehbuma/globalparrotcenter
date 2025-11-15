// Database types for Global Parrot Center
// Generated from Supabase schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: number
          category_id: number | null
          name: string
          description: string | null
          price: number
          image_urls: string[] | null
          age: number | null
          gender: 'male' | 'female' | 'pairs' | null
          created_at: string
        }
        Insert: {
          id?: number
          category_id?: number | null
          name: string
          description?: string | null
          price: number
          image_urls?: string[] | null
          age?: number | null
          gender?: 'male' | 'female' | 'pairs' | null
          created_at?: string
        }
        Update: {
          id?: number
          category_id?: number | null
          name?: string
          description?: string | null
          price?: number
          image_urls?: string[] | null
          age?: number | null
          gender?: 'male' | 'female' | 'pairs' | null
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: number
          customer_name: string
          customer_email: string | null
          customer_phone: string | null
          shipping_address_line1: string
          shipping_address_line2: string | null
          city: string
          state: string | null
          country: string
          postal_code: string | null
          payment_option: 'cashapp' | 'apple pay' | 'venmo' | 'chime' | 'bank transfer' | 'zelle'
          total_amount: number
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          customer_name: string
          customer_email?: string | null
          customer_phone?: string | null
          shipping_address_line1: string
          shipping_address_line2?: string | null
          city: string
          state?: string | null
          country: string
          postal_code?: string | null
          payment_option: 'cashapp' | 'apple pay' | 'venmo' | 'chime' | 'bank transfer' | 'zelle'
          total_amount: number
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          customer_name?: string
          customer_email?: string | null
          customer_phone?: string | null
          shipping_address_line1?: string
          shipping_address_line2?: string | null
          city?: string
          state?: string | null
          country?: string
          postal_code?: string | null
          payment_option?: 'cashapp' | 'apple pay' | 'venmo' | 'chime' | 'bank transfer' | 'zelle'
          total_amount?: number
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: number
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: number
          order_id: number
          product_id: number
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: number
          quantity?: number
          price?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type Category = Database['public']['Tables']['categories']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type OrderItem = Database['public']['Tables']['order_items']['Row']

export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type OrderInsert = Database['public']['Tables']['orders']['Insert']
export type OrderItemInsert = Database['public']['Tables']['order_items']['Insert']

export type CategoryUpdate = Database['public']['Tables']['categories']['Update']
export type ProductUpdate = Database['public']['Tables']['products']['Update']
export type OrderUpdate = Database['public']['Tables']['orders']['Update']
export type OrderItemUpdate = Database['public']['Tables']['order_items']['Update']

// Extended types with relations
export type ProductWithCategory = Product & {
  category: Category | null
}

export type OrderWithItems = Order & {
  order_items: (OrderItem & {
    product: Product | null
  })[]
}

