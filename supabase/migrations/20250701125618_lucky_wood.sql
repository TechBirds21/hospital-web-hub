/*
  # Create Default Auth Users Migration

  This migration provides SQL scripts to create default users in auth schema.
  Since we don't have direct access to create auth users through SQL in Supabase,
  this file serves primarily as documentation.

  ## Auth Users to Create Manually
  
  Please create these users manually in your Supabase dashboard:
  
  1. admin@demo.com / demo123
  2. doctor@demo.com / demo123  
  3. reception@demo.com / demo123
  4. patient@demo.com / demo123

  After creating these users in the Supabase Auth dashboard, they will
  automatically be linked to their corresponding user profiles in the public schema.
*/

-- First, ensure we have the demo clinics
INSERT INTO public.clinics (id, name, specialty, city, address, phone, email, status) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Apollo Demo Hospital', 'hospital', 'Hyderabad', 'Jubilee Hills', '+91-9876543210', 'demo@hospital.com', 'active'),
  ('550e8400-e29b-41d4-a716-446655440002', 'SmileCare Dental', 'dental', 'Hyderabad', 'Banjara Hills', '+91-9876543211', 'demo@dental.com', 'active'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Glow Aesthetics', 'aesthetic', 'Hyderabad', 'Hitech City', '+91-9876543212', 'demo@aesthetics.com', 'active')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  specialty = EXCLUDED.specialty,
  status = EXCLUDED.status;

-- Create placeholder profile records that will link to auth users
INSERT INTO public.users (email, role, clinic_id, is_active)
VALUES 
  ('admin@demo.com', 'admin', '550e8400-e29b-41d4-a716-446655440001', true),
  ('doctor@demo.com', 'doctor', '550e8400-e29b-41d4-a716-446655440001', true),
  ('reception@demo.com', 'receptionist', '550e8400-e29b-41d4-a716-446655440001', true),
  ('patient@demo.com', 'patient', '550e8400-e29b-41d4-a716-446655440001', true)
ON CONFLICT (email) DO UPDATE SET
  role = EXCLUDED.role,
  clinic_id = EXCLUDED.clinic_id,
  is_active = EXCLUDED.is_active;

-- Create doctor record for the demo doctor user
INSERT INTO public.doctors (name, speciality, clinic_id, consultation_fee, experience_years, bio)
VALUES 
  ('Dr. Demo Doctor', 'General Medicine', '550e8400-e29b-41d4-a716-446655440001', 1000, 8, 'Demo doctor profile for testing purposes')
ON CONFLICT DO NOTHING;

-- Create patient record for the demo patient user
INSERT INTO public.patients (first_name, last_name, phone, gender, address)
VALUES 
  ('Demo', 'Patient', '+91-9876543213', 'male', 'Hyderabad, Telangana')
ON CONFLICT DO NOTHING;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'DEMO USERS SETUP GUIDE';
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'Please create these users manually in Supabase:';
  RAISE NOTICE '';
  RAISE NOTICE '- Admin: admin@demo.com / demo123';
  RAISE NOTICE '- Doctor: doctor@demo.com / demo123';
  RAISE NOTICE '- Reception: reception@demo.com / demo123';
  RAISE NOTICE '- Patient: patient@demo.com / demo123';
  RAISE NOTICE '';
  RAISE NOTICE 'The system will automatically link these users';
  RAISE NOTICE 'to their profiles when they are created.';
  RAISE NOTICE '==============================================';
END $$;