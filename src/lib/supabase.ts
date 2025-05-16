
import { createClient } from '@supabase/supabase-js';

// Default values for development (these will be overridden by environment variables when available)
const defaultSupabaseUrl = 'https://your-project-id.supabase.co';
const defaultSupabaseAnonKey = 'your-anon-key';

// Use environment variables if available, otherwise use default values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultSupabaseUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultSupabaseAnonKey;

// Log warnings if using default values
if (supabaseUrl === defaultSupabaseUrl || supabaseAnonKey === defaultSupabaseAnonKey) {
  console.warn('Using default Supabase credentials. Please set your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables in your Lovable project settings.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          name: string | null;
          email: string;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          name?: string | null;
          email: string;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          name?: string | null;
          email?: string;
        };
      };
      resumes: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string | null;
          user_id: string;
          data: any;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          user_id: string;
          data: any;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          user_id?: string;
          data?: any;
        };
      };
    };
  };
}
