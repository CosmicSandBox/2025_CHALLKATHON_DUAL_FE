import { get, post } from './client';

export interface HealthRecordRequest {
  chestPainScore: number; // 1-3점
  backPainScore: number; // 1-3점
  waistPainScore: number; // 1-3점
  neckPainScore: number; // 1-3점
  legPainScore: number; // 1-3점
  overallCondition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
  notes?: string;
}

export interface HealthRecord {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  recordId: string;
  user: {
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    uid: string;
    username: string;
    email: string;
    provider: string;
    role: string;
    nickname: string;
    profileImage: string;
    isDeleted: boolean;
    info: {
      uid: string;
      username: string;
      nickname: string;
    };
  };
  recordDate: string;
  chestPainScore: number;
  backPainScore: number;
  waistPainScore: number;
  neckPainScore: number;
  legPainScore: number;
  overallCondition: string;
  notes: string;
}

export interface HealthRecordsResponse {
  data: HealthRecord[];
  message: string;
  status: string;
  action: string;
}

// 건강 기록 저장
export const saveHealthRecord = async (data: HealthRecordRequest) => {
  return post('/api/v1/health/record', data);
};

// 최근 건강 기록 조회
export const getRecentHealthRecords = async () => {
  return get<HealthRecordsResponse>('/api/v1/health/records/recent');
};
