import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthNavigator from './AuthNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import MainNavigator from './MainNavigator';
import CaregiverNavigator from './CaregiverNavigator';
import SplashScreen from '../screens/splash/SplashScreen';

import { RootStackParamList } from './types';
import { restoreToken, setRole, completeOnboarding } from '../store/slices/authSlice';
import { restoreAuthToken } from '../api';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { userToken, userRole, onboardingComplete } = useSelector(
    (state: RootState) => state.auth
  );
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const role = await AsyncStorage.getItem('userRole');
        const onboardingStatus = await AsyncStorage.getItem('onboardingComplete');
        
        if (token) {
          dispatch(restoreToken({ token }));
          // API 클라이언트에도 토큰 설정
          restoreAuthToken(token);
        }
        
        if (role) {
          dispatch(setRole(role as 'patient' | 'caregiver'));
        }
        
        if (onboardingStatus === 'true') {
          dispatch(completeOnboarding());
        }

      } catch (e) {
        console.warn('Failed to load data from storage', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, [dispatch]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!onboardingComplete ? (
        <Stack.Screen name="OnboardingNavigator" component={OnboardingNavigator} />
      ) : !userRole ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : !userToken ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : userRole === 'patient' ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Caregiver" component={CaregiverNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;