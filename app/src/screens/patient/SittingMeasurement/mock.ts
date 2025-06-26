import { SittingExerciseStep, SittingConfig, ExerciseBenefit, SafetyCaution } from './types';

export const SITTING_CONFIG: SittingConfig = {
  totalSets: 3,
  repsPerSet: 10,
  holdTime: 3, // 초
  restTimeShort: 15, // 좌우 다리 교체 시 휴식
  restTimeLong: 30, // 세트 간 휴식
  estimatedDuration: '~12분',
};

export const SITTING_STEPS: SittingExerciseStep[] = [
  {
    id: 1,
    description: '의자에 바르게 앉아 등을 등받이에 댑니다',
  },
  {
    id: 2,
    description: '한쪽 다리를 천천히 곧게 펴서 수평이 되도록 들어올립니다',
  },
  {
    id: 3,
    description: '3초간 자세를 유지하며 허벅지 근육에 힘을 줍니다',
  },
  {
    id: 4,
    description: '천천히 다리를 내려 원래 자세로 돌아옵니다',
  },
];

export const EXERCISE_BENEFITS: ExerciseBenefit[] = [
  { icon: '✓', text: '허벅지 근력 강화' },
  { icon: '✓', text: '무릎 안정성 향상' },
  { icon: '✓', text: '보행 능력 개선' },
  { icon: '✓', text: '일상 동작 향상' },
];

export const SAFETY_CAUTIONS: SafetyCaution[] = [
  { icon: '⚠️', text: '무릎 통증 시 중단' },
  { icon: '⚠️', text: '허리 곧게 유지' },
  { icon: '⚠️', text: '천천히 움직이기' },
];

export const EXERCISE_INFO = {
  title: '앉아서 다리 운동',
  subtitle: '무릎 신전근 강화와 안정성',
  description: '의자에 앉아 무릎을 펴는 동작으로 허벅지 앞쪽 근육을 강화하는 운동',
  emoji: '🪑',
};

export const LEG_CONFIG = {
  left: {
    name: '왼쪽',
    emoji: '🦵',
    color: '#8B5CF6',
  },
  right: {
    name: '오른쪽',
    emoji: '🦵',
    color: '#06B6D4',
  },
};
