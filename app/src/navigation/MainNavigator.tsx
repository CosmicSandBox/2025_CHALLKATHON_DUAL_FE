import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// Screens
import DashboardScreen from '../screens/patient/DashboardScreen';
import CaregiverNavigator from './CaregiverNavigator';

const MainNavigator: React.FC = () => {
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const onboardingCompleted = useSelector((state: RootState) => state.auth.onboardingCompleted);

  useEffect(() => {
    console.log('🔍 MainNavigator - Current userRole:', userRole);
    console.log('🔍 MainNavigator - onboardingCompleted:', onboardingCompleted);
  }, [userRole, onboardingCompleted]);

  // 보호자인 경우 CaregiverNavigator를 렌더링
  if (userRole === 'caregiver') {
    console.log('🏥 Rendering CaregiverNavigator');
    return <CaregiverNavigator />;
  }

  // 환자인 경우 DashboardScreen만 렌더링 (Nav바 제거)
  console.log('👤 Rendering Patient Dashboard (No Nav Bar)');
  return <DashboardScreen />;
};

export default MainNavigator; 