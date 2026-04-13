export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          role: 'admin' | 'doctor' | 'patient' | 'pharmacy' | 'clinic'
          avatar_url: string | null
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          role?: 'admin' | 'doctor' | 'patient' | 'pharmacy' | 'clinic'
          avatar_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          role?: 'admin' | 'doctor' | 'patient' | 'pharmacy' | 'clinic'
          avatar_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedSchema: "auth"
          }
        ]
      }
    }
    Views: {
      [_ in string]: never
    }
    Functions: {
      [_ in string]: never
    }
    Enums: {
      user_role: 'admin' | 'doctor' | 'patient' | 'pharmacy' | 'clinic'
    }
    CompositeTypes: {
      [_ in string]: never
    }
  }
}
