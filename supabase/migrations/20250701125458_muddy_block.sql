/*
  # Manual Demo User Creation Guide

  This migration serves as a guide for manually creating demo users in Supabase.
  Direct insertion into auth.users requires superuser privileges which aren't available
  in the standard Supabase setup.

  ## Instructions for Creating Demo Users

  1. Go to the Supabase Dashboard
  2. Navigate to Authentication > Users
  3. Click "Add User" and create the following users:

  - Email: admin@demo.com
    Password: demo123
    Email Confirmed: Yes
  
  - Email: doctor@demo.com
    Password: demo123
    Email Confirmed: Yes
  
  - Email: reception@demo.com
    Password: demo123
    Email Confirmed: Yes
  
  - Email: patient@demo.com
    Password: demo123
    Email Confirmed: Yes

  ## Important: The trigger in the database will automatically:
  - Create corresponding user profiles
  - Assign appropriate roles based on email patterns
  - Link users to the correct clinics
*/

-- This migration doesn't create auth users directly.
-- It ensures the trigger is properly set up to handle the demo users.

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

-- Create placeholder profile records for demo users
-- These will be linked to auth users when they're created in the dashboard
INSERT INTO public.users (email, role, clinic_id, is_active)
SELECT 
  email, 
  CASE 
    WHEN email = 'admin@demo.com' THEN 'admin'
    WHEN email = 'doctor@demo.com' THEN 'doctor'
    WHEN email = 'reception@demo.com' THEN 'receptionist'
    ELSE 'patient'
  END as role,
  '550e8400-e29b-41d4-a716-446655440001' as clinic_id,
  true as is_active
FROM (
  VALUES 
    ('admin@demo.com'),
    ('doctor@demo.com'),
    ('reception@demo.com'),
    ('patient@demo.com')
) as demo_users(email)
ON CONFLICT (email) DO NOTHING;

-- Create doctor record for demo doctor
INSERT INTO public.doctors (name, speciality, clinic_id, consultation_fee, experience_years, bio) 
VALUES (
  'Dr. Demo Doctor',
  'General Medicine',
  '550e8400-e29b-41d4-a716-446655440001',
  1000,
  8,
  'Demo doctor profile for testing the system'
)
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
  RAISE NOTICE 'Follow the instructions at the top of this file.';
  RAISE NOTICE '==============================================';
END $$;