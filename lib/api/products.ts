import { createBrowserClient } from '../supabase'
import {
  Product,
  ProductInsert,
  ProductUpdate,
  ProductWithCategory,
} from '../database.types'

/**
 * Get all products with optional filters
 */
export async function getProducts(options?: {
  categoryId?: number
  categorySlug?: string
  minPrice?: number
  maxPrice?: number
  size?: string
  search?: string
  sortBy?: 'popularity' | 'price-low' | 'price-high' | 'name'
  limit?: number
}): Promise<ProductWithCategory[]> {
  const supabase = createBrowserClient()
  
  // If filtering by slug, first get the category ID
  let categoryId = options?.categoryId
  if (options?.categorySlug && !categoryId) {
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', options.categorySlug)
      .single()
    
    if (category) {
      categoryId = category.id
    } else {
      // Category not found, return empty array
      return []
    }
  }

  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  if (options?.minPrice) {
    query = query.gte('price', options.minPrice)
  }

  if (options?.maxPrice) {
    query = query.lte('price', options.maxPrice)
  }

  if (options?.size) {
    query = query.eq('size', options.size)
  }

  if (options?.search) {
    query = query.or(
      `name.ilike.%${options.search}%,description.ilike.%${options.search}%`
    )
  }

  // Sorting
  if (options?.sortBy === 'popularity') {
    query = query.order('popularity', { ascending: false })
  } else if (options?.sortBy === 'price-low') {
    query = query.order('price', { ascending: true })
  } else if (options?.sortBy === 'price-high') {
    query = query.order('price', { ascending: false })
  } else if (options?.sortBy === 'name') {
    query = query.order('name', { ascending: true })
  } else {
    query = query.order('popularity', { ascending: false })
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    throw error
  }

  return (data as ProductWithCategory[]) || []
}

/**
 * Get a single product by ID with category
 */
export async function getProductById(
  id: number
): Promise<ProductWithCategory | null> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as ProductWithCategory
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(
  limit: number = 3
): Promise<ProductWithCategory[]> {
  return getProducts({
    sortBy: 'popularity',
    limit,
  })
}

/**
 * Create a new product
 */
export async function createProduct(product: ProductInsert): Promise<Product> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()

  if (error) {
    console.error('Error creating product:', error)
    throw error
  }

  return data
}

/**
 * Update a product
 */
export async function updateProduct(
  id: number,
  updates: ProductUpdate
): Promise<Product> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating product:', error)
    throw error
  }

  return data
}

/**
 * Delete a product
 */
export async function deleteProduct(id: number): Promise<void> {
  const supabase = createBrowserClient()
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

/**
 * Increment product popularity
 */
export async function incrementProductPopularity(id: number): Promise<void> {
  const supabase = createBrowserClient()
  const { error } = await supabase.rpc('increment_popularity', { product_id: id })

  if (error) {
    // If RPC doesn't exist, do manual update
    const product = await getProductById(id)
    if (product) {
      await updateProduct(id, { popularity: (product.popularity || 0) + 1 })
    }
  }
}

