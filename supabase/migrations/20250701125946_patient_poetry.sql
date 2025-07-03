/*
  # Create Demo Form Data Schema

  1. New Tables
    - `contact_forms` - Stores contact form submissions
    - `demo_requests` - Stores demo booking requests

  2. Security
    - Enable RLS on new tables
    - Add policies for admin access
*/

-- Create contact forms table to store form submissions
CREATE TABLE IF NOT EXISTS public.contact_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  organization text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create demo requests table to store specific demo bookings
CREATE TABLE IF NOT EXISTS public.demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES public.contact_forms(id) ON DELETE CASCADE,
  specialty text NOT NULL CHECK (specialty IN ('hospital', 'dental', 'skin', 'general')),
  preferred_date date,
  preferred_time text,
  attendees_count integer DEFAULT 1,
  special_requirements text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.contact_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for admins to access contact forms
CREATE POLICY "Admins can manage contact forms"
  ON public.contact_forms
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.auth_user_id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create policies for admins to access demo requests
CREATE POLICY "Admins can manage demo requests"
  ON public.demo_requests
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.auth_user_id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Insert sample data for demo
INSERT INTO public.contact_forms (name, email, organization, phone, subject, message, status)
VALUES
  ('Dr. Rajesh Kumar', 'rajesh.kumar@example.com', 'City Hospital', '+91 98765 43210', 'pilot-program', 'Interested in joining the hospital management pilot program. We have a 200-bed facility.', 'contacted'),
  ('Dr. Priya Sharma', 'priya.sharma@example.com', 'SmileCare Dental', '+91 87654 32109', 'ai-demo', 'Would like to see a demo of the dental practice AI features.', 'new'),
  ('Dr. Amit Patel', 'amit.patel@example.com', 'Skin & Aesthetics', '+91 76543 21098', 'pricing', 'Need pricing information for our aesthetic clinic with 5 practitioners.', 'new')
ON CONFLICT DO NOTHING;

-- Insert sample demo requests
INSERT INTO public.demo_requests (contact_id, specialty, preferred_date, preferred_time, attendees_count, status)
VALUES
  (
    (SELECT id FROM public.contact_forms WHERE email = 'rajesh.kumar@example.com' LIMIT 1), 
    'hospital', 
    (CURRENT_DATE + INTERVAL '7 days'), 
    '10:00 AM', 
    3, 
    'confirmed'
  ),
  (
    (SELECT id FROM public.contact_forms WHERE email = 'priya.sharma@example.com' LIMIT 1), 
    'dental', 
    (CURRENT_DATE + INTERVAL '14 days'), 
    '2:00 PM', 
    2, 
    'pending'
  )
ON CONFLICT DO NOTHING;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'Demo Form Data Schema Created!';
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'New tables:';
  RAISE NOTICE '- contact_forms: Stores contact form submissions';
  RAISE NOTICE '- demo_requests: Stores demo booking requests';
  RAISE NOTICE '';
  RAISE NOTICE 'Sample data has been created for testing.';
  RAISE NOTICE '==============================================';
END $$;