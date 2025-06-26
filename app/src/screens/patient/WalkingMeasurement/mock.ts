import { InstructionStep } from './types';

export const instructionSteps: InstructionStep[] = [
  {
    number: 1,
    text: '편안한 자세로 서서 준비합니다'
  },
  {
    number: 2,
    text: '천천히 한 걸음씩 내딛습니다'
  },
  {
    number: 3,
    text: '무리하지 말고 본인의 페이스를 유지합니다'
  },
  {
    number: 4,
    text: '통증이나 불편함이 있으면 즉시 중단합니다'
  },
];

export const walkingConstants = {
  averageStepLength: 0.7, // 평균 보폭 70cm
  caloriesPerStep: 0.045, // 걸음당 약 0.045kcal (65kg 기준)
  averageWeight: 65, // 평균 체중 65kg
  simulationInterval: 1500, // 시뮬레이터용 더미 데이터 간격 (ms)
  minStepsPerInterval: 1, // 시뮬레이션 시 최소 걸음 수
  maxStepsPerInterval: 3, // 시뮬레이션 시 최대 걸음 수
};
