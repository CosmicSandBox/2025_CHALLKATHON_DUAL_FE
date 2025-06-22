import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  RoleSelection: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  IndoorExercise: undefined;
  OutdoorExercise: undefined;
  Settings: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ResetPassword: undefined;
};

export type OnboardingStackParamList = {
  Permission: undefined;
  InviteCode: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Indoor: NavigatorScreenParams<IndoorStackParamList>;
  Outdoor: NavigatorScreenParams<OutdoorStackParamList>;
  Caregiver: NavigatorScreenParams<CaregiverStackParamList>;
  Settings: undefined;
};

export type IndoorStackParamList = {
  IndoorToday: undefined;
  IndoorHistoryList: undefined;
  IndoorHistoryDetail: { date: string };
};

export type OutdoorStackParamList = {
  OutdoorToday: undefined;
  OutdoorHistoryList: undefined;
  OutdoorHistoryDetail: { date: string };
};

export type CaregiverStackParamList = {
  CaregiverIndoorDashboard: undefined;
  CaregiverIndoorHistory: undefined;
  CaregiverOutdoorLive: undefined;
  CaregiverOutdoorHistory: undefined;
}; 