import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IndoorStackParamList } from '../../navigation/types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

const WalkingSupportMeasurementScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<IndoorStackParamList, 'WalkingSupportMeasurement'>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>보행보조 운동</Text>
        <Text style={styles.subtitle}>보행보조기구(지팡이, 워커 등) 사용법과 안전한 보행을 연습합니다.</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.guide}>1. 보행보조기구를 양손으로 잡으세요.\n2. 천천히 한 발씩 내딛으며 균형을 잡으세요.\n3. 10m 이동을 목표로 연습하세요.\n4. 필요시 보호자와 함께 진행하세요.</Text>
        <TouchableOpacity style={styles.startButton} onPress={() => {}}>
          <Text style={styles.startButtonText}>운동 시작</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: Spacing.paddingLarge,
    paddingTop: Spacing.sectionSpacing,
  },
  title: {
    ...Typography.h1,
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textLight,
    marginBottom: Spacing.sectionSpacing,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.paddingLarge,
  },
  guide: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginBottom: Spacing.sectionSpacing,
    textAlign: 'center',
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 16,
  },
  startButtonText: {
    ...Typography.h3,
    color: '#fff',
    fontWeight: '700',
  },
});

export default WalkingSupportMeasurementScreen; 