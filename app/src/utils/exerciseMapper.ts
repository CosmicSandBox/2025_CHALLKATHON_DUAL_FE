import { Exercise } from '../api/exercise';

// API 데이터를 화면에서 사용하는 형태로 변환하는 유틸리티 함수
export const mapApiExerciseToScreenFormat = (apiExercise: Exercise) => {
  // API 운동 ID를 기존 화면의 ID로 매핑
  const getScreenId = (apiId: number): string => {
    switch (apiId) {
      case 1: return '1'; // 가벼운 걷기
      case 2: return '2'; // 다리 스트레칭
      case 3: return '6'; // 걷기 보조 운동
      case 4: return '3'; // 서서하기 운동
      case 5: return '4'; // 앉아서 다리 운동
      case 6: return '5'; // 균형 운동
      default: return apiId.toString();
    }
  };

  // 운동 타입에 따른 아이콘 및 색상 설정
  const getExerciseConfig = (id: number, name: string) => {
    switch (id) {
      case 1: // 가벼운 걷기
        return {
          icon: '🚶‍♂️',
          color: '#00D4AA',
          category: 'walking',
          target: '걸음 수 측정',
          benefits: ['근력 강화', '균형 감각 향상', '혈액순환 개선']
        };
      case 2: // 다리 스트레칭
        return {
          icon: '🧘‍♀️',
          color: '#3182F6',
          category: 'strength',
          target: '관절 가동범위 측정',
          benefits: ['근육 이완', '관절 유연성', '통증 완화']
        };
      case 3: // 걷기 보조 운동
        return {
          icon: '🦯',
          color: '#6B7280',
          category: 'walking',
          target: '보행 능력 측정',
          benefits: ['보행 개선', '자신감 향상', '안전성']
        };
      case 4: // 서서하기 운동
        return {
          icon: '💪',
          color: '#FF6B35',
          category: 'strength',
          target: '근력 측정',
          benefits: ['근력 강화', '균형 감각', '일상생활 개선']
        };
      case 5: // 앉아서 다리 운동
        return {
          icon: '🪑',
          color: '#8B5CF6',
          category: 'strength',
          target: '근력 측정',
          benefits: ['근력 강화', '안정성', '통증 완화']
        };
      case 6: // 균형 운동
        return {
          icon: '⚖️',
          color: '#F59E0B',
          category: 'balance',
          target: '균형 측정',
          benefits: ['균형 감각', '안정성', '낙상 예방']
        };
      default:
        return {
          icon: '🏃‍♂️',
          color: '#6B7280',
          category: 'strength',
          target: '운동 능력 측정',
          benefits: ['건강 증진', '체력 향상']
        };
    }
  };

  const config = getExerciseConfig(apiExercise.id, apiExercise.name);
  const estimatedCalories = apiExercise.caloriesPerMinute * apiExercise.durationMinutes;

  return {
    id: getScreenId(apiExercise.id),
    name: apiExercise.name,
    description: apiExercise.description,
    duration: `${apiExercise.durationMinutes}분`,
    difficulty: '쉬움', // API에서 제공되지 않으므로 기본값
    icon: config.icon,
    color: config.color,
    category: config.category,
    target: config.target,
    benefits: config.benefits,
    lastCompleted: '미완료', // API에서 완료 시간 정보가 있다면 사용
    recommended: apiExercise.isRequired, // 필수 운동을 추천으로 표시
    type: apiExercise.category === 'REQUIRED' ? 'essential' : 'optional',
    // API 추가 정보
    apiId: apiExercise.id,
    isCompleted: apiExercise.isCompleted,
    isRequired: apiExercise.isRequired,
    caloriesPerMinute: apiExercise.caloriesPerMinute,
    estimatedCalories: estimatedCalories,
  };
};

// API 요약 데이터를 화면 형태로 변환
export const mapApiSummaryToScreenFormat = (apiSummary: any) => {
  return {
    completed: apiSummary.completedExercises || 0,
    total: apiSummary.totalExercises || 6,
    time: 25, // API에서 총 운동 시간이 제공되지 않으므로 계산하거나 기본값 사용
    streak: 5, // 연속 운동 일수는 별도 API가 필요할 수 있음
    weeklyGoal: Math.round(apiSummary.completionRate || 0),
  };
};
