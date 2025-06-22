import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExerciseSession {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  steps: number;
  painLevel: number;
  painLocation: string;
  notes?: string;
  type: 'indoor' | 'outdoor';
}

interface OutdoorSession extends ExerciseSession {
  distance: number; // km
  route: Array<{ latitude: number; longitude: number; timestamp: string }>;
  weather: {
    temperature: number;
    condition: string;
    humidity: number;
  };
  photos: string[];
  sosCount: number;
}

interface DailyStats {
  date: string;
  totalSteps: number;
  totalDuration: number;
  averagePain: number;
  sessions: ExerciseSession[];
}

interface PatientState {
  currentSession: ExerciseSession | null;
  dailyStats: DailyStats | null;
  weeklyStats: DailyStats[];
  monthlyStats: DailyStats[];
  isLoading: boolean;
  error: string | null;
  isTracking: boolean;
  currentSteps: number;
  currentPainLevel: number;
  currentPainLocation: string;
}

const initialState: PatientState = {
  currentSession: null,
  dailyStats: null,
  weeklyStats: [],
  monthlyStats: [],
  isLoading: false,
  error: null,
  isTracking: false,
  currentSteps: 0,
  currentPainLevel: 0,
  currentPainLocation: '',
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    startSession: (state, action: PayloadAction<{ type: 'indoor' | 'outdoor' }>) => {
      const session: ExerciseSession = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        startTime: new Date().toISOString(),
        endTime: '',
        duration: 0,
        steps: 0,
        painLevel: 0,
        painLocation: '',
        type: action.payload.type,
      };
      state.currentSession = session;
      state.isTracking = true;
    },
    updateSession: (state, action: PayloadAction<Partial<ExerciseSession>>) => {
      if (state.currentSession) {
        state.currentSession = { ...state.currentSession, ...action.payload };
      }
    },
    endSession: (state) => {
      if (state.currentSession) {
        state.currentSession.endTime = new Date().toISOString();
        state.currentSession.duration = Math.round(
          (new Date(state.currentSession.endTime).getTime() - 
           new Date(state.currentSession.startTime).getTime()) / (1000 * 60)
        );
        state.currentSession.steps = state.currentSteps;
        state.currentSession.painLevel = state.currentPainLevel;
        state.currentSession.painLocation = state.currentPainLocation;
      }
      state.isTracking = false;
    },
    updateSteps: (state, action: PayloadAction<number>) => {
      state.currentSteps = action.payload;
    },
    updatePainLevel: (state, action: PayloadAction<number>) => {
      state.currentPainLevel = action.payload;
    },
    updatePainLocation: (state, action: PayloadAction<string>) => {
      state.currentPainLocation = action.payload;
    },
    setDailyStats: (state, action: PayloadAction<DailyStats>) => {
      state.dailyStats = action.payload;
    },
    setWeeklyStats: (state, action: PayloadAction<DailyStats[]>) => {
      state.weeklyStats = action.payload;
    },
    setMonthlyStats: (state, action: PayloadAction<DailyStats[]>) => {
      state.monthlyStats = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetSession: (state) => {
      state.currentSession = null;
      state.isTracking = false;
      state.currentSteps = 0;
      state.currentPainLevel = 0;
      state.currentPainLocation = '';
    },
  },
});

export const {
  startSession,
  updateSession,
  endSession,
  updateSteps,
  updatePainLevel,
  updatePainLocation,
  setDailyStats,
  setWeeklyStats,
  setMonthlyStats,
  setLoading,
  setError,
  resetSession,
} = patientSlice.actions;

export default patientSlice.reducer; 