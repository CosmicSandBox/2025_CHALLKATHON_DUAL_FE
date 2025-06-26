import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  OnboardingNavigator: NavigatorScreenParams<OnboardingStackParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Caregiver: NavigatorScreenParams<CaregiverStackParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  LoginForm: undefined;
  Signup: undefined;
  ResetPassword: undefined;
};

export type OnboardingStackParamList = {
  Onboarding: undefined;
  Permission: undefined;
  InviteCode: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Indoor: NavigatorScreenParams<IndoorStackParamList>;
  Outdoor: NavigatorScreenParams<OutdoorStackParamList>;
  Settings: undefined;
  PainRecord: undefined;
  ExerciseHistory: undefined;
};

export type IndoorStackParamList = {
  IndoorToday: undefined;
  IndoorHistoryList: undefined;
  IndoorHistoryDetail: { date: string };
  WalkingMeasurement: undefined;
  StretchingMeasurement: undefined;
  StandingMeasurement: undefined;
  SittingMeasurement: undefined;
  BalanceMeasurement: undefined;
  WalkingSupportMeasurement: undefined;
  HealthCheck: { exerciseName: string; exerciseType: string };
};

export type OutdoorStackParamList = {
  OutdoorToday: undefined;
  OutdoorHistoryList: undefined;
  OutdoorHistoryDetail: { date: string };
};

export type CaregiverStackParamList = {
  CaregiverDashboard: undefined;
  Notifications: undefined;
  PatientDetail: undefined;
};