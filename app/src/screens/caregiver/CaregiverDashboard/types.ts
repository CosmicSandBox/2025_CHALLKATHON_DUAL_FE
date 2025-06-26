export interface CaregiverInfo {
  name: string;
  role: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: string;
  lastUpdate: string;
  todaySteps: number;
  todayExercise: number;
  painLevel: number;
  mood: string;
  needsAttention: boolean;
  phone: string;
  emergencyContact: string;
  progress: number;
  assignedDate: string;
}

export interface UrgentAlert {
  id: string;
  type: string;
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

export interface QuickAction {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export interface CaregiverDashboardState {
  showLocationModal: boolean;
  webViewLoading: boolean;
}
