import { createClient } from "@/lib/supabaseClient";
import { Database } from "@/types/database.types";

const supabase = createClient();

export const profileService = {
  /**
   * Fetch a user profile by ID
   */
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update a user profile
   */
  updateProfile: async (userId: string, updates: Database['public']['Tables']['profiles']['Update']) => {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId);

    if (error) throw error;
    return data;
  }
};
