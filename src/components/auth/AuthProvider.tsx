
import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAppDispatch } from '@/store/hooks';
import { setSession, setLoading, fetchUserProfile } from '@/store/authSlice';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        dispatch(setSession(session));
        
        // Fetch user profile if user is logged in
        if (session?.user) {
          setTimeout(() => {
            dispatch(fetchUserProfile(session.user.id));
          }, 0);
        }
        
        dispatch(setLoading(false));
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
      
      if (session?.user) {
        dispatch(fetchUserProfile(session.user.id));
      }
      
      dispatch(setLoading(false));
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
