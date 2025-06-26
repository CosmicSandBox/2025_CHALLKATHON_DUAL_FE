import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../../navigation/types';

// 탭 네비게이션을 위한 타입 정의
export type TabNavigationProp = BottomTabNavigationProp<MainTabParamList>;

// Stack과 Tab을 함께 사용하기 위한 복합 타입
export type DashboardScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<{ PainRecord: undefined; ExerciseHistory: undefined }>,
  TabNavigationProp
>;

export interface TodayStats {
  steps: number;
  exerciseTime: number;
  averagePain: number;
  distance: number;
}

export interface WeeklyDataItem {
  day: string;
  steps: number;
  pain: number;
}
