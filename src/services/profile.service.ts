import { createClient } from "@/lib/supabaseClient";
import { Database } from "@/types/database.types";

const supabase = createClient();

export interface Profile {
  id: string;
  role: 'admin' | 'doctor' | 'pharmacy' | 'clinic' | 'patient';
  full_name: string | null;
  establishment_name: string | null;
}

export const profileService = {
  /**
   * Fetch a user profile by ID
   */
  getProfile: async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
       console.error("Error fetching profile:", error);
       return null;
    }
    return data as Profile;
  },

  /**
   * Update a user profile
   */
  updateProfile: async (userId: string, updates: any) => {
    const { data, error } = await (supabase.from("profiles") as any)
      .update(updates)
      .eq("id", userId);

    if (error) throw error;
    return data;
  }
};
