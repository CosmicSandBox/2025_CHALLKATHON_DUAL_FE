export interface BalanceMeasurementState {
  started: boolean;
  currentSet: number;
  currentFoot: 'left' | 'right';
  isHolding: boolean;
  holdTimer: number;
  isResting: boolean;
  restTimer: number;
}

export interface BalanceExerciseStep {
  id: number;
  description: string;
}

export interface BalanceConfig {
  totalSets: number;
  holdTime: number;
  restTimeShort: number;
  restTimeLong: number;
  estimatedDuration: string;
}

export interface ExerciseBenefit {
  icon: string;
  text: string;
}

export interface SafetyCaution {
  icon: string;
  text: string;
}
