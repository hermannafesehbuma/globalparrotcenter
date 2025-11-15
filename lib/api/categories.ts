import { createBrowserClient } from '../supabase'
import { Category, CategoryInsert, CategoryUpdate } from '../database.types'

/**
 * Get all categories
 * Schema: id, name (VARCHAR(100) NOT NULL), description (TEXT), created_at, updated_at
 */
export async function getCategories(): Promise<Category[]> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    throw error
  }

  return data || []
}

/**
 * Get a single category by ID
 */
export async function getCategoryById(id: number): Promise<Category | null> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
  }

  return data
}

/**
 * Create a new category
 * Schema: name VARCHAR(100) NOT NULL, description TEXT (optional)
 * Auto-generated: id (SERIAL), created_at, updated_at
 */
export async function createCategory(category: CategoryInsert): Promise<Category> {
  const supabase = createBrowserClient()
  
  // Validate required fields according to schema
  if (!category.name || category.name.trim().length === 0) {
    throw new Error('Category name is required')
  }
  
  if (category.name.length > 100) {
    throw new Error('Category name must be 100 characters or less')
  }
  
  const { data, error } = await supabase
    .from('categories')
    .insert({
      name: category.name.trim(),
      description: category.description?.trim() || null,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating category:', error)
    throw error
  }

  return data
}

/**
 * Update a category
 */
export async function updateCategory(
  id: number,
  updates: CategoryUpdate
): Promise<Category> {
  const supabase = createBrowserClient()
  
  // Validate name if provided
  if (updates.name !== undefined) {
    if (!updates.name || updates.name.trim().length === 0) {
      throw new Error('Category name cannot be empty')
    }
    if (updates.name.length > 100) {
      throw new Error('Category name must be 100 characters or less')
    }
  }
  
  // Build update object with only the fields that are provided and valid
  const updateData: Partial<CategoryUpdate> = {}
  
  if (updates.name !== undefined && updates.name !== null) {
    updateData.name = updates.name.trim()
  }
  
  if (updates.description !== undefined) {
    updateData.description = updates.description?.trim() || null
  }
  
  // Don't include id, created_at, or updated_at in the update
  // The database will handle updated_at automatically if there's a trigger
  // If no trigger exists, we can manually set it, but let's try without first
  
  const { data, error } = await supabase
    .from('categories')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating category:', error)
    // Provide a more descriptive error message
    const errorMessage = error.message || error.details || 'Failed to update category'
    throw new Error(errorMessage)
  }

  if (!data) {
    throw new Error('Category not found or update failed')
  }

  return data
}

/**
 * Delete a category
 */
export async function deleteCategory(id: number): Promise<void> {
  const supabase = createBrowserClient()
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting category:', error)
    throw error
  }
}
