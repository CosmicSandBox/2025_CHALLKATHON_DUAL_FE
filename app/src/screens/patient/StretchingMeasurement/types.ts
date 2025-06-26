import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IndoorStackParamList } from '../../../navigation/types';

export type StretchingMeasurementScreenNavigationProp = NativeStackNavigationProp<IndoorStackParamList, 'StretchingMeasurement'>;

export type SideType = 'left' | 'right';

export interface ExerciseState {
  started: boolean;
  currentSet: number;
  currentSide: SideType;
  isHolding: boolean;
  holdTimer: number;
  isResting: boolean;
  restTimer: number;
}

export interface ExerciseStep {
  text: string;
}

export interface BenefitItem {
  text: string;
}

export interface CautionItem {
  text: string;
}

export interface ExerciseConstants {
  totalSets: number;
  holdTime: number;
  restTime: number;
  shortRestTime: number;
}
