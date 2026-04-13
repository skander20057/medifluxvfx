import { createClient } from "@/lib/supabaseClient";

const supabase = createClient();

export interface Prescription {
  id?: string;
  doctor_id: string;
  patient_name: string;
  patient_email?: string;
  medications: Array<{
    name: string;
    dose: string;
    timing: string;
  }>;
  notes?: string;
  status: 'pending' | 'ready' | 'picked_up';
  created_at?: string;
}

export const prescriptionService = {
  /**
   * Create a new prescription
   */
  createPrescription: async (prescription: Partial<Prescription>) => {
    const { data, error } = await supabase
      .from("prescriptions")
      .insert(prescription)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get prescriptions for a specific doctor
   */
  getDoctorPrescriptions: async (doctorId: string) => {
    const { data, error } = await supabase
      .from("prescriptions")
      .select("*")
      .eq("doctor_id", doctorId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Subscribe to real-time changes for a specific user (for pharmacy or doctor)
   */
  subscribeToPrescriptions: (callback: (payload: any) => void) => {
    return supabase
      .channel('public:prescriptions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'prescriptions' }, callback)
      .subscribe();
  }
};
