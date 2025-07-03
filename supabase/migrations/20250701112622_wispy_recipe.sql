/*
  # Demo Users Setup Guide

  This migration provides instructions for setting up demo users for the Hospverse application.
  
  ## Required Demo Users
  
  The following demo users need to be created manually in your Supabase Auth dashboard:
  
  1. **Doctor Demo User**
     - Email: doctor@demo.com
     - Password: demo123
     - Role: doctor
  
  2. **Receptionist Demo User**
     - Email: reception@demo.com
     - Password: demo123
     - Role: receptionist
  
  3. **Patient Demo User**
     - Email: patient@demo.com
     - Password: demo123
     - Role: patient
  
  ## How to Create Demo Users
  
  1. Go to your Supabase Dashboard
  2. Navigate to Authentication > Users
  3. Click "Add User"
  4. Enter the email and password for each demo user
  5. Set "Email Confirm" to false (since email confirmation is disabled)
  6. Click "Create User"
  
  ## User Profiles Setup
  
  After creating the auth users, this migration will ensure the corresponding user profiles 
  are created in the public.users table when they first sign in.
*/

-- Create a function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert a basic user profile for new auth users
  INSERT INTO public.users (auth_user_id, email, role, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'patient'),
    true
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profiles for new auth users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create some sample clinic data for demo users
INSERT INTO clinics (name, specialty, city, address, phone, email, status, contact_person, license_number)
VALUES 
  ('Demo General Hospital', 'hospital', 'Mumbai', '123 Healthcare Street, Mumbai', '+91-9876543210', 'info@demohospital.com', 'active', 'Dr. Admin', 'LIC-2024-001'),
  ('Demo Dental Clinic', 'dental', 'Mumbai', '456 Dental Avenue, Mumbai', '+91-9876543211', 'info@demodental.com', 'active', 'Dr. Dentist', 'LIC-2024-002'),
  ('Demo Aesthetic Center', 'aesthetic', 'Mumbai', '789 Beauty Lane, Mumbai', '+91-9876543212', 'info@demoaesthetic.com', 'active', 'Dr. Aesthetic', 'LIC-2024-003')
ON CONFLICT DO NOTHING;