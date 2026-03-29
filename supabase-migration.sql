-- =============================================
-- OpenRide Full Migration
-- =============================================

-- Enums
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.trip_status AS ENUM ('draft', 'published', 'cancelled', 'completed');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.availability_status AS ENUM ('active', 'fulfilled', 'cancelled');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.request_status AS ENUM ('active', 'fulfilled', 'cancelled');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.booking_status AS ENUM ('confirmed', 'pending', 'cancelled');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.payment_status AS ENUM ('paid', 'authorized', 'cash_pending');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.conversation_context AS ENUM ('ride', 'availability', 'request');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =============================================
-- PROFILES
-- =============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text,
  last_name text,
  email text,
  phone text,
  bio text,
  city text,
  country text DEFAULT 'France',
  gender text,
  birth_date date,
  avatar_url text,
  currency text DEFAULT 'EUR',
  language text DEFAULT 'fr',
  emergency_contact_name text,
  emergency_contact_phone text,
  email_verified boolean DEFAULT false,
  phone_verified boolean DEFAULT false,
  id_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =============================================
-- USER ROLES
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

DO $$ BEGIN
  CREATE POLICY "user_roles_select_own" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =============================================
-- TRIPS
-- =============================================
CREATE TABLE IF NOT EXISTS public.trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  departure text NOT NULL,
  destination text NOT NULL,
  departure_station text,
  arrival_station text,
  departure_lat double precision,
  departure_lng double precision,
  destination_lat double precision,
  destination_lng double precision,
  date date NOT NULL,
  time time NOT NULL,
  price numeric(10,2) NOT NULL,
  seats_total integer NOT NULL DEFAULT 3,
  seats_left integer NOT NULL DEFAULT 3,
  vehicle_name text,
  vehicle_color text,
  luggage_allowed boolean DEFAULT true,
  pets_allowed boolean DEFAULT false,
  smoking_allowed boolean DEFAULT false,
  instructions text,
  status public.trip_status DEFAULT 'published',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "trips_select_published" ON public.trips FOR SELECT USING (status = 'published' OR driver_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "trips_insert_own" ON public.trips FOR INSERT WITH CHECK (auth.uid() = driver_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "trips_update_own" ON public.trips FOR UPDATE USING (auth.uid() = driver_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "trips_delete_own" ON public.trips FOR DELETE USING (auth.uid() = driver_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =============================================
-- DRIVER AVAILABILITIES
-- =============================================
CREATE TABLE IF NOT EXISTS public.driver_availabilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  zone text NOT NULL,
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  seats integer DEFAULT 3,
  vehicle_name text,
  notes text,
  status public.availability_status DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.driver_availabilities ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "avail_select_active" ON public.driver_availabilities FOR SELECT USING (status = 'active' OR driver_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "avail_insert_own" ON public.driver_availabilities FOR INSERT WITH CHECK (auth.uid() = driver_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "avail_update_own" ON public.driver_availabilities FOR UPDATE USING (auth.uid() = driver_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =============================================
-- RIDE REQUESTS
-- =============================================
CREATE TABLE IF NOT EXISTS public.ride_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  passenger_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  origin text NOT NULL,
  destination text,
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  seat_count integer DEFAULT 1,
  notes text,
  status public.request_status DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.ride_requests ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "requests_select_active" ON public.ride_requests FOR SELECT USING (status = 'active' OR passenger_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "requests_insert_own" ON public.ride_requests FOR INSERT WITH CHECK (auth.uid() = passenger_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "requests_update_own" ON public.ride_requests FOR UPDATE USING (auth.uid() = passenger_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =============================================
-- BOOKINGS
-- =============================================
CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id uuid NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  passenger_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  seat_count integer NOT NULL DEFAULT 1,
  payment_method text NOT NULL DEFAULT 'card',
  payment_status public.payment_status DEFAULT 'paid',
  status public.booking_status DEFAULT 'confirmed',
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "bookings_select_own" ON public.bookings FOR SELECT USING (passenger_id = auth.uid() OR ride_id IN (SELECT id FROM public.trips WHERE driver_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "bookings_insert_own" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = passenger_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "bookings_update_involved" ON public.bookings FOR UPDATE USING (passenger_id = auth.uid() OR ride_id IN (SELECT id FROM public.trips WHERE driver_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =============================================
-- CONVERSATIONS
-- =============================================
CREATE TABLE IF NOT EXISTS public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  context_type public.conversation_context NOT NULL DEFAULT 'ride',
  context_id uuid,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "convos_select_participant" ON public.conversations FOR SELECT USING (
    id IN (SELECT conversation_id FROM public.conversation_participants WHERE user_id = auth.uid())
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "convos_insert_auth" ON public.conversations FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =============================================
-- CONVERSATION PARTICIPANTS
-- =============================================
CREATE TABLE IF NOT EXISTS public.conversation_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_label text DEFAULT 'Participant'
);

ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "cp_select_own" ON public.conversation_participants FOR SELECT USING (user_id = auth.uid() OR conversation_id IN (SELECT conversation_id FROM public.conversation_participants WHERE user_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "cp_insert_auth" ON public.conversation_participants FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =============================================
-- MESSAGES
-- =============================================
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  text text NOT NULL,
  attachment_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "messages_select_participant" ON public.messages FOR SELECT USING (
    conversation_id IN (SELECT conversation_id FROM public.conversation_participants WHERE user_id = auth.uid())
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "messages_insert_participant" ON public.messages FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND conversation_id IN (SELECT conversation_id FROM public.conversation_participants WHERE user_id = auth.uid())
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- ENABLE REALTIME FOR MESSAGES
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
