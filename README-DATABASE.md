# Database Setup Guide

This guide will help you set up the Supabase database for Global Parrot Center.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A new Supabase project created

## Setup Steps

### 1. Create the Database Schema

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase/schema.sql`
4. Run the SQL script to create all tables, indexes, and policies

### 2. Configure Environment Variables

1. In your Supabase project, go to Settings > API
2. Copy your Project URL and anon/public key
3. Create a `.env.local` file in the root of your project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Seed Initial Data (Optional)

You can manually insert initial data through the Supabase dashboard or create a seed script.

Example categories:
```sql
INSERT INTO categories (name, description, min_age, slug) VALUES
('Budgies', 'Small, friendly parrots perfect for beginners', 10, 'budgies'),
('Conures', 'Playful and colorful medium-sized parrots', 12, 'conures'),
('African Greys', 'Highly intelligent and talkative parrots', 14, 'african-greys'),
('Macaws', 'Large, majestic parrots requiring experienced owners', 16, 'macaws'),
('Cockatoos', 'Affectionate but demanding large parrots', 16, 'cockatoos'),
('Accessories', 'Cages, toys, food, and care supplies', 0, 'accessories');
```

## Database Schema

### Tables

1. **categories** - Stores parrot types and product categories
2. **products** - Stores parrots and related products
3. **orders** - Stores customer orders
4. **order_items** - Links products to orders with quantities

### Relationships

- `categories` (1) → (many) `products`
- `products` (1) → (many) `order_items`
- `orders` (1) → (many) `order_items`

## API Functions

All API functions are located in `lib/api/`:

- `categories.ts` - Category CRUD operations
- `products.ts` - Product queries and operations
- `orders.ts` - Order creation and management

### Usage Example

```typescript
import { getProducts, getCategories, createOrder } from '@/lib/api'

// Get all products
const products = await getProducts()

// Get products with filters
const filteredProducts = await getProducts({
  categoryId: 1,
  minPrice: 100,
  maxPrice: 500,
  sortBy: 'popularity'
})

// Get categories
const categories = await getCategories()

// Create an order
const order = await createOrder(
  {
    customer_name: 'John Doe',
    customer_email: 'john@example.com',
    shipping_address_line1: '123 Main St',
    city: 'New York',
    country: 'USA',
    payment_option: 'cashapp',
    total_amount: 350.00
  },
  [
    {
      product_id: 1,
      quantity: 1,
      price: 350.00
    }
  ]
)
```

## Row Level Security (RLS)

The schema includes basic RLS policies:
- Categories and Products: Public read access
- Orders: Public read/insert (adjust based on your authentication needs)

**Important**: Review and adjust RLS policies based on your authentication requirements. For production, you should:
- Restrict order access to authenticated users
- Implement proper user authentication
- Add policies for admin operations

## Next Steps

1. Set up authentication (if needed)
2. Adjust RLS policies for your use case
3. Create additional indexes if needed for your queries
4. Set up database backups
5. Configure environment variables in your deployment platform

