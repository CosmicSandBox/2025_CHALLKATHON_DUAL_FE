import { WalkingSupportStep, WalkingSupportConfig, SafetyTip } from './types';

export const WALKING_SUPPORT_CONFIG: WalkingSupportConfig = {
  targetDistance: 10, // 미터
  stepCount: 4,
  estimatedDuration: '~15분',
};

export const WALKING_SUPPORT_STEPS: WalkingSupportStep[] = [
  {
    id: 1,
    title: '보행보조기구 준비',
    description: '보행보조기구를 양손으로 잡고 올바른 높이로 조정하세요',
    emoji: '🦯',
  },
  {
    id: 2,
    title: '안전한 자세 확인',
    description: '등을 곧게 펴고 보행보조기구를 몸에 가까이 두세요',
    emoji: '🧍‍♂️',
  },
  {
    id: 3,
    title: '천천히 보행 시작',
    description: '한 발씩 천천히 내딛으며 균형을 유지하세요',
    emoji: '👣',
  },
  {
    id: 4,
    title: '목표 거리 완주',
    description: '10m 이동을 목표로 안전하게 보행을 완료하세요',
    emoji: '🎯',
  },
];

export const SAFETY_TIPS: SafetyTip[] = [
  { icon: '⚠️', text: '반드시 보호자와 함께 진행' },
  { icon: '⚠️', text: '미끄럽지 않은 신발 착용' },
  { icon: '⚠️', text: '장애물 없는 평평한 바닥' },
  { icon: '⚠️', text: '무리하지 말고 휴식 취하기' },
];

export const EXERCISE_BENEFITS: string[] = [
  '보행 안정성 향상',
  '하지 근력 강화',
  '균형감각 개선',
  '일상생활 독립성 증진',
];

export const EXERCISE_INFO = {
  title: '보행보조 운동',
  subtitle: '안전한 보행을 위한 보조기구 사용법 연습',
  description: '보행보조기구(지팡이, 워커 등) 사용법과 안전한 보행을 연습합니다.',
  emoji: '🚶‍♂️',
};
