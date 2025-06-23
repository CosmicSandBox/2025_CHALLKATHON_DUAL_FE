import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IndoorStackParamList } from '../../navigation/types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

const TOTAL_REPS = 12;

const WalkingSupportMeasurementScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<IndoorStackParamList, 'WalkingSupportMeasurement'>>();
  const [started, setStarted] = useState(false);
  const [reps, setReps] = useState(0);

  const handleStart = () => {
    setStarted(true);
    setReps(0);
  };

  const handleRep = () => {
    if (reps < TOTAL_REPS) {
      setReps(reps + 1);
    }
    if (reps + 1 === TOTAL_REPS) {
      Alert.alert('완료', '운동을 모두 완료하셨습니다!');
      setStarted(false);
    }
  };

  const handleStop = () => {
    setStarted(false);
    setReps(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>발끝/뒤꿈치 들기</Text>
        <Text style={styles.subtitle}>종아리와 발목 근육을 강화하고 균형을 기르는 재활 운동입니다.</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.guideTitle}>운동 방법</Text>
        <Text style={styles.guide}>
          1. 벽이나 의자를 잡고 똑바로 서세요.\n2. 천천히 발끝을 들어 올려 2초간 유지 후 내리세요.\n3. 다시 뒤꿈치를 들어 올려 2초간 유지 후 내리세요.\n4. {TOTAL_REPS}회 반복하세요.
        </Text>
        <Text style={styles.effectTitle}>운동 효과</Text>
        <Text style={styles.effect}>- 종아리, 발목 근력 강화\n- 균형 감각 향상\n- 낙상 예방</Text>
        <Text style={styles.cautionTitle}>주의사항</Text>
        <Text style={styles.caution}>- 넘어질 위험이 있으니 벽이나 보호자 옆에서 진행하세요.\n- 통증이 느껴지면 즉시 중단하세요.</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>진행 상태: </Text>
          <Text style={styles.progressValue}>{reps} / {TOTAL_REPS} 회</Text>
        </View>
        {started ? (
          <>
            <TouchableOpacity style={styles.repButton} onPress={handleRep}>
              <Text style={styles.repButtonText}>1회 완료</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
              <Text style={styles.stopButtonText}>운동 중단</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>운동 시작</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: Spacing.lg, paddingBottom: 0 },
  title: { ...Typography.h2, color: Colors.primary, marginBottom: 4 },
  subtitle: { ...Typography.body, color: Colors.gray700, marginBottom: 16 },
  content: { flex: 1, padding: Spacing.lg },
  guideTitle: { ...Typography.h4, marginBottom: 4 },
  guide: { ...Typography.body, color: Colors.gray800, marginBottom: 12 },
  effectTitle: { ...Typography.h5, marginTop: 8, marginBottom: 2 },
  effect: { ...Typography.body, color: Colors.gray700, marginBottom: 12 },
  cautionTitle: { ...Typography.h5, marginTop: 8, marginBottom: 2, color: Colors.error },
  caution: { ...Typography.body, color: Colors.error, marginBottom: 12 },
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  progressLabel: { ...Typography.body, color: Colors.gray700 },
  progressValue: { ...Typography.h4, color: Colors.primary, marginLeft: 8 },
  startButton: { backgroundColor: Colors.primary, padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  startButtonText: { color: '#fff', ...Typography.h4 },
  repButton: { backgroundColor: Colors.secondary, padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  repButtonText: { color: '#fff', ...Typography.h4 },
  stopButton: { backgroundColor: Colors.error, padding: 12, borderRadius: 8, alignItems: 'center' },
  stopButtonText: { color: '#fff', ...Typography.body },
});

export default WalkingSupportMeasurementScreen; 