import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import patientReducer from './slices/patientSlice';
import caregiverReducer from './slices/caregiverSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    patient: patientReducer,
    caregiver: caregiverReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 