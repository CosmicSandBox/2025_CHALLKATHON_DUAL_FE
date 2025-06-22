import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'patient' | 'caregiver';

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  onboardingCompleted: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: null,
  onboardingCompleted: false,
  user: null,
  isLoading: false,
  error: null,
};

// Async thunks for persistent storage
export const loadStoredAuthState = createAsyncThunk(
  'auth/loadStoredState',
  async () => {
    try {
      const storedUserRole = await AsyncStorage.getItem('userRole');
      const storedOnboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
      
      return {
        userRole: storedUserRole as UserRole | null,
        onboardingCompleted: storedOnboardingCompleted === 'true',
      };
    } catch (error) {
      console.error('Failed to load stored auth state:', error);
      return { userRole: null, onboardingCompleted: false };
    }
  }
);

export const saveUserRole = createAsyncThunk(
  'auth/saveUserRole',
  async (role: UserRole) => {
    try {
      await AsyncStorage.setItem('userRole', role);
      return role;
    } catch (error) {
      console.error('Failed to save user role:', error);
      throw error;
    }
  }
);

export const saveOnboardingCompleted = createAsyncThunk(
  'auth/saveOnboardingCompleted',
  async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      return true;
    } catch (error) {
      console.error('Failed to save onboarding completed:', error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.userRole = action.payload;
    },
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<AuthState['user']>) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.onboardingCompleted = true;
      }
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    completeOnboarding: (state) => {
      state.onboardingCompleted = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.userRole = null;
      state.onboardingCompleted = false;
      state.error = null;
      AsyncStorage.removeItem('userRole');
      AsyncStorage.removeItem('onboardingCompleted');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStoredAuthState.fulfilled, (state, action) => {
        state.userRole = action.payload.userRole;
        state.onboardingCompleted = action.payload.onboardingCompleted;
      })
      .addCase(saveUserRole.fulfilled, (state, action) => {
        state.userRole = action.payload;
      })
      .addCase(saveOnboardingCompleted.fulfilled, (state) => {
        state.onboardingCompleted = true;
      });
  },
});

export const {
  setUserRole,
  loginStart,
  loginSuccess,
  loginFailure,
  completeOnboarding,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer; 