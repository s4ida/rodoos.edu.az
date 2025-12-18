import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

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
