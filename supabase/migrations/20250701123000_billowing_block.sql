/*
  # Demo Users Setup

  This migration sets up demo user profiles and data for testing.
  
  Note: Auth users need to be created manually in Supabase Dashboard
  or through the application signup process.
*/

-- First, ensure we have demo clinics
INSERT INTO public.clinics (id, name, specialty, city, address, phone, email, contact_person, status) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Apollo Demo Hospital', 'hospital', 'Hyderabad', 'Jubilee Hills, Hyderabad', '+91 40 1234 5678', 'contact@apollodemo.com', 'Dr. Admin', 'active'),
  ('550e8400-e29b-41d4-a716-446655440002', 'SmileCare Dental Clinic', 'dental', 'Hyderabad', 'Banjara Hills, Hyderabad', '+91 40 2345 6789', 'contact@smilecare.com', 'Dr. Dental Admin', 'active'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Glow Aesthetic Clinic', 'aesthetic', 'Hyderabad', 'Kondapur, Hyderabad', '+91 40 3456 7890', 'contact@glowaesthetic.com', 'Dr. Aesthetic Admin', 'active')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  specialty = EXCLUDED.specialty,
  city = EXCLUDED.city,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  contact_person = EXCLUDED.contact_person,
  status = EXCLUDED.status;

-- Create demo doctors
INSERT INTO public.doctors (id, clinic_id, name, speciality, consultation_fee, experience_years, bio) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Dr. Rajesh Kumar', 'Cardiology', 1500, 10, 'Experienced cardiologist specializing in preventive care'),
  ('880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Dr. Priya Sharma', 'Dentistry', 800, 8, 'General dentist with expertise in cosmetic procedures'),
  ('880e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Dr. Arjun Reddy', 'Dermatology', 1200, 6, 'Dermatologist specializing in aesthetic treatments')
ON CONFLICT (id) DO UPDATE SET
  clinic_id = EXCLUDED.clinic_id,
  name = EXCLUDED.name,
  speciality = EXCLUDED.speciality,
  consultation_fee = EXCLUDED.consultation_fee,
  experience_years = EXCLUDED.experience_years,
  bio = EXCLUDED.bio;

-- Create demo patients
INSERT INTO public.patients (id, first_name, last_name, phone, date_of_birth, gender, address) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', 'Suresh', 'Patel', '+91 98765 43210', '1985-06-15', 'male', 'Hyderabad, Telangana'),
  ('990e8400-e29b-41d4-a716-446655440002', 'Kavya', 'Reddy', '+91 87654 32109', '1992-03-22', 'female', 'Hyderabad, Telangana'),
  ('990e8400-e29b-41d4-a716-446655440003', 'Arjun', 'Sharma', '+91 76543 21098', '1988-11-08', 'male', 'Hyderabad, Telangana')
ON CONFLICT (id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  phone = EXCLUDED.phone,
  date_of_birth = EXCLUDED.date_of_birth,
  gender = EXCLUDED.gender,
  address = EXCLUDED.address;

-- Create demo appointments
INSERT INTO public.appointments (patient_id, doctor_id, clinic_id, appointment_date, appointment_time, status, chief_complaint, token_number) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', CURRENT_DATE + INTERVAL '1 day', '10:00', 'scheduled', 'Chest pain consultation', 1),
  ('990e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', CURRENT_DATE + INTERVAL '1 day', '11:30', 'confirmed', 'Dental cleaning', 2),
  ('990e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', CURRENT_DATE + INTERVAL '1 day', '14:00', 'scheduled', 'Skin consultation', 3)
ON CONFLICT DO NOTHING;

-- Create some pharmacy items
INSERT INTO public.pharmacy_items (clinic_id, name, generic_name, quantity_available, reorder_level, unit_price, supplier) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Paracetamol 500mg', 'Paracetamol', 50, 20, 5.50, 'MedSupply Co.'),
  ('550e8400-e29b-41d4-a716-446655440001', 'Amoxicillin 250mg', 'Amoxicillin', 8, 15, 18.75, 'PharmaCorp'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Local Anesthetic', 'Lidocaine', 12, 10, 120.00, 'Dental Supply Ltd.'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Retinol Cream', 'Tretinoin', 25, 15, 850.00, 'Skin Care Products')
ON CONFLICT DO NOTHING;

-- Create some lab tests
INSERT INTO public.lab_tests (patient_id, doctor_id, clinic_id, test_name, status) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Complete Blood Count', 'processing'),
  ('990e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'X-Ray Dental', 'completed'),
  ('990e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Skin Biopsy', 'ordered')
ON CONFLICT DO NOTHING;

-- Create some financial transactions
INSERT INTO public.accounts_tx (clinic_id, transaction_type, amount, category, description, payment_method) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'income', 1500.00, 'consultation', 'Cardiology consultation', 'card'),
  ('550e8400-e29b-41d4-a716-446655440002', 'income', 800.00, 'dental', 'Dental cleaning', 'cash'),
  ('550e8400-e29b-41d4-a716-446655440003', 'income', 1200.00, 'aesthetic', 'Skin consultation', 'upi'),
  ('550e8400-e29b-41d4-a716-446655440001', 'expense', 25000.00, 'equipment', 'Medical equipment purchase', 'bank_transfer')
ON CONFLICT DO NOTHING;

-- Update the trigger function to handle demo users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.users (auth_user_id, email, role, clinic_id, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    CASE 
      WHEN NEW.email LIKE '%admin%' THEN 'admin'
      WHEN NEW.email LIKE '%doctor%' THEN 'doctor'
      WHEN NEW.email LIKE '%reception%' THEN 'receptionist'
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
  )
  ON CONFLICT (auth_user_id) DO UPDATE SET
    email = EXCLUDED.email,
    role = EXCLUDED.role,
    clinic_id = EXCLUDED.clinic_id,
    updated_at = now();
  
  RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();