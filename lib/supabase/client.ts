import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

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
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data as Project[]
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) throw error
  return data as Project
}

export async function getPublishedPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) throw error
  return data as Post[]
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) throw error
  return data as Post
}

export async function submitMessage(message: Omit<Message, 'id' | 'read' | 'created_at'>) {
  const { data, error } = await supabase
    .from('messages')
    .insert([message])
    .select()
    .single()

  if (error) throw error
  return data as Message
}
