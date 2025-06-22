import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  language: 'ko' | 'en';
  notifications: {
    exerciseReminder: boolean;
    reminderTime: string;
  };
  syncSettings: {
    autoSync: boolean;
    lastSync: string;
  };
}

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    updateNotificationSettings: (state, action: PayloadAction<UserProfile['notifications']>) => {
      if (state.profile) {
        state.profile.notifications = action.payload;
      }
    },
    updateSyncSettings: (state, action: PayloadAction<UserProfile['syncSettings']>) => {
      if (state.profile) {
        state.profile.syncSettings = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  updateNotificationSettings,
  updateSyncSettings,
  setLoading,
  setError,
} = userSlice.actions;

export default userSlice.reducer; 