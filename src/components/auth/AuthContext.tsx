
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

// Define a type for user profiles
type UserProfile = {
  id: string;
  email?: string | null;
  phone?: string | null;
  gender?: 'male' | 'female' | null;
  name?: string | null;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user profile from database
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      
      if (data) {
        console.log("Fetched profile data:", data);
        setProfile(data as UserProfile);
        
        // Only set a name from email if there's absolutely no name value
        if (!data.name && user?.email) {
          // We should avoid auto-generating names from emails if possible
          console.log("Profile has no name and will only show generic greeting");
        }
      }
    } catch (error: any) {
      console.error('Error fetching user profile:', error.message);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user profile if user is logged in
        if (session?.user) {
          // Use setTimeout to avoid potential auth deadlock
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Existing session check:", session ? "Found session" : "No session");
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You've been logged out. See you soon!",
      });
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to upload an avatar",
        variant: "destructive"
      });
      return null;
    }

    try {
      // Create a unique file path with user ID as folder
      const filePath = `${user.id}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      
      // Upload the file to the profile_pictures bucket
      const { error: uploadError } = await supabase.storage
        .from('profile_pictures')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get the public URL for the file
      const { data } = supabase.storage
        .from('profile_pictures')
        .getPublicUrl(filePath);
        
      const publicUrl = data.publicUrl;
      
      // Update the user's profile with the avatar URL
      await updateProfile({ avatar_url: publicUrl });
      
      toast({
        title: "Avatar uploaded",
        description: "Your profile picture has been updated",
      });
      
      return publicUrl;
    } catch (error: any) {
      console.error('Error uploading avatar:', error.message);
      toast({
        title: "Error uploading avatar",
        description: error.message,
        variant: "destructive"
      });
      return null;
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) {
      console.error("Cannot update profile: No user is logged in");
      return;
    }
    
    try {
      console.log("Updating profile for user", user.id, "with data:", data);
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update local profile state
      setProfile(prev => prev ? { ...prev, ...data } : null);
      
      console.log("Profile updated successfully");
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signOut,
    updateProfile,
    uploadAvatar,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
