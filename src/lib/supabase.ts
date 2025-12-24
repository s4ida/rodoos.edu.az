// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Supabase URL və KEY-ləri mühit dəyişənlərindən alırıq
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

// Supabase client yaradırıq
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tip interfeyslər
export interface News {
  id: number
  title: string
  description: string
  content: string
  images: string[] | null
  tag: string
  important: boolean
  author?: string
  date: string
  created_at?: string
}

export interface Exam {
  id: number
  title: string
  description: string
  date: string
  created_at?: string
}
