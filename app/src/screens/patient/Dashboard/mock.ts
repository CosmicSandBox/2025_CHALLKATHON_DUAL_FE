import { TodayStats, WeeklyDataItem } from './types';

export const mockTodayStats: TodayStats = {
  steps: 3247,
  exerciseTime: 45,
  averagePain: 3,
  distance: 2.1,
};

export const mockWeeklyData: WeeklyDataItem[] = [
  { day: '월', steps: 2800, pain: 2 },
  { day: '화', steps: 3200, pain: 3 },
  { day: '수', steps: 2900, pain: 2 },
  { day: '목', steps: 3500, pain: 4 },
  { day: '금', steps: 3100, pain: 3 },
  { day: '토', steps: 3800, pain: 2 },
  { day: '일', steps: 3247, pain: 3 },
];
