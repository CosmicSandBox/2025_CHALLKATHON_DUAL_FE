import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout as apiLogout } from '../../api';

export type UserRole = 'patient' | 'caregiver';

interface AuthState {
  userToken: string | null;
  userRole: UserRole | null;
  onboardingComplete: boolean;
  isLoading: boolean;
  error: string | null;
}

/* 더미 쓰기 전 초기 상태 */
const initialState: AuthState = {
  userToken: null,
  userRole: null,
  onboardingComplete: false,
  isLoading: false,
  error: null,
};

/* 테스트용 더미 데이터 (비활성화)
const initialState: AuthState = {
  userToken: 'dummy-token-for-testing', // 테스트용 더미 토큰
  userRole: 'patient', // 환자 역할로 테스트
  onboardingComplete: true, // 온보딩 완료 상태
  isLoading: false,
  error: null,
};
*/

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

// 로그아웃 async thunk
export const performLogout = createAsyncThunk(
  'auth/performLogout',
  async () => {
    try {
      // AsyncStorage에서 인증 정보 제거
      await AsyncStorage.multiRemove(['userToken', 'userRole']);
      
      // API 클라이언트에서 토큰 제거
      apiLogout();
      
      return true;
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    restoreToken: (state, action: PayloadAction<{ token: string }>) => {
      state.userToken = action.payload.token;
      state.isLoading = false;
    },
    signIn: (state, action: PayloadAction<{ token: string; role: 'patient' | 'caregiver' }>) => {
      state.userToken = action.payload.token;
      state.userRole = action.payload.role;
      state.isLoading = false;
    },
    signOut: (state) => {
      state.userToken = null;
      state.userRole = null;
      state.onboardingComplete = false;
    },
    setRole: (state, action: PayloadAction<'patient' | 'caregiver'>) => {
      state.userRole = action.payload;
    },
    completeOnboarding: (state) => {
      state.onboardingComplete = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStoredAuthState.fulfilled, (state, action) => {
        state.userRole = action.payload.userRole;
        state.onboardingComplete = action.payload.onboardingCompleted;
      })
      .addCase(saveUserRole.fulfilled, (state, action) => {
        state.userRole = action.payload;
      })
      .addCase(saveOnboardingCompleted.fulfilled, (state) => {
        state.onboardingComplete = true;
      })
      .addCase(performLogout.fulfilled, (state) => {
        state.userToken = null;
        state.userRole = null;
        state.onboardingComplete = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(performLogout.rejected, (state, action) => {
        state.error = action.error.message || 'Logout failed';
      });
  },
});

export const {
  restoreToken,
  signIn,
  signOut,
  setRole,
  completeOnboarding,
  setLoading,
  setError,
} = authSlice.actions;

export default authSlice.reducer;