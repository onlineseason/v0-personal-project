import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Lazy initialize - only throw when actually used, not at module load time
let supabaseClient: ReturnType<typeof createClient> | null = null

function getSupabaseClient() {
  if (supabaseClient) return supabaseClient

  if (!supabaseUrl || !supabaseKey) {
    const missing = []
    if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL')
    if (!supabaseKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')
    const errorMsg = `Missing Supabase environment variables: ${missing.join(', ')}`
    console.error('[Supabase]', errorMsg)
    throw new Error(errorMsg)
  }

  supabaseClient = createClient(supabaseUrl, supabaseKey)
  return supabaseClient
}

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get: (target, prop) => {
    const client = getSupabaseClient()
    return (client as any)[prop]
  },
})

// Types for the database schema
export interface Project {
  id: string
  slug: string
  title: string
  description?: string
  problem?: string
  approach?: string
  outcome?: string
  image_url?: string
  link?: string
  tags: string[]
  published: boolean
  sort_order: number
  created_at: string
}

export interface Post {
  id: string
  slug: string
  title: string
  excerpt?: string
  content: string
  cover_image?: string
  tags: string[]
  published: boolean
  published_at: string
  created_at: string
}

export interface Message {
  id: string
  name: string
  email: string
  subject?: string
  body: string
  read: boolean
  created_at: string
}

// Database helper functions
export async function getPublishedProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('[Supabase] Error fetching projects:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      })
      throw error
    }
    return data as Project[]
  } catch (err) {
    console.error('[Supabase] Failed to fetch projects:', err)
    throw err
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()

    if (error) {
      console.error('[Supabase] Error fetching project by slug:', {
        slug,
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      })
      throw error
    }

    if (!data) {
      console.warn('[Supabase] Project not found for slug:', slug)
      return null
    }

    return data as Project
  } catch (err) {
    console.error('[Supabase] Failed to fetch project by slug:', slug, err)
    throw err
  }
}

export async function getPublishedPosts() {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (error) {
      console.error('[Supabase] Error fetching posts:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      })
      throw error
    }
    return data as Post[]
  } catch (err) {
    console.error('[Supabase] Failed to fetch posts:', err)
    throw err
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()

    if (error) {
      console.error('[Supabase] Error fetching post by slug:', {
        slug,
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      })
      throw error
    }

    if (!data) {
      console.warn('[Supabase] Post not found for slug:', slug)
      return null
    }

    return data as Post
  } catch (err) {
    console.error('[Supabase] Failed to fetch post by slug:', slug, err)
    throw err
  }
}

export async function submitMessage(message: Omit<Message, 'id' | 'read' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .maybeSingle()

    if (error) {
      console.error('[Supabase] Error submitting message:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      })
      throw error
    }

    if (!data) {
      console.warn('[Supabase] Message insert returned no data')
      return null
    }

    return data as Message
  } catch (err) {
    console.error('[Supabase] Failed to submit message:', err)
    throw err
  }
}
