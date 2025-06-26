export interface WalkingSupportMeasurementState {
  started: boolean;
  currentStep: number;
  distance: number;
  isCompleted: boolean;
}

export interface WalkingSupportStep {
  id: number;
  title: string;
  description: string;
  emoji: string;
}

export interface WalkingSupportConfig {
  targetDistance: number;
  stepCount: number;
  estimatedDuration: string;
}

export interface SafetyTip {
  icon: string;
  text: string;
}
