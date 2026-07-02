CREATE TABLE public.appointment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 120),
  email text NOT NULL CHECK (char_length(email) <= 255),
  phone text,
  service text NOT NULL CHECK (char_length(service) <= 80),
  appointment_date date NOT NULL,
  preferred_time text NOT NULL CHECK (char_length(preferred_time) <= 20),
  notes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'declined', 'completed')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT, SELECT ON public.appointment_requests TO anon;
GRANT ALL ON public.appointment_requests TO service_role;

ALTER TABLE public.appointment_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an appointment request" ON public.appointment_requests FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can view their own submitted request by id" ON public.appointment_requests FOR SELECT TO anon USING (false);

CREATE OR REPLACE FUNCTION public.update_appointment_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_appointment_requests_updated_at
BEFORE UPDATE ON public.appointment_requests
FOR EACH ROW EXECUTE FUNCTION public.update_appointment_requests_updated_at();