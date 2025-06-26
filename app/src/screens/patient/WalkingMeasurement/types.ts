import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStateStatus } from 'react-native';
import { IndoorStackParamList } from '../../../navigation/types';

export type WalkingMeasurementScreenNavigationProp = NativeStackNavigationProp<IndoorStackParamList, 'WalkingMeasurement'>;

export interface WalkingStats {
  steps: number;
  elapsedTime: number;
  distance: number;
  calories: number;
  pace: number;
}

export interface PedometerResult {
  steps: number;
}

export interface WalkingState {
  isWalking: boolean;
  isPedometerAvailable: boolean | null;
  pedometerError: string | null;
  startTimestamp: number | null;
}

export interface InstructionStep {
  number: number;
  text: string;
}
