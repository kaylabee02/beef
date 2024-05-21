import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bdqdzhkykzvomnobpwng.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkcWR6aGt5a3p2b21ub2Jwd25nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3Nzg0NTQsImV4cCI6MjAzMTM1NDQ1NH0.nJM5AdAJrReT1L3iX5lIP5P6_CzMgp2Go3qVFgqJZbs"; // Replace with your Supabase public key

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;