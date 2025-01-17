import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
      console.error("Supabase URL is not defined. Please set VITE_SUPABASE_URL environment variable.");
    }

    if (!supabaseKey) {
      console.error("Supabase ANON Key is not defined. Please set VITE_SUPABASE_ANON_KEY environment variable.");
    }

    export const supabase = createClient(supabaseUrl, supabaseKey);
