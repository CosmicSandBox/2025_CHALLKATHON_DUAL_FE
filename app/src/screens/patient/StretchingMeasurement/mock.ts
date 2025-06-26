import { ExerciseStep, BenefitItem, CautionItem, ExerciseConstants } from './types';

export const exerciseConstants: ExerciseConstants = {
  totalSets: 3,
  holdTime: 10, // 초
  restTime: 15, // 초
  shortRestTime: 5, // 초
};

export const exerciseSteps: ExerciseStep[] = [
  { text: '벽을 마주보고 서서 두 손을 벽에 댑니다' },
  { text: '한쪽 다리를 뒤로 뻗고 발뒤꿈치를 바닥에 붙입니다' },
  { text: '10초간 자세를 유지하며 종아리 근육을 늘려줍니다' },
  { text: '천천히 원래 자세로 돌아와 반대쪽도 실시합니다' },
];

export const benefits: BenefitItem[] = [
  { text: '근육 이완' },
  { text: '혈액순환 개선' },
  { text: '관절 유연성' },
  { text: '통증 완화' },
];

export const cautions: CautionItem[] = [
  { text: '무리하게 당기지 마세요' },
  { text: '통증 시 즉시 중단' },
  { text: '천천히 호흡하며 실시' },
];
