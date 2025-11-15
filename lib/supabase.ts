import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient as createBrowserClientSSR } from '@supabase/ssr'
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

// Cookie-based storage for browser client to work with middleware
class CookieStorage {
  getItem(key: string): string | null {
    if (typeof document === 'undefined') return null
    const name = key + '='
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return null
  }

  setItem(key: string, value: string): void {
    if (typeof document === 'undefined') return
    // Set cookie with proper attributes for auth tokens
    document.cookie = `${key}=${value}; path=/; max-age=31536000; SameSite=Lax`
  }

  removeItem(key: string): void {
    if (typeof document === 'undefined') return
    document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
  }
}

// Client-side Supabase client (for use in client components)
// Uses cookie-based storage so middleware can read the session
export const createBrowserClient = (): SupabaseClient<Database> => {
  const url = getSupabaseUrl()
  const key = getSupabaseAnonKey()
  
  if (!url || !key) {
    console.error('Supabase environment variables are not set')
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and NEXT_PUBLIC_SUPABASE_ANON_KEY')
    // Return a client with empty strings to prevent crashes, but it won't work
    // This allows the app to load, but operations will fail with clear error messages
    return createClient<Database>('', '')
  }
  
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    // Server-side fallback
    return createClient<Database>(url, key, {
      auth: {
        persistSession: false,
      },
    })
  }
  
  // Use createClient with cookie-based storage so middleware can read it
  // This ensures proper Database type inference while using cookies
  return createClient<Database>(url, key, {
    auth: {
      storage: new CookieStorage(),
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })
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

