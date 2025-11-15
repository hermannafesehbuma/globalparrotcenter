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
  search?: string
  sortBy?: 'price-low' | 'price-high' | 'name'
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

  // Fetch products - try with category join first
  let query = supabase
    .from('products')
    .select(`
      *,
      categories(*)
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

  if (options?.search) {
    query = query.or(
      `name.ilike.%${options.search}%,description.ilike.%${options.search}%`
    )
  }

  // Sorting
  if (options?.sortBy === 'price-low') {
    query = query.order('price', { ascending: true })
  } else if (options?.sortBy === 'price-high') {
    query = query.order('price', { ascending: false })
  } else if (options?.sortBy === 'name') {
    query = query.order('name', { ascending: true })
  } else {
    // Default: sort by name
    query = query.order('name', { ascending: true })
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  let { data, error } = await query

  // If the join fails, try fetching products without the join
  if (error) {
    console.warn('Error fetching products with category join, trying without join:', error)
    // Try fetching products without the category join
    const simpleQuery = supabase
      .from('products')
      .select('*')
    
    if (categoryId) {
      simpleQuery.eq('category_id', categoryId)
    }
    
    if (options?.minPrice) {
      simpleQuery.gte('price', options.minPrice)
    }
    
    if (options?.maxPrice) {
      simpleQuery.lte('price', options.maxPrice)
    }
    
    if (options?.search) {
      simpleQuery.or(
        `name.ilike.%${options.search}%,description.ilike.%${options.search}%`
      )
    }
    
    // Apply sorting
    if (options?.sortBy === 'price-low') {
      simpleQuery.order('price', { ascending: true })
    } else if (options?.sortBy === 'price-high') {
      simpleQuery.order('price', { ascending: false })
    } else if (options?.sortBy === 'name') {
      simpleQuery.order('name', { ascending: true })
    } else {
      // Default: sort by name
      simpleQuery.order('name', { ascending: true })
    }
    
    if (options?.limit) {
      simpleQuery.limit(options.limit)
    }
    
    const simpleResult = await simpleQuery
    
    if (simpleResult.error) {
      console.error('Error fetching products:', simpleResult.error)
      const errorMessage = simpleResult.error.message || simpleResult.error.details || simpleResult.error.hint || 'Failed to fetch products'
      throw new Error(errorMessage)
    }
    
    data = simpleResult.data
    // Fetch categories separately and join them
    if (data && data.length > 0) {
      const categoryIds = [...new Set(data.map((p: any) => p.category_id).filter(Boolean))]
      if (categoryIds.length > 0) {
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*')
          .in('id', categoryIds)
        
        const categoriesMap = new Map((categoriesData || []).map((c: any) => [c.id, c]))
        
        data = data.map((product: any) => ({
          ...product,
          category: categoriesMap.get(product.category_id) || null
        }))
      } else {
        data = data.map((product: any) => ({
          ...product,
          category: null
        }))
      }
    }
  } else {
    // Transform the data to match ProductWithCategory type
    // Supabase returns categories in different formats depending on the query
    data = (data || []).map((product: any) => {
      // Try different possible property names for the category
      const category = product.categories || 
                      product.category || 
                      (product.category_id ? null : null) || 
                      null
      
      return {
        ...product,
        category: category
      }
    })
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
      categories(*)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  // Transform the data to match ProductWithCategory type
  if (data) {
    return {
      ...data,
      category: (data as any).categories || null
    } as ProductWithCategory
  }

  return null
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(
  limit: number = 3
): Promise<ProductWithCategory[]> {
  return getProducts({
    sortBy: 'name',
    limit,
  })
}

/**
 * Create a new product
 * Schema: id, category_id, name, description, price, image_urls (TEXT[]), age, gender (parrot_gender), created_at
 */
export async function createProduct(product: ProductInsert): Promise<Product> {
  const supabase = createBrowserClient()
  
  // Build clean insert object with only schema fields
  // Schema: id, category_id, name, description, price, image_urls (TEXT[]), age, gender (parrot_gender), created_at
  const insertData: ProductInsert = {
    name: product.name,
    category_id: product.category_id || null,
    description: product.description || null,
    price: product.price,
    image_urls: product.image_urls || null,
    age: product.age || null,
    gender: product.gender || null,
  }
  
  const { data, error } = await supabase
    .from('products')
    .insert(insertData)
    .select()
    .single()

  if (error) {
    console.error('Error creating product:', error)
    const errorMessage = error.message || error.details || error.hint || 'Failed to create product'
    throw new Error(errorMessage)
  }

  return data
}

/**
 * Update a product
 * Schema: id, category_id, name, description, price, image_urls (TEXT[]), age, gender (parrot_gender), created_at
 */
export async function updateProduct(
  id: number,
  updates: ProductUpdate
): Promise<Product> {
  const supabase = createBrowserClient()
  
  // Build clean update object with only schema fields
  const updateData: Partial<ProductUpdate> = {}
  
  if (updates.name !== undefined) {
    updateData.name = updates.name
  }
  if (updates.category_id !== undefined) {
    updateData.category_id = updates.category_id
  }
  if (updates.description !== undefined) {
    updateData.description = updates.description
  }
  if (updates.price !== undefined) {
    updateData.price = updates.price
  }
  if (updates.image_urls !== undefined) {
    updateData.image_urls = updates.image_urls
  }
  if (updates.age !== undefined) {
    updateData.age = updates.age
  }
  if (updates.gender !== undefined) {
    // Convert empty string to null for gender
    updateData.gender = updates.gender === '' ? null : updates.gender
  }
  
  // Ensure we have at least one field to update
  if (Object.keys(updateData).length === 0) {
    throw new Error('No fields provided to update')
  }
  
  const { data, error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating product:', error)
    console.error('Update data:', JSON.stringify(updateData, null, 2))
    console.error('Product ID:', id)
    
    // Better error message extraction
    let errorMessage = 'Failed to update product'
    if (error.message) {
      errorMessage = error.message
    } else if (error.details) {
      errorMessage = error.details
    } else if (error.hint) {
      errorMessage = error.hint
    } else if (error.code) {
      errorMessage = `Database error (${error.code})`
    } else {
      // Try to stringify the entire error object
      try {
        const errorStr = JSON.stringify(error, null, 2)
        if (errorStr && errorStr !== '{}') {
          errorMessage = `Update failed: ${errorStr}`
        }
      } catch (e) {
        // If stringification fails, use a generic message
        errorMessage = 'Failed to update product. Please check the console for details.'
      }
    }
    
    throw new Error(errorMessage)
  }

  if (!data) {
    throw new Error('Product update succeeded but no data was returned')
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

// Note: popularity field removed from schema
// This function is kept for backward compatibility but does nothing
export async function incrementProductPopularity(id: number): Promise<void> {
  // Functionality removed - popularity field no longer exists in schema
  console.warn('incrementProductPopularity called but popularity field no longer exists in schema')
}

