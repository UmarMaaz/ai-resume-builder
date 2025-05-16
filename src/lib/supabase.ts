
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check your Lovable project settings.');
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
