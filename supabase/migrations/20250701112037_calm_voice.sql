/*
  # Healthcare Management System Schema

  1. New Tables
    - `users` - User profiles with roles and clinic associations
    - `clinics` - Healthcare facilities (hospital, dental, aesthetic)
    - `doctors` - Medical practitioners
    - `patients` - Patient information
    - `appointments` - Appointment scheduling
    - `pharmacy_items` - Medication inventory
    - `lab_tests` - Laboratory tests
    - `hr_staff` - Staff management
    - `accounts_tx` - Financial transactions

  2. Security
    - Enable RLS on all tables
    - Add policies for clinic-based access control
    - Create trigger for automatic user profile creation
*/

-- Create users table (matches backend expectation)
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_tech', 'patient', 'hr_manager')),
  email text UNIQUE NOT NULL,
  phone text,
  aadhaar text,
  clinic_id uuid,
  hospital_id uuid,
  pic_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create clinics table
CREATE TABLE IF NOT EXISTS public.clinics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialty text NOT NULL CHECK (specialty IN ('hospital', 'dental', 'aesthetic', 'general')),
  city text NOT NULL,
  address text,
  phone text,
  email text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  contact_person text,
  license_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS public.doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid REFERENCES public.clinics(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  speciality text NOT NULL,
  qualification text,
  experience_years integer DEFAULT 0,
  consultation_fee numeric DEFAULT 0,
  bio text,
  pic_url text,
  slot_duration_minutes integer DEFAULT 30,
  available_days text[] DEFAULT ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  start_time time DEFAULT '09:00',
  end_time time DEFAULT '17:00',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create patients table
CREATE TABLE IF NOT EXISTS public.patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  aadhaar text,
  phone text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  date_of_birth date,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  address text,
  emergency_contact_name text,
  emergency_contact_phone text,
  blood_group text,
  allergies text[],
  medical_history text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES public.doctors(id) ON DELETE CASCADE,
  clinic_id uuid REFERENCES public.clinics(id) ON DELETE CASCADE,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  duration_minutes integer DEFAULT 30,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
  consultation_fee numeric DEFAULT 0,
  chief_complaint text,
  diagnosis text,
  treatment_plan text,
  prescriptions jsonb,
  notes text,
  token_number integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create pharmacy_items table
CREATE TABLE IF NOT EXISTS public.pharmacy_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid REFERENCES public.clinics(id) ON DELETE CASCADE,
  name text NOT NULL,
  generic_name text,
  batch_number text,
  quantity_available integer DEFAULT 0,
  reorder_level integer DEFAULT 10,
  unit_price numeric DEFAULT 0,
  expiry_date date,
  supplier text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create lab_tests table
CREATE TABLE IF NOT EXISTS public.lab_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES public.doctors(id) ON DELETE CASCADE,
  clinic_id uuid REFERENCES public.clinics(id) ON DELETE CASCADE,
  test_name text NOT NULL,
  status text DEFAULT 'ordered' CHECK (status IN ('ordered', 'collected', 'processing', 'completed', 'cancelled')),
  ordered_at timestamptz DEFAULT now(),
  collected_at timestamptz,
  completed_at timestamptz,
  results jsonb,
  critical_values boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create hr_staff table
CREATE TABLE IF NOT EXISTS public.hr_staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid REFERENCES public.clinics(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  employee_id text UNIQUE NOT NULL,
  position text NOT NULL,
  department text NOT NULL,
  salary numeric,
  join_date date DEFAULT CURRENT_DATE,
  shift_type text CHECK (shift_type IN ('morning', 'evening', 'night', 'off')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create accounts_tx table for financial transactions
CREATE TABLE IF NOT EXISTS public.accounts_tx (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid REFERENCES public.clinics(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('income', 'expense', 'refund')),
  amount numeric NOT NULL,
  category text NOT NULL,
  description text,
  payment_method text CHECK (payment_method IN ('cash', 'card', 'upi', 'bank_transfer')),
  transaction_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacy_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts_tx ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users
CREATE POLICY "Users can read own data"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = auth_user_id);

-- Create RLS policies for clinic-based access
CREATE POLICY "Clinic members can read clinic data"
  ON public.clinics
  FOR SELECT
  TO authenticated
  USING (id IN (
    SELECT clinic_id FROM public.users WHERE auth_user_id = auth.uid()
    UNION
    SELECT hospital_id FROM public.users WHERE auth_user_id = auth.uid()
  ));

-- Similar policies for other tables
CREATE POLICY "Clinic members can read doctors"
  ON public.doctors
  FOR SELECT
  TO authenticated
  USING (clinic_id IN (
    SELECT clinic_id FROM public.users WHERE auth_user_id = auth.uid()
    UNION
    SELECT hospital_id FROM public.users WHERE auth_user_id = auth.uid()
  ));

CREATE POLICY "Clinic members can read patients"
  ON public.patients
  FOR SELECT
  TO authenticated
  USING (true); -- Patients can be seen by all authenticated users in the system

CREATE POLICY "Clinic members can read appointments"
  ON public.appointments
  FOR SELECT
  TO authenticated
  USING (clinic_id IN (
    SELECT clinic_id FROM public.users WHERE auth_user_id = auth.uid()
    UNION
    SELECT hospital_id FROM public.users WHERE auth_user_id = auth.uid()
  ));

-- Policies for other tables
CREATE POLICY "Clinic members can access pharmacy"
  ON public.pharmacy_items
  FOR ALL
  TO authenticated
  USING (clinic_id IN (
    SELECT clinic_id FROM public.users WHERE auth_user_id = auth.uid()
    UNION
    SELECT hospital_id FROM public.users WHERE auth_user_id = auth.uid()
  ));

CREATE POLICY "Clinic members can access lab tests"
  ON public.lab_tests
  FOR ALL
  TO authenticated
  USING (clinic_id IN (
    SELECT clinic_id FROM public.users WHERE auth_user_id = auth.uid()
    UNION
    SELECT hospital_id FROM public.users WHERE auth_user_id = auth.uid()
  ));

CREATE POLICY "Clinic members can access hr staff"
  ON public.hr_staff
  FOR ALL
  TO authenticated
  USING (clinic_id IN (
    SELECT clinic_id FROM public.users WHERE auth_user_id = auth.uid()
    UNION
    SELECT hospital_id FROM public.users WHERE auth_user_id = auth.uid()
  ));

CREATE POLICY "Clinic members can access transactions"
  ON public.accounts_tx
  FOR ALL
  TO authenticated
  USING (clinic_id IN (
    SELECT clinic_id FROM public.users WHERE auth_user_id = auth.uid()
    UNION
    SELECT hospital_id FROM public.users WHERE auth_user_id = auth.uid()
  ));

-- Create demo clinics first (no foreign key dependencies)
INSERT INTO public.clinics (id, name, specialty, city, address, phone, email, contact_person) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Apollo Demo Hospital', 'hospital', 'Hyderabad', 'Jubilee Hills, Hyderabad', '+91 40 1234 5678', 'contact@apollodemo.com', 'Dr. Admin'),
  ('550e8400-e29b-41d4-a716-446655440002', 'SmileCare Dental Clinic', 'dental', 'Hyderabad', 'Banjara Hills, Hyderabad', '+91 40 2345 6789', 'contact@smilecare.com', 'Dr. Dental Admin'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Glow Aesthetic Clinic', 'aesthetic', 'Hyderabad', 'Kondapur, Hyderabad', '+91 40 3456 7890', 'contact@glowaesthetic.com', 'Dr. Aesthetic Admin')
ON CONFLICT (id) DO NOTHING;

-- Create trigger function for automatic user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.users (auth_user_id, email, role, clinic_id, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    CASE 
      WHEN NEW.email LIKE '%doctor%' THEN 'doctor'
      WHEN NEW.email LIKE '%reception%' THEN 'receptionist'
      WHEN NEW.email LIKE '%admin%' THEN 'admin'
      WHEN NEW.email LIKE '%patient%' THEN 'patient'
      WHEN NEW.email LIKE '%nurse%' THEN 'nurse'
      WHEN NEW.email LIKE '%pharmacy%' THEN 'pharmacist'
      WHEN NEW.email LIKE '%lab%' THEN 'lab_tech'
      WHEN NEW.email LIKE '%hr%' THEN 'hr_manager'
      ELSE 'patient'
    END,
    CASE 
      WHEN NEW.email LIKE '%dental%' THEN '550e8400-e29b-41d4-a716-446655440002'
      WHEN NEW.email LIKE '%aesthetic%' THEN '550e8400-e29b-41d4-a716-446655440003'
      ELSE '550e8400-e29b-41d4-a716-446655440001'
    END,
    true
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signups
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create demo doctors (without user_id references for now)
INSERT INTO public.doctors (id, clinic_id, name, speciality, consultation_fee, experience_years) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Dr. Rajesh Kumar', 'Cardiology', 1500, 10),
  ('880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Dr. Priya Sharma', 'Dentistry', 800, 8),
  ('880e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Dr. Arjun Reddy', 'Dermatology', 1200, 6)
ON CONFLICT (id) DO NOTHING;

-- Create demo patients (without user_id references for now)
INSERT INTO public.patients (id, first_name, last_name, phone, date_of_birth, gender) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', 'Suresh', 'Patel', '+91 98765 43210', '1985-06-15', 'male'),
  ('990e8400-e29b-41d4-a716-446655440002', 'Kavya', 'Reddy', '+91 87654 32109', '1992-03-22', 'female'),
  ('990e8400-e29b-41d4-a716-446655440003', 'Arjun', 'Sharma', '+91 76543 21098', '1988-11-08', 'male')
ON CONFLICT (id) DO NOTHING;

-- Create demo appointments
INSERT INTO public.appointments (patient_id, doctor_id, clinic_id, appointment_date, appointment_time, status, chief_complaint, token_number) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', CURRENT_DATE, '10:00', 'scheduled', 'Chest pain', 1),
  ('990e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', CURRENT_DATE, '11:30', 'confirmed', 'Dental cleaning', 2),
  ('990e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', CURRENT_DATE, '14:00', 'scheduled', 'Skin consultation', 3);

-- Create demo pharmacy items
INSERT INTO public.pharmacy_items (clinic_id, name, generic_name, quantity_available, reorder_level, unit_price, supplier) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Paracetamol 500mg', 'Paracetamol', 50, 20, 5.50, 'MedSupply Co.'),
  ('550e8400-e29b-41d4-a716-446655440001', 'Amoxicillin 250mg', 'Amoxicillin', 8, 15, 18.75, 'PharmaCorp'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Local Anesthetic', 'Lidocaine', 12, 10, 120.00, 'Dental Supply Ltd.'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Retinol Cream', 'Tretinoin', 25, 15, 850.00, 'Skin Care Products');

-- Create demo lab tests
INSERT INTO public.lab_tests (patient_id, doctor_id, clinic_id, test_name, status) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Complete Blood Count', 'processing'),
  ('990e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'X-Ray Dental', 'completed'),
  ('990e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Skin Biopsy', 'ordered');

-- Create demo financial transactions
INSERT INTO public.accounts_tx (clinic_id, transaction_type, amount, category, description, payment_method) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'income', 1500.00, 'consultation', 'Cardiology consultation', 'card'),
  ('550e8400-e29b-41d4-a716-446655440002', 'income', 800.00, 'dental', 'Dental cleaning', 'cash'),
  ('550e8400-e29b-41d4-a716-446655440003', 'income', 1200.00, 'aesthetic', 'Skin consultation', 'upi'),
  ('550e8400-e29b-41d4-a716-446655440001', 'expense', 25000.00, 'equipment', 'Medical equipment purchase', 'bank_transfer');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON public.appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_clinic ON public.appointments(clinic_id);
CREATE INDEX IF NOT EXISTS idx_users_clinic ON public.users(clinic_id);
CREATE INDEX IF NOT EXISTS idx_users_auth ON public.users(auth_user_id);

-- Success message
DO $$
BEGIN
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'Healthcare Management System Schema Created!';
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'Demo data includes:';
  RAISE NOTICE '- 3 Clinics (Hospital, Dental, Aesthetic)';
  RAISE NOTICE '- 3 Doctors with different specialties';
  RAISE NOTICE '- 3 Patients with appointments';
  RAISE NOTICE '- Sample pharmacy inventory';
  RAISE NOTICE '- Lab tests and financial transactions';
  RAISE NOTICE '';
  RAISE NOTICE 'User profiles will be created automatically';
  RAISE NOTICE 'when users sign up through authentication.';
  RAISE NOTICE '';
  RAISE NOTICE 'Role assignment based on email patterns:';
  RAISE NOTICE '- *doctor* → doctor role';
  RAISE NOTICE '- *reception* → receptionist role';
  RAISE NOTICE '- *admin* → admin role';
  RAISE NOTICE '- *dental* → assigned to dental clinic';
  RAISE NOTICE '- *aesthetic* → assigned to aesthetic clinic';
  RAISE NOTICE '- others → patient role, hospital clinic';
  RAISE NOTICE '==============================================';
END $$;