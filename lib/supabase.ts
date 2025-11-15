import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

// Helper to get Supabase URL
function getSupabaseUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
}

// Helper to get Supabase Anon Key
function getSupabaseAnonKey(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
}

// Helper to get Service Role Key
function getSupabaseServiceRoleKey(): string {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || ''
}

// Helper to get Storage URL
function getSupabaseStorageUrl(): string {
  return process.env.SUPABASE_STORAGE_URL || getSupabaseUrl()
}

// Client-side Supabase client (for use in client components)
export const createBrowserClient = () => {
  const url = getSupabaseUrl()
  const key = getSupabaseAnonKey()
  
  if (!url || !key) {
    console.error('Supabase environment variables are not set')
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and NEXT_PUBLIC_SUPABASE_ANON_KEY')
    // Return a client with empty strings to prevent crashes, but it won't work
    // This allows the app to load, but operations will fail with clear error messages
    return createClient<Database>('', '')
  }
  
  return createClient<Database>(url, key)
}

// Create Supabase client for server-side usage (lazy initialization)
let _supabase: ReturnType<typeof createClient<Database>> | null = null

export const supabase = (() => {
  if (!_supabase) {
    const url = getSupabaseUrl()
    const key = getSupabaseAnonKey()
    
    if (!url || !key) {
      console.warn('Supabase URL and Anon Key must be set as environment variables')
      console.warn('Required: NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and NEXT_PUBLIC_SUPABASE_ANON_KEY')
      // Create a client with empty strings to prevent crashes
      _supabase = createClient<Database>('', '')
    } else {
      _supabase = createClient<Database>(url, key, {
        auth: {
          persistSession: false, // For server-side usage
        },
      })
    }
  }
  return _supabase
})()

// Service role client for admin operations (server-side only)
export const createServiceRoleClient = () => {
  const url = getSupabaseUrl()
  const key = getSupabaseServiceRoleKey()
  
  if (!url || !key) {
    throw new Error('Service role key is required for admin operations. Set SUPABASE_SERVICE_ROLE_KEY in your environment variables.')
  }
  
  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Export storage URL helper
export const getStorageUrl = () => getSupabaseStorageUrl()

