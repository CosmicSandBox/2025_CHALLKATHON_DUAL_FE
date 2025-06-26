// API 기본 설정
export const API_BASE_URL = 'https://api.walkmate.klr.kr';

export const API_ENDPOINTS = {
  // 인증 API
  AUTH: {
    OAUTH_CALLBACK: '/api/v1/auth/oauth/callback',
    OAUTH_URL: '/api/v1/auth/oauth/{provider}/url',
    OAUTH_PROVIDERS: '/api/v1/auth/oauth/providers',
  },
  
  // 사용자 관리 API
  USER: {
    INFO: '/api/user/info',
    PROFILE_STATUS: '/api/user/profile-status',
    PATIENT_PROFILE: '/api/user/patient-profile',
    PATIENT_INFO: '/api/user/patient-info',
    PATIENT_LINK_CODE: '/api/user/patient/link-code',
    DELETE: '/api/user',
  },
  
  // 대시보드 API
  DASHBOARD: {
    PATIENT: '/api/dashboard/patient',
  },
  
  // 운동 관리 API
  EXERCISE: {
    LIST: '/api/exercise/list',
    INDOOR_STATUS: '/api/exercise/indoor/status',
    OUTDOOR_STATUS: '/api/exercise/outdoor/status',
    RECORD_WALKING: '/api/exercise/record/walking',
    RECORD_SIMPLE: '/api/exercise/record/simple',
    HISTORY: '/api/exercise/history',
  },
  
  // 건강 기록 API
  HEALTH: {
    PAIN_RECORD: '/api/health/pain/record',
    PAIN_RECORD_AFTER_EXERCISE: '/api/health/pain/record/after-exercise',
    PAIN_HISTORY: '/api/health/pain/history',
  },
  
  // 보호자 API
  GUARDIAN: {
    LINK_PATIENT: '/api/guardian/link-patient',
    DASHBOARD: '/api/guardian/dashboard',
    PATIENT_DETAIL: '/api/guardian/patient-detail',
    NOTIFICATIONS: '/api/guardian/notifications',
    ALERT_READ: '/api/guardian/alert/{alertId}/read',
  },
} as const;

// API 응답 타입 정의
export interface ApiResponse<T> {
  status: 'SUCCESS' | 'ERROR';
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// 기본 사용자 정보 타입
export interface User {
  uid: string;
  username: string;
  nickname: string;
  email: string;
  profileImage: string;
}

// 환자 프로필 타입
export interface PatientProfile {
  age: number;
  disease: string;
  phoneNumber: string;
  emergencyContact: string;
}

// 보호자 프로필 타입
export interface GuardianProfile {
  guardianName: string;
}

// 사용자 프로필 상태 타입
export interface UserProfileStatus {
  isPatientProfileComplete: boolean;
  isGuardianProfileComplete: boolean;
  patientProfile?: PatientProfile;
  guardianProfile?: GuardianProfile;
}

// OAuth 관련 타입들
export interface KakaoAuthUrlResponse {
  authUrl: string;
  provider: string;
}

export interface OAuthCallbackRequest {
  provider: string;
  code: string;
}

export interface OAuthCallbackResponse {
  token: string;
  message: string;
}

export interface OAuthProvidersResponse {
  providers: string[];
  message: string;
}

// 환자 연동 코드 관련 타입
export interface PatientLinkCodeResponse {
  linkCode: string;
  expiresAt: string;
  message: string;
}

// 사용자 수정 관련 타입들
export interface UpdateUserInfoRequest {
  nickname?: string;
  profileImage?: string;
}

export interface UpdatePatientInfoRequest {
  age?: number;
  disease?: string;
  phoneNumber?: string;
  emergencyContact?: string;
}

// 대시보드 관련 타입들
export interface TodaySummary {
  name: string;
  steps: number;
  exerciseMinutes: number;
  distanceKm: number;
  todayPainLevel: number;
}

export interface DailyStepsData {
  dayOfWeek: string;
  dayName: string;
  steps: number;
}

export interface WeeklySteps {
  dailySteps: DailyStepsData[];
  totalSteps: number;
}

export interface PatientDashboard {
  todaySummary: TodaySummary;
  weeklySteps: WeeklySteps;
}

// 운동 관련 타입들
export interface Exercise {
  id: number;
  name: string;
  description: string;
  category: string;
  categoryDisplayName: string;
  type: string;
  typeDisplayName: string;
  durationMinutes: number;
  caloriesPerMinute: number;
  isRequired: boolean;
  isCompleted: boolean;
}

export interface ExerciseStatus {
  exerciseId: number;
  name: string;
  description: string;
  isCompleted: boolean;
  isRequired: boolean;
  orderIndex: number;
}

export interface TodayProgress {
  completedRequiredExercises: number;
  totalExerciseMinutes: number;
  requiredExerciseCompletionRate: number;
}

export interface IndoorExerciseStatus {
  todayProgress: TodayProgress;
  requiredExercises: ExerciseStatus[];
  recommendedExercises: ExerciseStatus[];
}

export interface OutdoorExerciseStatus {
  maxDistanceRecord: number;
  yesterdayRecord: {
    durationMinutes: number;
    distanceKm: number;
  };
}

// 운동 기록 관련 타입들
export interface WalkingExerciseRecord {
  exerciseId: number;
  durationMinutes: number;
  steps: number;
  distanceKm: number;
  caloriesBurned: number;
  notes?: string;
}

export interface SimpleExerciseRecord {
  exerciseId: number;
  durationMinutes: number;
  notes?: string;
}

export interface ExerciseHistoryRecord {
  recordId: string;
  exerciseType: string;
  exerciseDate: string;
  startTime: string;
  exerciseName: string;
  durationMinutes: number;
  steps?: number;
  distanceKm?: number;
  caloriesBurned?: number;
}

export interface ExerciseHistoryStatistics {
  totalExerciseCount: number;
  totalExerciseMinutes: number;
  totalSteps: number;
  totalDistanceKm: number;
  totalCaloriesBurned: number;
}

export interface ExerciseHistory {
  statistics: ExerciseHistoryStatistics;
  exerciseRecords: ExerciseHistoryRecord[];
}

export interface ExerciseHistoryParams {
  exerciseType?: 'INDOOR' | 'OUTDOOR';
  startDate?: string;
  endDate?: string;
}

// 건강 기록 관련 타입들
export interface PainScores {
  legPainScore: number;
  kneePainScore: number;
  anklePainScore: number;
  heelPainScore: number;
  backPainScore: number;
}

export interface PainRecord extends PainScores {
  notes?: string;
}

export interface PainHistoryRecord {
  recordId: string;
  recordDate: string;
  recordTime: string;
  recordType: 'MANUAL' | 'POST_EXERCISE';
  totalPainScore: number;
  notes?: string;
  painScores: PainScores;
}

export interface PainHistory {
  painRecords: PainHistoryRecord[];
}

export interface PainHistoryParams {
  startDate?: string;
  endDate?: string;
}

// 보호자 관련 타입들
export interface LinkPatientRequest {
  patientLinkCode: string;
}

export interface GuardianPatientInfo {
  patientName: string;
  patientAge: number;
  disease: string;
  phoneNumber: string;
  emergencyContact: string;
}

export interface GuardianTodayStatus {
  steps: number;
  exerciseMinutes: number;
  painLevel: string;
}

export interface EmergencyAlert {
  alertId: string;
  alertType: string;
  message: string;
  timeSince: string;
  previousPainLevel: number;
  currentPainLevel: number;
  patientPhoneNumber: string;
}

export interface GuardianDashboard {
  guardianProfile: {
    guardianName: string;
  };
  patientInfo: GuardianPatientInfo;
  todayStatus: GuardianTodayStatus;
  emergencyAlerts: EmergencyAlert[];
}

export interface GuardianPatientDetail {
  patientInfo: {
    patientName: string;
    patientAge: number;
    disease: string;
  };
  contactInfo: {
    phoneNumber: string;
    emergencyContact: string;
  };
  weeklyProgress: WeeklySteps;
}

// 알림 관련 타입
export interface GuardianNotification {
  alertId: string;
  type: 'urgent' | 'warning' | 'info';
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface GuardianNotificationList {
  notifications: GuardianNotification[];
}


