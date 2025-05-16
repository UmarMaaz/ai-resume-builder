
import { createClient } from '@supabase/supabase-js';

// Use your actual Supabase URL and anon key
const supabaseUrl = 'https://zebroapqzyblmcyrgvic.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplYnJvYXBxenlibG1jeXJndmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczODM4OTMsImV4cCI6MjA2Mjk1OTg5M30.MN5xaRtx6wofqHEv9DFtHTGLLa3StTrmc4YI1ajMjcI';

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
