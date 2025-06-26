export type MainStackParamList = {
  MainTabs: undefined;
  PainRecord: undefined;
  ExerciseHistory: undefined;
};

export type ExerciseType = 'indoor' | 'outdoor';
export type IndoorExerciseSubType = 'walking' | 'stretching' | 'balance' | 'sitting' | 'standing' | 'walkingSupport';
export type OutdoorExerciseSubType = 'walking' | 'jogging' | 'cycling';

export interface ExerciseRecord {
  id: string;
  date: string;
  time: string;
  type: ExerciseType;
  subType: IndoorExerciseSubType | OutdoorExerciseSubType;
  name: string;
  duration: number; // 분
  steps?: number;
  distance?: number; // km
  calories?: number;
  avgHeartRate?: number;
  maxHeartRate?: number;
  painBefore?: number; // 1-10
  painAfter?: number; // 1-10
  notes?: string;
  completionRate: number; // 0-100%
  difficulty: 'easy' | 'normal' | 'hard';
}

export interface WeeklyStats {
  totalExercises: number;
  totalDuration: number;
  totalSteps: number;
  totalDistance: number;
  totalCalories: number;
  averagePain: number;
}