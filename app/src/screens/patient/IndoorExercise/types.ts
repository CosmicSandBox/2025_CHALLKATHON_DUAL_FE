import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IndoorStackParamList } from '../../../navigation/types';

export type IndoorExerciseScreenNavigationProp = NativeStackNavigationProp<IndoorStackParamList, 'IndoorToday'>;

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  icon: string;
  color: string;
  category: string;
  target: string;
  benefits: string[];
  lastCompleted: string;
  recommended: boolean;
  type: 'essential' | 'optional';
}

export interface TodayStats {
  completed: number;
  total: number;
  time: number;
  streak: number;
  weeklyGoal: number;
}
