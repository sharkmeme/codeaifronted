import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY in Replit Secrets.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Lead = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  socials?: string | null;
  project_type: string;
  description: string;
  extra_info?: string | null;
  created_at?: string;
};
