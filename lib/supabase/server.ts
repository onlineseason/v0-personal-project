import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
}

// Service role client for admin operations
export function getServiceClient() {
  if (!supabaseServiceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Client with session for authenticated requests
export async function getSessionClient() {
  const cookieStore = await cookies()
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const client = createClient(supabaseUrl, supabaseAnonKey)

  // Reconstruct session from cookies if available
  const authCookie = cookieStore.get('sb-auth-token')
  if (authCookie) {
    try {
      const session = JSON.parse(authCookie.value)
      await client.auth.setSession(session)
    } catch (e) {
      // Ignore if cookie parsing fails
    }
  }

  return client
}

// Get current user session (server-side)
export async function getSession() {
  const client = await getSessionClient()
  const {
    data: { session },
  } = await client.auth.getSession()
  return session
}

// Get current user (server-side)
export async function getUser() {
  const session = await getSession()
  return session?.user || null
}
