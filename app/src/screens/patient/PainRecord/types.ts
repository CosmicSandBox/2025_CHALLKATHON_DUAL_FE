export type MainStackParamList = {
  MainTabs: undefined;
  PainRecord: undefined;
  ExerciseHistory: undefined;
};

export type SymptomLevel = 'good' | 'mild' | 'moderate' | 'severe';
export type BodyPart = 'leg' | 'knee' | 'ankle' | 'heel' | 'back';

export interface SymptomState {
  [key: string]: SymptomLevel | null;
}

export interface PainHistoryItem {
  id: string;
  date: string;
  time: string;
  overallPain: number;
  symptoms: SymptomState;
  notes?: string;
  isPostExercise: boolean;
}

export interface BodyPartInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface SymptomLevelInfo {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  description: string;
}