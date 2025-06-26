import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Feather } from '@expo/vector-icons';

// Screens
import DashboardScreen from '../screens/patient/Dashboard/DashboardScreen';
import IndoorNavigator from './IndoorNavigator';
import OutdoorExerciseScreen from '../screens/patient/OutdoorExercise/OutdoorExerciseScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import PainRecordScreen from '../screens/patient/PainRecord/PainRecordScreen';
import ExerciseHistoryScreen from '../screens/patient/ExerciseHistory/ExerciseHistoryScreen';
import CaregiverNavigator from './CaregiverNavigator';

import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 탭 네비게이터 컴포넌트
const PatientTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Feather.glyphMap;

          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'Indoor') {
            iconName = 'activity';
          } else if (route.name === 'Outdoor') {
            iconName = 'map-pin';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          } else {
            iconName = 'home';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.borderLight,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          ...Typography.caption,
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          title: '홈',
        }}
      />
      <Tab.Screen 
        name="Indoor" 
        component={IndoorNavigator}
        options={{
          title: '실내',
        }}
      />
      <Tab.Screen 
        name="Outdoor" 
        component={OutdoorExerciseScreen}
        options={{
          title: '실외',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: '설정',
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const onboardingComplete = useSelector((state: RootState) => state.auth.onboardingComplete);

  useEffect(() => {
    console.log('🔍 MainNavigator - Current userRole:', userRole);
    console.log('🔍 MainNavigator - onboardingComplete:', onboardingComplete);
  }, [userRole, onboardingComplete]);

  // 보호자인 경우 CaregiverNavigator를 렌더링
  if (userRole === 'caregiver') {
    console.log('🏥 Rendering CaregiverNavigator');
    return <CaregiverNavigator />;
  }

  // 환자인 경우 스택 네비게이터로 탭과 추가 페이지들을 렌더링
  console.log('👤 Rendering Patient Stack Navigator');
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={PatientTabNavigator} />
      <Stack.Screen name="PainRecord" component={PainRecordScreen} />
      <Stack.Screen name="ExerciseHistory" component={ExerciseHistoryScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator; 