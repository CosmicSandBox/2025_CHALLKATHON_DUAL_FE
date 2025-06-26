import { PainHistoryItem, BodyPartInfo, SymptomLevelInfo } from './types';

export const bodyParts: BodyPartInfo[] = [
  { id: 'leg', name: '다리', icon: '🦵', description: '허벅지, 종아리 근육' },
  { id: 'knee', name: '무릎', icon: '🦴', description: '무릎 관절 및 주변' },
  { id: 'ankle', name: '발목', icon: '🦶', description: '발목 관절 및 인대' },
  { id: 'heel', name: '뒷꿈치', icon: '👠', description: '뒷꿈치 및 발바닥' },
  { id: 'back', name: '허리', icon: '🏃‍♂️', description: '허리 및 등 부위' },
];

export const symptomLevels: SymptomLevelInfo[] = [
  { id: 'good', name: '양호', color: '#10B981', bgColor: '#E8F5E8', description: '통증이나 불편함이 없음' },
  { id: 'mild', name: '경미', color: '#F59E0B', bgColor: '#FEF7E6', description: '약간의 불편함 있음' },
  { id: 'moderate', name: '보통', color: '#F97316', bgColor: '#FFF7ED', description: '중간 정도의 통증' },
  { id: 'severe', name: '심함', color: '#EF4444', bgColor: '#FEE2E2', description: '심한 통증이나 불편함' },
];

export const mockPainHistory: PainHistoryItem[] = [
  {
    id: '1',
    date: '2024-01-15',
    time: '09:30',
    overallPain: 3,
    symptoms: { knee: 'moderate', back: 'mild', leg: 'good', ankle: 'good', heel: 'good' },
    notes: '실내 운동 후 무릎이 조금 뻣뻣함',
    isPostExercise: true,
  },
  {
    id: '2',
    date: '2024-01-14',
    time: '20:15',
    overallPain: 2,
    symptoms: { back: 'mild', knee: 'mild', leg: 'good', ankle: 'good', heel: 'good' },
    notes: '전반적으로 컨디션 양호',
    isPostExercise: false,
  },
];