import { CaregiverInfo, Patient, UrgentAlert, QuickAction } from './types';

export const mockCaregiverInfo: CaregiverInfo = {
  name: '김보호',
  role: '전문 보호자',
};

export const mockPatient: Patient = {
  id: '1',
  name: '홍길동',
  age: 65,
  condition: '뇌졸중 후유증',
  status: '온라인',
  lastUpdate: '10분 전',
  todaySteps: 3247,
  todayExercise: 45,
  painLevel: 3,
  mood: '좋음',
  needsAttention: false,
  phone: '010-1234-5678',
  emergencyContact: '010-9876-5432',
  progress: 75,
  assignedDate: '2024-01-15',
};

export const mockUrgentAlerts: UrgentAlert[] = [
  {
    id: '1',
    type: '통증 증가',
    message: '통증 수준이 7/10으로 증가',
    time: '5분 전',
    priority: 'high',
  },
  {
    id: '2',
    type: '운동 중단',
    message: '실외 운동이 예상보다 일찍 종료',
    time: '15분 전',
    priority: 'medium',
  },
];

export const mockQuickActions: QuickAction[] = [
  {
    id: '1',
    icon: '📊',
    title: '상세 리포트',
    subtitle: '환자 상세 통계',
  },
  {
    id: '2',
    icon: '👨‍⚕️',
    title: '의료진 연락',
    subtitle: '담당 의사 상담',
  },
  {
    id: '3',
    icon: '📝',
    title: '환자 정보',
    subtitle: '환자 정보 수정',
  },
  {
    id: '4',
    icon: '🔔',
    title: '알림 설정',
    subtitle: '긴급 상황 알림',
  },
];
