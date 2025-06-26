export interface StandingMeasurementState {
  started: boolean;
  currentSet: number;
  currentRep: number;
  isResting: boolean;
  restTimer: number;
  currentPhase: 'sitting' | 'standing';
}

export interface ExerciseStep {
  id: number;
  description: string;
}

export interface StandingMeasurementConfig {
  totalSets: number;
  repsPerSet: number;
  restDuration: number;
  estimatedDuration: string;
}

export interface ExerciseBenefit {
  icon: string;
  text: string;
}

export interface ExerciseCaution {
  icon: string;
  text: string;
}
