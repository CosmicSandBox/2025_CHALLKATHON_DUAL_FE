import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndoorExerciseScreen from '../screens/patient/IndoorExerciseScreen';
import WalkingMeasurementScreen from '../screens/patient/WalkingMeasurementScreen';
import StretchingMeasurementScreen from '../screens/patient/StretchingMeasurementScreen';
import StandingMeasurementScreen from '../screens/patient/StandingMeasurementScreen';
import SittingMeasurementScreen from '../screens/patient/SittingMeasurementScreen';
import BalanceMeasurementScreen from '../screens/patient/BalanceMeasurementScreen';
import WalkingSupportMeasurementScreen from '../screens/patient/WalkingSupportMeasurementScreen';
import { IndoorStackParamList } from './types';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { View, Text, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator<IndoorStackParamList>();

// Placeholder screens
const IndoorTodayScreen: React.FC = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>실내 오늘 화면</Text>
  </View>
);

const IndoorHistoryListScreen: React.FC = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>실내 기록 목록</Text>
  </View>
);

const IndoorHistoryDetailScreen: React.FC = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>실내 기록 상세</Text>
  </View>
);

const IndoorNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="IndoorToday" 
        component={IndoorExerciseScreen}
      />
      <Stack.Screen 
        name="WalkingMeasurement" 
        component={WalkingMeasurementScreen}
      />
      <Stack.Screen 
        name="IndoorHistoryList" 
        component={IndoorHistoryListScreen}
        options={{
          title: '실내 기록',
        }}
      />
      <Stack.Screen 
        name="IndoorHistoryDetail" 
        component={IndoorHistoryDetailScreen}
        options={{
          title: '기록 상세',
        }}
      />
      <Stack.Screen 
        name="StretchingMeasurement" 
        component={StretchingMeasurementScreen}
      />
      <Stack.Screen 
        name="StandingMeasurement" 
        component={StandingMeasurementScreen}
      />
      <Stack.Screen 
        name="SittingMeasurement" 
        component={SittingMeasurementScreen}
      />
      <Stack.Screen 
        name="BalanceMeasurement" 
        component={BalanceMeasurementScreen}
      />
      <Stack.Screen 
        name="WalkingSupportMeasurement" 
        component={WalkingSupportMeasurementScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  placeholderText: {
    ...Typography.h2,
    color: Colors.textLight,
  },
});

export default IndoorNavigator; 