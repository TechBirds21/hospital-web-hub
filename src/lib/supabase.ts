import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tprfvkfvarhskprpdlwy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwcmZ2a2Z2YXJoc2twcnBkbHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMTk0MzIsImV4cCI6MjA2Njg5NTQzMn0.RWPxKp_mV-a0C7zAcTMnJi5kL74NRqUisZqZuvjEA_c';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Database types matching backend schema
export interface User {
  id: string;
  auth_user_id?: string;
  role: 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'pharmacist' | 'lab_tech' | 'patient' | 'hr_manager';
  email: string;
  phone?: string;
  aadhaar?: string;
  clinic_id?: string;
  hospital_id?: string;
  pic_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Clinic {
  id: string;
  name: string;
  specialty: 'hospital' | 'dental' | 'aesthetic' | 'general';
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  status: 'active' | 'inactive' | 'pending';
  contact_person?: string;
  license_number?: string;
  created_at: string;
  updated_at: string;
}

export interface Doctor {
  id: string;
  clinic_id: string;
  user_id: string;
  name: string;
  speciality: string;
  qualification?: string;
  experience_years: number;
  consultation_fee: number;
  bio?: string;
  pic_url?: string;
  slot_duration_minutes: number;
  available_days: string[];
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Patient {
  id: string;
  user_id: string;
  aadhaar?: string;
  phone: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  blood_group?: string;
  allergies?: string[];
  medical_history?: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  clinic_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  consultation_fee: number;
  chief_complaint?: string;
  diagnosis?: string;
  treatment_plan?: string;
  prescriptions?: any;
  notes?: string;
  token_number?: number;
  created_at: string;
  updated_at: string;
}