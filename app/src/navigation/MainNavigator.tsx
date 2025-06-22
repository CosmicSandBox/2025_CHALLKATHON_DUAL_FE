import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';

// Screens
import DashboardScreen from '../screens/patient/DashboardScreen';
import IndoorExerciseScreen from '../screens/patient/IndoorExerciseScreen';
import OutdoorExerciseScreen from '../screens/patient/OutdoorExerciseScreen';
import CaregiverNavigator from './CaregiverNavigator';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator();

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

  // 환자인 경우 환자용 탭 네비게이터 렌더링
  console.log('👤 Rendering Patient Navigator');
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';
          let label: string = '';

          if (route.name === 'Dashboard') {
            iconName = '🏠';
            label = '홈';
          } else if (route.name === 'Indoor') {
            iconName = '💪';
            label = '실내';
          } else if (route.name === 'Outdoor') {
            iconName = '🌳';
            label = '실외';
          } else if (route.name === 'Settings') {
            iconName = '⚙️';
            label = '설정';
          }

          return (
            <View style={styles.tabItem}>
              <Text style={[styles.tabIcon, { opacity: focused ? 1 : 0.6 }]}>
                {iconName}
              </Text>
              <Text style={[
                styles.tabLabel,
                { 
                  color: focused ? Colors.primary : Colors.textLight,
                  fontWeight: focused ? '600' : '400'
                }
              ]}>
                {label}
              </Text>
            </View>
          );
        },
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ title: '홈' }}
      />
      <Tab.Screen 
        name="Indoor" 
        component={IndoorExerciseScreen}
        options={{ title: '실내 운동' }}
      />
      <Tab.Screen 
        name="Outdoor" 
        component={OutdoorExerciseScreen}
        options={{ title: '실외 운동' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: '설정' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.componentSpacing,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  tabLabel: {
    ...Typography.caption,
    fontSize: 12,
  },
});

export default MainNavigator; 