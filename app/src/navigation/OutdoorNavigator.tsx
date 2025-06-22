import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OutdoorStackParamList } from './types';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { View, Text, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator<OutdoorStackParamList>();

// Placeholder screens
const OutdoorTodayScreen: React.FC = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>실외 오늘 화면</Text>
  </View>
);

const OutdoorHistoryListScreen: React.FC = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>실외 기록 목록</Text>
  </View>
);

const OutdoorHistoryDetailScreen: React.FC = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>실외 기록 상세</Text>
  </View>
);

const OutdoorNavigator: React.FC = () => {
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
        name="OutdoorToday" 
        component={OutdoorTodayScreen}
        options={{
          title: '실외 오늘',
        }}
      />
      <Stack.Screen 
        name="OutdoorHistoryList" 
        component={OutdoorHistoryListScreen}
        options={{
          title: '실외 기록',
        }}
      />
      <Stack.Screen 
        name="OutdoorHistoryDetail" 
        component={OutdoorHistoryDetailScreen}
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

export default OutdoorNavigator; 