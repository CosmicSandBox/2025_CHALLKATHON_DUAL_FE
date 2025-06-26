import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IndoorStackParamList } from '../../../navigation/types';

export type HealthCheckScreenNavigationProp = NativeStackNavigationProp<IndoorStackParamList, 'HealthCheck'>;

export interface HealthCheckParams {
  exerciseName: string;
  exerciseType: string;
}

export type SymptomLevel = 'good' | 'mild' | 'moderate' | 'severe';
export type BodyPart = 'leg' | 'knee' | 'ankle' | 'heel' | 'back';

export interface SymptomState {
  [key: string]: SymptomLevel | null;
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
  icon: string;
  description: string;
}

export interface HealthCheckData {
  exerciseName?: string;
  exerciseType?: string;
  symptoms: SymptomState;
  detailNotes: string;
  timestamp: string;
}

export interface ExerciseRecord {
  id: string;
  date: string;
  time: string;
  type: 'indoor';
  subType: string;
  name: string;
  duration: number;
  painAfter: number;
  notes: string;
  completionRate: number;
  difficulty: 'normal';
}
