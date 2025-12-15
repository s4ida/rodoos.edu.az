import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase environment variables are missing')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// DÜZGÜN EXAM INTERFACE
export interface Exam {
  id?: number
  title: string
  description: string
  date: string
  time?: string          // Bu əlavə edildi
  subject?: string       // Bu əlavə edildi  
  status?: 'active' | 'inactive' // Bu əlavə edildi
  participants?: number  // Bu əlavə edildi
  created_at?: string
}

// NEWS INTERFACE (dəyişiklik yoxdur)
export interface News {
  id?: number
  title: string
  description: string
  content: string
  images?: string[]
  tag: string
  important: boolean
  author?: string
  date: string
  created_at?: string
}