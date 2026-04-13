import { createClient } from "@supabase/supabase-js";

// Note: This service MUST only be used on the server side
// It uses the SERVICE_ROLE_KEY to bypass RLS and Auth restrictions
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const adminAuthService = {
  /**
   * Create a professional account (Doctor, Pharmacy, Clinic)
   */
  createProfessionalAccount: async (data: {
    email: string;
    password: string;
    full_name: string;
    role: 'doctor' | 'pharmacy' | 'clinic';
  }) => {
    // 1. Create the user in Auth
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: {
        full_name: data.full_name,
        role: data.role
      }
    });

    if (authError) throw authError;

    // 2. Profile is automatically created by the SQL Trigger we set up earlier!
    
    return authUser.user;
  },

  /**
   * List all professionals
   */
  listProfessionals: async () => {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .neq('role', 'patient');
    
    if (error) throw error;
    return data;
  }
};
