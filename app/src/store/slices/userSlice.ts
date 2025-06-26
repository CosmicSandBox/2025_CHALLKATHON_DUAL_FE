import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserProfileStatus } from '../../api/config';

interface UserState {
  user: User | null;
  profileStatus: UserProfileStatus | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  profileStatus: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setProfileStatus: (state, action: PayloadAction<UserProfileStatus>) => {
      state.profileStatus = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.profileStatus = null;
      state.error = null;
    },
  },
});

export const {
  setUser,
  setProfileStatus,
  updateUser,
  setLoading,
  setError,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
