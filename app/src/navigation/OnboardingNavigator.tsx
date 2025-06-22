import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PermissionScreen from '../screens/onboarding/PermissionScreen';
import InviteCodeScreen from '../screens/onboarding/InviteCodeScreen';
import { OnboardingStackParamList } from './types';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.textPrimary,
        headerTitleStyle: {
          ...Typography.h2,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="Permission" 
        component={PermissionScreen}
        options={{
          title: '권한 설정',
        }}
      />
      <Stack.Screen 
        name="InviteCode" 
        component={InviteCodeScreen}
        options={{
          title: '초대 코드',
        }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator; 