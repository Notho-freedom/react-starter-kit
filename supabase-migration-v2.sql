-- =============================================
-- OpenRide Full Migration (v2)
-- Run this in your Supabase SQL Editor
-- =============================================

-- Add missing columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS rating numeric(3,2) DEFAULT 5.0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS review_count integer DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS trip_count integer DEFAULT 0;

-- Enable realtime for bookings and ride_requests too
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.ride_requests;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
