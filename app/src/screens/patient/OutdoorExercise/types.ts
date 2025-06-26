import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import * as Location from 'expo-location';

export type OutdoorExerciseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export interface TodayStats {
  completed: number;
  total: number;
  distance: number;
  time: number;
}

export interface WeatherInfo {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export interface GameState {
  userPosition: { lat: number; lng: number } | null;
  currentDistance: number;
  totalDistance: number;
  checkpointCount: number;
  checkpointRadius: number;
  maxDistance: number;
  isTracking: boolean;
}

export interface WebViewMessage {
  type: 'map_ready' | 'dom_ready' | 'map_initialized' | 'location_update' | 'checkpoint_reached' | 'location_error' | 'error';
  distance?: number;
  progress?: number;
  checkpoints?: number;
  error?: string;
  message?: string;
  success?: boolean;
}

export interface LocationSubscription extends Location.LocationSubscription {}
