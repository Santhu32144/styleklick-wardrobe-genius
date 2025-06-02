
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

// Define a type for user profiles
type UserProfile = {
  id: string;
  email?: string | null;
  phone?: string | null;
  gender?: 'male' | 'female' | null;
  name?: string | null;
  profile_picture?: string | null;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
};

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  session: null,
  profile: null,
  loading: true,
  error: null,
};

// Async thunk for uploading profile picture
export const uploadProfilePicture = createAsyncThunk(
  'auth/uploadProfilePicture',
  async (file: File, { getState, rejectWithValue }) => {
    const { auth } = getState() as { auth: AuthState };
    if (!auth.user) return rejectWithValue('User not authenticated');
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${auth.user.id}/avatar.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file, { upsert: true });
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName);
        
      const profilePictureUrl = data.publicUrl;
      
      // Update profile with new picture URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ profile_picture: profilePictureUrl })
        .eq('id', auth.user.id);
        
      if (updateError) throw updateError;
      
      return profilePictureUrl;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for signing out
export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await supabase.auth.signOut();
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data: Partial<UserProfile>, { getState, rejectWithValue }) => {
    const { auth } = getState() as { auth: AuthState };
    if (!auth.user) return rejectWithValue('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', auth.user.id);
        
      if (error) throw error;
      
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (userId: string, { rejectWithValue, getState }) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      
      // If there's no name and we have an email, set a name from the email
      if (data && !data.name) {
        const { auth } = getState() as { auth: AuthState };
        const email = auth.user?.email;
        
        if (email) {
          const name = email.split('@')[0];
          data.name = name.charAt(0).toUpperCase() + name.slice(1);
          
          // Update the profile in the database
          await supabase
            .from('profiles')
            .update({ name: data.name })
            .eq('id', userId);
        }
      }
      
      return data as UserProfile;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
      state.user = action.payload?.user ?? null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.session = null;
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.session = null;
        state.profile = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.profile_picture = action.payload;
        }
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setSession, setUser, setLoading, clearAuth } = authSlice.actions;

export default authSlice.reducer;
