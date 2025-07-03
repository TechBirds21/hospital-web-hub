/*
  # Initial Schema for Hospverse Platform

  1. New Tables
    - `users` - User authentication and profile management
    - `clinics` - Healthcare facilities (hospitals, dental, aesthetic clinics)
    - `doctors` - Medical practitioners and their specialties
    - `patients` - Patient information and medical records
    - `appointments` - Appointment scheduling and management
    - `pharmacy_items` - Medication and supply inventory
    - `lab_tests` - Laboratory tests and results
    - `hr_staff` - Human resources and staff management
    - `accounts_tx` - Financial transactions and billing

  2. Security
    - Enable RLS on all tables
    - Add role-based access policies
    - Implement clinic-based data isolation

  3. Indexes
    - Performance optimization for frequent queries
    - Composite indexes for complex lookups
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Clinics table
CREATE TABLE IF NOT EXISTS clinics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id uuid REFERENCES clinics(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  speciality text NOT NULL,
  qualification text,
  experience_years integer DEFAULT 0,
  consultation_fee decimal(10,2) DEFAULT 0,
  bio text,
  pic_url text,
  slot_duration_minutes integer DEFAULT 30,
  available_days text[] DEFAULT ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  start_time time DEFAULT '09:00',
  end_time time DEFAULT '18:00',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  aadhaar text UNIQUE,
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

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE,
  clinic_id uuid REFERENCES clinics(id) ON DELETE CASCADE,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  duration_minutes integer DEFAULT 30,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
  consultation_fee decimal(10,2) DEFAULT 0,
  chief_complaint text,
  diagnosis text,
  treatment_plan text,
  prescriptions jsonb,
  notes text,
  token_number integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Pharmacy items table
CREATE TABLE IF NOT EXISTS pharmacy_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id uuid REFERENCES clinics(id) ON DELETE CASCADE,
  name text NOT NULL,
  generic_name text,
  manufacturer text,
  batch_number text,
  expiry_date date,
  quantity_available integer DEFAULT 0,
  unit_price decimal(10,2) DEFAULT 0,
  reorder_level integer DEFAULT 10,
  category text,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Lab tests table
CREATE TABLE IF NOT EXISTS lab_tests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id uuid REFERENCES clinics(id) ON DELETE CASCADE,
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE,
  test_name text NOT NULL,
  test_code text,
  sample_type text,
  status text DEFAULT 'ordered' CHECK (status IN ('ordered', 'collected', 'processing', 'completed', 'cancelled')),
  ordered_at timestamptz DEFAULT now(),
  collected_at timestamptz,
  completed_at timestamptz,
  results jsonb,
  reference_ranges jsonb,
  critical_values boolean DEFAULT false,
  price decimal(10,2) DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- HR Staff table
CREATE TABLE IF NOT EXISTS hr_staff (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id uuid REFERENCES clinics(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  employee_id text UNIQUE NOT NULL,
  department text,
  position text NOT NULL,
  join_date date NOT NULL,
  salary decimal(12,2),
  shift_type text CHECK (shift_type IN ('morning', 'evening', 'night', 'rotating')),
  shift_start_time time,
  shift_end_time time,
  reporting_manager_id uuid REFERENCES hr_staff(id),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'terminated')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Accounts transactions table
CREATE TABLE IF NOT EXISTS accounts_tx (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id uuid REFERENCES clinics(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('income', 'expense', 'refund')),
  category text NOT NULL,
  amount decimal(12,2) NOT NULL,
  payment_method text CHECK (payment_method IN ('cash', 'card', 'upi', 'bank_transfer', 'insurance')),
  reference_id uuid, -- Links to appointments, pharmacy sales, etc.
  description text,
  notes text,
  transaction_date date DEFAULT CURRENT_DATE,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Departments lookup table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id uuid REFERENCES clinics(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  head_doctor_id uuid REFERENCES doctors(id),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text CHECK (type IN ('appointment', 'payment', 'reminder', 'alert', 'system')),
  is_read boolean DEFAULT false,
  action_url text,
  created_at timestamptz DEFAULT now()
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE,
  clinic_id uuid REFERENCES clinics(id) ON DELETE CASCADE,
  appointment_id uuid REFERENCES appointments(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  feedback_text text,
  category text,
  created_at timestamptz DEFAULT now()
);

-- Foreign key constraints
ALTER TABLE users ADD CONSTRAINT fk_users_clinic FOREIGN KEY (clinic_id) REFERENCES clinics(id);
ALTER TABLE users ADD CONSTRAINT fk_users_hospital FOREIGN KEY (hospital_id) REFERENCES clinics(id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE pharmacy_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts_tx ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Clinic staff can read clinic users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.auth_user_id = auth.uid() 
      AND u.clinic_id = users.clinic_id
    )
  );

-- Clinics policies
CREATE POLICY "Users can read own clinic" ON clinics
  FOR SELECT USING (
    id IN (
      SELECT clinic_id FROM users WHERE auth_user_id = auth.uid()
      UNION
      SELECT hospital_id FROM users WHERE auth_user_id = auth.uid()
    )
  );

-- Doctors policies
CREATE POLICY "Clinic staff can read clinic doctors" ON doctors
  FOR SELECT USING (
    clinic_id IN (
      SELECT clinic_id FROM users WHERE auth_user_id = auth.uid()
      UNION
      SELECT hospital_id FROM users WHERE auth_user_id = auth.uid()
    )
  );

-- Patients policies
CREATE POLICY "Patients can read own data" ON patients
  FOR ALL USING (
    user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid())
  );

CREATE POLICY "Healthcare staff can read patients" ON patients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.auth_user_id = auth.uid() 
      AND u.role IN ('doctor', 'nurse', 'receptionist', 'admin')
    )
  );

-- Appointments policies
CREATE POLICY "Users can manage related appointments" ON appointments
  FOR ALL USING (
    patient_id IN (SELECT id FROM patients WHERE user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()))
    OR doctor_id IN (SELECT id FROM doctors WHERE user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()))
    OR clinic_id IN (SELECT clinic_id FROM users WHERE auth_user_id = auth.uid())
  );

-- Pharmacy policies
CREATE POLICY "Clinic staff can manage pharmacy" ON pharmacy_items
  FOR ALL USING (
    clinic_id IN (
      SELECT clinic_id FROM users WHERE auth_user_id = auth.uid()
      UNION
      SELECT hospital_id FROM users WHERE auth_user_id = auth.uid()
    )
  );

-- Lab tests policies
CREATE POLICY "Clinic staff can manage lab tests" ON lab_tests
  FOR ALL USING (
    clinic_id IN (
      SELECT clinic_id FROM users WHERE auth_user_id = auth.uid()
      UNION
      SELECT hospital_id FROM users WHERE auth_user_id = auth.uid()
    )
  );

-- HR Staff policies
CREATE POLICY "HR and admin can manage staff" ON hr_staff
  FOR ALL USING (
    clinic_id IN (
      SELECT clinic_id FROM users 
      WHERE auth_user_id = auth.uid() 
      AND role IN ('admin', 'hr_manager')
    )
  );

-- Accounts policies
CREATE POLICY "Admin and authorized staff can manage accounts" ON accounts_tx
  FOR ALL USING (
    clinic_id IN (
      SELECT clinic_id FROM users 
      WHERE auth_user_id = auth.uid() 
      AND role IN ('admin', 'receptionist')
    )
  );

-- Indexes for performance
CREATE INDEX idx_users_auth_user_id ON users(auth_user_id);
CREATE INDEX idx_users_clinic_id ON users(clinic_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_doctors_clinic_id ON doctors(clinic_id);
CREATE INDEX idx_patients_phone ON patients(phone);
CREATE INDEX idx_appointments_date_doctor ON appointments(appointment_date, doctor_id);
CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_pharmacy_clinic_id ON pharmacy_items(clinic_id);
CREATE INDEX idx_pharmacy_expiry ON pharmacy_items(expiry_date);
CREATE INDEX idx_lab_tests_patient_id ON lab_tests(patient_id);
CREATE INDEX idx_lab_tests_status ON lab_tests(status);
CREATE INDEX idx_accounts_clinic_date ON accounts_tx(clinic_id, transaction_date);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clinics_updated_at BEFORE UPDATE ON clinics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pharmacy_updated_at BEFORE UPDATE ON pharmacy_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lab_tests_updated_at BEFORE UPDATE ON lab_tests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hr_staff_updated_at BEFORE UPDATE ON hr_staff
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();