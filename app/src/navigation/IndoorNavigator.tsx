import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndoorExerciseScreen from '../screens/patient/IndoorExerciseScreen';
import WalkingMeasurementScreen from '../screens/patient/WalkingMeasurementScreen';
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
        name="IndoorToday" 
        component={IndoorExerciseScreen}
        options={{
          title: '실내 운동',
        }}
      />
      <Stack.Screen 
        name="WalkingMeasurement" 
        component={WalkingMeasurementScreen}
        options={{
          title: '걷기 측정',
        }}
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