import { createClient } from "@supabase/supabase-js";

// --- PASTE YOUR KEYS HERE ---
// You can get these from your Supabase project settings > API
const supabaseUrl = "https://ypyiqrjectsarvtabuad.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlweWlxcmplY3RzYXJ2dGFidWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTM2MDQsImV4cCI6MjA3ODE4OTYwNH0.Vn7m9ZsNa0bMtzsnB9m0VAiOKbndc7c-E9VJN77Clw4";
// ----------------------------

export const supabase = createClient(supabaseUrl, supabaseKey);
