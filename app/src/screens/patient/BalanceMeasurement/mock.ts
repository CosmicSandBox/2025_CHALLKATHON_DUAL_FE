import { BalanceExerciseStep, BalanceConfig, ExerciseBenefit, SafetyCaution } from './types';

export const BALANCE_CONFIG: BalanceConfig = {
  totalSets: 3,
  holdTime: 15, // 초
  restTimeShort: 10, // 좌우 발 교체 시 휴식
  restTimeLong: 30, // 세트 간 휴식
  estimatedDuration: '~8분',
};

export const BALANCE_STEPS: BalanceExerciseStep[] = [
  {
    id: 1,
    description: '벽이나 안정적인 물체 근처에 서서 준비합니다',
  },
  {
    id: 2,
    description: '두 발을 모으고 똑바로 선 자세를 취합니다',
  },
  {
    id: 3,
    description: '한쪽 발을 바닥에서 들어올려 균형을 잡습니다',
  },
  {
    id: 4,
    description: '15초간 자세를 유지한 후 반대쪽 발로 반복합니다',
  },
];

export const EXERCISE_BENEFITS: ExerciseBenefit[] = [
  { icon: '✓', text: '균형감각 향상' },
  { icon: '✓', text: '낙상 예방' },
  { icon: '✓', text: '하체 안정성' },
  { icon: '✓', text: '자신감 향상' },
];

export const SAFETY_CAUTIONS: SafetyCaution[] = [
  { icon: '⚠️', text: '벽 근처에서 실시' },
  { icon: '⚠️', text: '어지러움 시 중단' },
  { icon: '⚠️', text: '보호자와 함께' },
];

export const EXERCISE_INFO = {
  title: '균형 운동',
  subtitle: '균형감각과 안정성 향상',
  description: '한 발로 서서 균형감각을 기르고 낙상을 예방하는 운동',
  emoji: '⚖️',
};

export const FOOT_CONFIG = {
  left: {
    name: '왼발',
    emoji: '🦵',
    color: '#3182F6',
  },
  right: {
    name: '오른발',
    emoji: '🦶',
    color: '#F59E0B',
  },
};
