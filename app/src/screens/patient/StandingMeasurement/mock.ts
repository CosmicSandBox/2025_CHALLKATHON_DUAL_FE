import { ExerciseStep, ExerciseBenefit, ExerciseCaution, StandingMeasurementConfig } from './types';

export const EXERCISE_CONFIG: StandingMeasurementConfig = {
  totalSets: 3,
  repsPerSet: 8,
  restDuration: 60,
  estimatedDuration: '~10분',
};

export const EXERCISE_STEPS: ExerciseStep[] = [
  {
    id: 1,
    description: '의자에 앉아 양발을 어깨너비로 벌리고 발을 바닥에 평평하게 둡니다',
  },
  {
    id: 2,
    description: '팔을 앞으로 뻗거나 가슴 앞에서 교차시킵니다',
  },
  {
    id: 3,
    description: '상체를 약간 앞으로 기울이며 천천히 일어섭니다',
  },
  {
    id: 4,
    description: '완전히 선 상태에서 잠시 멈춘 후 천천히 앉습니다',
  },
];

export const EXERCISE_BENEFITS: ExerciseBenefit[] = [
  { icon: '✓', text: '하체 근력 강화' },
  { icon: '✓', text: '일상 동작 개선' },
  { icon: '✓', text: '균형감각 향상' },
  { icon: '✓', text: '낙상 예방' },
];

export const EXERCISE_CAUTIONS: ExerciseCaution[] = [
  { icon: '⚠️', text: '무릎 통증 시 중단' },
  { icon: '⚠️', text: '천천히 움직이기' },
  { icon: '⚠️', text: '안정적인 의자 사용' },
];

export const EXERCISE_INFO = {
  title: '서서하기 운동',
  subtitle: '하체 근력 강화와 기능적 움직임',
  description: '의자에서 일어서고 앉기를 반복하여 하체 근력을 강화하는 기능적 운동',
  emoji: '💪',
};

export const PHASE_CONFIG = {
  sitting: {
    emoji: '🪑',
    text: '앉은 자세',
    action: '일어서기',
    instruction: '팔을 앞으로 뻗고 천천히 일어서세요',
  },
  standing: {
    emoji: '🧍‍♂️',
    text: '선 자세',
    action: '앉기',
    instruction: '천천히 앉으면서 1회를 완료하세요',
  },
};
