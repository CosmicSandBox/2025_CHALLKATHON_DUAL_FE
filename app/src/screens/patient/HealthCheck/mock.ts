import { BodyPartInfo, SymptomLevelInfo } from './types';

export const bodyParts: BodyPartInfo[] = [
  { id: 'leg', name: '다리', icon: '🦵', description: '허벅지, 종아리 근육' },
  { id: 'knee', name: '무릎', icon: '🦴', description: '무릎 관절 및 주변' },
  { id: 'ankle', name: '발목', icon: '🦶', description: '발목 관절 및 인대' },
  { id: 'heel', name: '뒷꿈치', icon: '👠', description: '뒷꿈치 및 발바닥' },
  { id: 'back', name: '허리', icon: '🏃‍♂️', description: '허리 및 등 부위' },
];

export const symptomLevels: SymptomLevelInfo[] = [
  { 
    id: 'good', 
    name: '양호', 
    color: '#10B981', 
    bgColor: '#E8F5E8',
    icon: '●',
    description: '통증이나 불편함이 없음'
  },
  { 
    id: 'mild', 
    name: '경미', 
    color: '#F59E0B', 
    bgColor: '#FEF7E6',
    icon: '●',
    description: '약간의 불편함 있음'
  },
  { 
    id: 'moderate', 
    name: '보통', 
    color: '#F97316', 
    bgColor: '#FFF7ED',
    icon: '●',
    description: '중간 정도의 통증'
  },
  { 
    id: 'severe', 
    name: '심함', 
    color: '#EF4444', 
    bgColor: '#FEE2E2',
    icon: '●',
    description: '심한 통증이나 불편함'
  },
];
