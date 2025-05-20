
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { signOut, updateProfile } from '@/store/authSlice';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const { user, session, profile, loading } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await dispatch(signOut()).unwrap();
      toast({
        title: "Logged out",
        description: "You've been logged out. See you soon!",
      });
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: error,
        variant: "destructive"
      });
    }
  };

  const handleUpdateProfile = async (data: any) => {
    if (!user) return;
    
    try {
      await dispatch(updateProfile(data)).unwrap();
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: error,
        variant: "destructive"
      });
    }
  };

  return {
    user,
    session,
    profile,
    loading,
    signOut: handleSignOut,
    updateProfile: handleUpdateProfile,
  };
};
