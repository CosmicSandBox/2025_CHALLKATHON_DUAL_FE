export interface SittingMeasurementState {
  started: boolean;
  currentSet: number;
  currentRep: number;
  currentLeg: 'left' | 'right';
  isHolding: boolean;
  holdTimer: number;
  isResting: boolean;
  restTimer: number;
}

export interface SittingExerciseStep {
  id: number;
  description: string;
}

export interface SittingConfig {
  totalSets: number;
  repsPerSet: number;
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
