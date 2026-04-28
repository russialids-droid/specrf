import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Specialist {
  id: string
  name: string
  category_slug: string
  city_slug: string
  description: string
  experience_years: number
  price_from: number
  price_to: number
  phone?: string
  email?: string
  photo_url?: string
  rating: number
  reviews_count: number
  is_featured: boolean
  is_verified: boolean
  created_at: string
}

export interface Lead {
  id?: string
  name: string
  phone: string
  category_slug: string
  city_slug: string
  message?: string
  created_at?: string
}

// Получить специалистов по категории и городу
export async function getSpecialists(
  categorySlug: string,
  citySlug: string,
  limit = 20
): Promise<Specialist[]> {
  const { data, error } = await supabase
    .from('specialists')
    .select('*')
    .eq('category_slug', categorySlug)
    .eq('city_slug', citySlug)
    .order('is_featured', { ascending: false })
    .order('rating', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Supabase error:', error)
    return []
  }
  return data || []
}

// Создать лид
export async function createLead(lead: Lead): Promise<boolean> {
  const { error } = await supabase.from('leads').insert(lead)
  if (error) {
    console.error('Lead error:', error)
    return false
  }
  return true
}

// Получить количество специалистов в городе
export async function getCityStats(citySlug: string): Promise<number> {
  const { count, error } = await supabase
    .from('specialists')
    .select('*', { count: 'exact', head: true })
    .eq('city_slug', citySlug)

  if (error) return 0
  return count || 0
}
