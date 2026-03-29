import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cqzffnlakvixhyixjokf.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxemZmbmxha3ZpeGh5aXhqb2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MDA0NDksImV4cCI6MjA5MDM3NjQ0OX0.uBsqOOv9dhe5q-ZYRp66gNOMIn9GbI2RonFA7p-zSx4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
