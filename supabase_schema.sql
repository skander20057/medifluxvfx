-- 1. Create the Custom User Role Enum
CREATE TYPE user_role AS ENUM ('admin', 'doctor', 'patient', 'pharmacy', 'clinic');

-- 2. Create the Profiles Table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    role user_role DEFAULT 'patient' NOT NULL,
    avatar_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Admins can view everything
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- 5. Create a Function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, role)
    VALUES (
        new.id, 
        new.raw_user_meta_data->>'full_name', 
        new.raw_user_meta_data->>'avatar_url',
        COALESCE((new.raw_user_meta_data->>'role')::user_role, 'patient'::user_role)
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create a Trigger to call the function on every auth.user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Create Prescriptions Table
CREATE TABLE public.prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID REFERENCES public.profiles(id) NOT NULL,
    patient_name TEXT NOT NULL,
    patient_email TEXT,
    medications JSONB NOT NULL, -- Format: [{name: "Doliprane", dose: "1000mg", timing: "3x/day"}]
    notes TEXT,
    status TEXT DEFAULT 'pending' NOT NULL, -- pending, ready, picked_up
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Enable RLS for Prescriptions
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;

-- 9. Prescriptions Policies
-- Doctors can see and create their own prescriptions
CREATE POLICY "Doctors manage own prescriptions" 
ON public.prescriptions 
FOR ALL 
USING (auth.uid() = doctor_id);

-- Pharmacies can see all 'pending' or 'ready' prescriptions to fulfill them
CREATE POLICY "Pharmacies view all pending prescriptions" 
ON public.prescriptions 
FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'pharmacy'
    )
);

-- Patients can see prescriptions where their email matches (simple logic)
CREATE POLICY "Patients view their own prescriptions" 
ON public.prescriptions 
FOR SELECT 
USING (
    patient_email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);
