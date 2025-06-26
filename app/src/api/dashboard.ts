import { get } from './client';

export interface TodaySummary {
  totalSteps: number;
  totalMinutes: number;
  totalCalories: number;
  completedRequiredExercises: number;
  totalRequiredExercises: number;
  completionRate: number;
}

export interface DailyProgress {
  date: string;
  dayOfWeek: string;
  steps: number;
  minutes: number;
  calories: number;
  completedExercises: number;
}

export interface WeeklyProgress {
  totalWeeklySteps: number;
  dailyProgress: DailyProgress[];
}

export interface RecentActivity {
  exerciseName: string;
  durationMinutes: number;
  timeAgo: string;
  status: string;
}

export interface PatientDashboard {
  todaySummary: TodaySummary;
  weeklyProgress: WeeklyProgress;
  recentActivities: RecentActivity[];
}

export interface PatientDashboardResponse {
  data: PatientDashboard;
  message: string;
  status: string;
  action: string;
}

// 환자 대시보드 데이터 조회
export const getPatientDashboard = async () => {
  return get<PatientDashboardResponse>('/api/v1/dashboard/patient');
};
