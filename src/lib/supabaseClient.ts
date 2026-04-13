import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database.types'

/**
 * Client pour les composants côté navigateur (Pages de Login, Interactions utilisateur).
 * Ce fichier ne dépend pas de next/headers et ne causera pas d'erreur de build.
 */
export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
