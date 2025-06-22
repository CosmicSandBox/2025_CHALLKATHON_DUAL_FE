import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import AuthNavigator from './AuthNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import MainNavigator from './MainNavigator';
import IndoorExerciseScreen from '../screens/patient/IndoorExerciseScreen';
import OutdoorExerciseScreen from '../screens/patient/OutdoorExerciseScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import WalkingMeasurementScreen from '../screens/patient/WalkingMeasurementScreen';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { isAuthenticated, userRole, onboardingCompleted } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!userRole ? (
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        ) : !isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : !onboardingCompleted ? (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen name="IndoorExercise" component={IndoorExerciseScreen} />
            <Stack.Screen name="OutdoorExercise" component={OutdoorExerciseScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="WalkingMeasurement" component={WalkingMeasurementScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator; 