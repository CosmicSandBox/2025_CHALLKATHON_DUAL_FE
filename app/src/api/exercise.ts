import { get, post } from './client';

// 운동 타입 정의
export interface Exercise {
  id: number;
  name: string;
  description: string;
  category: 'REQUIRED' | 'RECOMMENDED';
  categoryDisplayName: string;
  type: 'INDOOR' | 'OUTDOOR';
  typeDisplayName: string;
  durationMinutes: number;
  caloriesPerMinute: number;
  isRequired: boolean;
  isCompleted: boolean;
}

export interface ExerciseListResponse {
  requiredExercises: Exercise[];
  recommendedExercises: Exercise[];
  summary: {
    totalExercises: number;
    completedExercises: number;
    completedRequiredExercises: number;
    totalRequiredExercises: number;
    completionRate: number;
  };
}

export interface ExerciseRecordRequest {
  exerciseId: number;
  durationMinutes: number;
  steps?: number;
  distanceKm?: number;
  notes?: string;
}

// 운동 기록 데이터 타입
export interface ExerciseRecord {
  recordId: string;
  exerciseId: number;
  exerciseName: string;
  exerciseDate: string;
  durationMinutes: number;
  caloriesBurned: number;
  steps: number;
  distanceKm: number;
  completionStatus: 'COMPLETED' | 'IN_PROGRESS' | 'FAILED';
  notes: string;
  createdAt: string;
}

export interface ExerciseRecordsResponse {
  data: ExerciseRecord[];
  message: string;
  status: string;
  action: string;
}

// 실내 운동 목록 조회
export const getIndoorExercises = async () => {
  return get<ExerciseListResponse>('/api/v1/exercise/indoor');
};

// 운동 기록 저장
export const saveExerciseRecord = async (data: ExerciseRecordRequest) => {
  return post('/api/v1/exercise/record', data);
};

// 운동 기록 조회 (기간별)
export const getExerciseRecords = async (startDate?: string, endDate?: string) => {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  const queryString = params.toString();
  const endpoint = queryString ? `/api/v1/exercise/records?${queryString}` : '/api/v1/exercise/records';
  
  return get<ExerciseRecordsResponse>(endpoint);
};
