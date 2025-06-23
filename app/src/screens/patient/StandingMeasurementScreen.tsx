import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IndoorStackParamList } from '../../navigation/types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import Toast from 'react-native-toast-message';

const TOTAL_REPS = 10;

const StandingMeasurementScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<IndoorStackParamList, 'StandingMeasurement'>>();
  const [started, setStarted] = useState(false);
  const [reps, setReps] = useState(0);

  const handleStart = () => {
    setStarted(true);
    setReps(0);
    Toast.show({ type: 'info', text1: '운동 시작', text2: '천천히 정확하게 진행하세요.' });
  };

  const handleRep = () => {
    if (reps < TOTAL_REPS) {
      setReps(reps + 1);
      Vibration.vibrate(50);
      Toast.show({ type: 'success', text1: `${reps + 1}회 완료!` });
    }
    if (reps + 1 === TOTAL_REPS) {
      setTimeout(() => {
        Vibration.vibrate([100, 100, 100]);
        Alert.alert('운동 완료', '운동을 모두 완료하셨습니다! 홈으로 이동할까요?', [
          { text: '아니오', style: 'cancel' },
          { text: '예', onPress: () => navigation.goBack() },
        ]);
      }, 300);
      setStarted(false);
    }
  };

  const handleStop = () => {
    Alert.alert('운동 중단', '정말 운동을 중단하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '중단', style: 'destructive', onPress: () => {
        setStarted(false);
        setReps(0);
        Toast.show({ type: 'error', text1: '운동이 중단되었습니다.' });
      }},
    ]);
  };

  const progress = reps / TOTAL_REPS;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>앉았다 일어서기</Text>
        <Text style={styles.subtitle}>허벅지와 엉덩이 근육을 강화하는 대표적인 하체 재활 운동입니다.</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.guideTitle}>운동 방법</Text>
        <Text style={styles.guide}>
          1. 의자에 앉아 양발을 어깨너비로 벌리세요.\n2. 팔을 앞으로 뻗고, 천천히 일어서세요.\n3. 다시 천천히 앉으세요.\n4. {TOTAL_REPS}회 반복하세요.
        </Text>
        <Text style={styles.effectTitle}>운동 효과</Text>
        <Text style={styles.effect}>- 하체 근력 강화\n- 일상생활 동작 개선\n- 낙상 예방</Text>
        <Text style={styles.cautionTitle}>주의사항</Text>
        <Text style={styles.caution}>- 무릎 통증이 심하면 즉시 중단하세요.\n- 어지러우면 바로 휴식하세요.\n- 필요시 보호자와 함께 진행하세요.</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressValue}>{reps} / {TOTAL_REPS} 회</Text>
        </View>
        {started ? (
          <>
            <TouchableOpacity
              style={[styles.repButton, reps === TOTAL_REPS && styles.disabledButton]}
              onPress={handleRep}
              activeOpacity={0.7}
              disabled={reps === TOTAL_REPS}
              accessibilityLabel="1회 완료"
            >
              <Text style={styles.repButtonText}>1회 완료</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stopButton}
              onPress={handleStop}
              activeOpacity={0.7}
              accessibilityLabel="운동 중단"
            >
              <Text style={styles.stopButtonText}>운동 중단</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStart}
            activeOpacity={0.7}
            accessibilityLabel="운동 시작"
          >
            <Text style={styles.startButtonText}>운동 시작</Text>
          </TouchableOpacity>
        )}
      </View>
      <Toast position="bottom" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { padding: Spacing.lg, paddingBottom: 0 },
  title: { ...Typography.h2, color: Colors.primary, marginBottom: 4 },
  subtitle: { ...Typography.body, color: Colors.textSecondary, marginBottom: 16 },
  content: { flex: 1, padding: Spacing.lg },
  guideTitle: { ...Typography.h3, marginBottom: 4 },
  guide: { ...Typography.body, color: Colors.textPrimary, marginBottom: 12 },
  effectTitle: { ...Typography.h3, marginTop: 8, marginBottom: 2 },
  effect: { ...Typography.body, color: Colors.textSecondary, marginBottom: 12 },
  cautionTitle: { ...Typography.h3, marginTop: 8, marginBottom: 2, color: Colors.error },
  caution: { ...Typography.body, color: Colors.error, marginBottom: 12 },
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  progressBarBg: { flex: 1, height: 16, backgroundColor: Colors.backgroundSecondary, borderRadius: 8, marginRight: 12, overflow: 'hidden' },
  progressBarFill: { height: 16, backgroundColor: Colors.primary, borderRadius: 8 },
  progressValue: { ...Typography.h3, color: Colors.primary, minWidth: 80, textAlign: 'right' },
  startButton: { backgroundColor: Colors.primary, padding: 20, borderRadius: 12, alignItems: 'center', marginTop: 16, shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 2 },
  startButtonText: { color: Colors.textWhite, ...Typography.button },
  repButton: { backgroundColor: Colors.success, padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 8, shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 2 },
  repButtonText: { color: Colors.textWhite, ...Typography.button },
  stopButton: { backgroundColor: Colors.error, padding: 16, borderRadius: 12, alignItems: 'center', shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 2 },
  stopButtonText: { color: Colors.textWhite, ...Typography.button },
  disabledButton: { opacity: 0.5 },
});

export default StandingMeasurementScreen; 