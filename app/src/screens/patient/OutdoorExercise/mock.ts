import { TodayStats, WeatherInfo } from './types';

export const todayStats: TodayStats = {
  completed: 1,
  total: 3,
  distance: 2.5,
  time: 35,
};

export const weatherInfo: WeatherInfo = {
  temperature: 22,
  condition: '맑음',
  humidity: 65,
  windSpeed: 3,
};

export const safetyTips = [
  {
    icon: '🚶‍♂️',
    text: '보행자 도로를 이용하세요',
  },
  {
    icon: '👕',
    text: '밝은 색의 옷을 입으세요',
  },
  {
    icon: '💧',
    text: '충분한 수분을 섭취하세요',
  },
  {
    icon: '📱',
    text: '긴급 연락처를 준비하세요',
  },
];
