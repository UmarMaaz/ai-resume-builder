
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthError, Session, User } from "@supabase/supabase-js";

export interface UserProfile {
  id: number;  // Changed from string to number to match the database schema
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user profile data
  const fetchProfile = async (userId: string) => {
    try {
      // Convert the string UUID to a numeric ID for database query
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, name')
        .eq('id', parseInt(userId))
        .single();
      
      if (error) {
        console.error('Error fetching profile', error);
        return null;
      }
      
      if (!data) return null;
      
      // Return the profile with numeric ID
      return {
        id: data.id, // Already a number, no need for conversion
        email: data.email || '',
        name: data.name
      } as UserProfile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Create or update profile
  const upsertProfile = async (userId: string, email: string, name?: string) => {
    try {
      // Convert the string UUID from auth to a numeric ID for the profiles table
      const numericId = parseInt(userId);
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: numericId,
          email,
          name,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });
        
      if (error) {
        console.error('Error upserting profile:', error);
      }
    } catch (error) {
      console.error('Error upserting profile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const userProfile = await fetchProfile(session.user.id);
          setProfile(userProfile || { 
            id: parseInt(session.user.id), 
            email: session.user.email || ''
          });

          // If new sign in, update the profile
          if (event === 'SIGNED_IN') {
            await upsertProfile(
              session.user.id,
              session.user.email || '',
              session.user.user_metadata?.name || session.user.user_metadata?.full_name
            );
          }
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Initial auth check
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const userProfile = await fetchProfile(session.user.id);
          setProfile(userProfile || { 
            id: parseInt(session.user.id), 
            email: session.user.email || '' 
          });
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const loginWithGoogle = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Login failed. Please try again");
    }
  };

  // Add the register function for email/password signup
  const register = async (email: string, password: string, name?: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: window.location.origin
        }
      });

      if (error) {
        console.error("Registration error:", error);
        toast.error(error.message);
        return false;
      }

      if (data.user) {
        toast.success("Registration successful! Please check your email to verify your account.");
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again");
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        isLoading,
        loginWithGoogle,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
