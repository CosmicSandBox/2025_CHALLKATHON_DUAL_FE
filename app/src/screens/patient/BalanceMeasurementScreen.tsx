import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IndoorStackParamList } from '../../navigation/types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

const HOLD_TIME = 10; // 초

const BalanceMeasurementScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<IndoorStackParamList, 'BalanceMeasurement'>>();
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [side, setSide] = useState<'left' | 'right'>('left');
  const [completed, setCompleted] = useState({ left: false, right: false });
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    setStarted(true);
    setElapsed(0);
    timerRef.current = setInterval(() => {
      setElapsed(prev => {
        if (prev + 1 === HOLD_TIME) {
          clearInterval(timerRef.current!);
          setCompleted(c => ({ ...c, [side]: true }));
          setStarted(false);
          Alert.alert('완료', `${side === 'left' ? '왼발' : '오른발'} 운동 완료!`);
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStop = () => {
    setStarted(false);
    setElapsed(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleSwitch = () => {
    setSide(side === 'left' ? 'right' : 'left');
    setElapsed(0);
  };

  React.useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>한 발로 서기</Text>
        <Text style={styles.subtitle}>균형 감각과 하체 안정성을 기르는 대표 재활 운동입니다.</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.guideTitle}>운동 방법</Text>
        <Text style={styles.guide}>
          1. 두 발을 모으고 똑바로 서세요.\n2. 한 발을 들어 올려 {HOLD_TIME}초간 균형을 잡으세요.\n3. 반대쪽도 반복하세요.\n4. 필요시 보호자와 함께 진행하세요.
        </Text>
        <Text style={styles.effectTitle}>운동 효과</Text>
        <Text style={styles.effect}>- 균형 감각 향상\n- 낙상 예방\n- 하체 안정성 강화</Text>
        <Text style={styles.cautionTitle}>주의사항</Text>
        <Text style={styles.caution}>- 넘어질 위험이 있으니 벽이나 보호자 옆에서 진행하세요.\n- 어지러우면 즉시 중단하세요.</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>{side === 'left' ? '왼발' : '오른발'} 진행 상태: </Text>
          <Text style={styles.progressValue}>{completed[side] ? '완료' : `${elapsed} / ${HOLD_TIME}초`}</Text>
        </View>
        {started ? (
          <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
            <Text style={styles.stopButtonText}>운동 중단</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.startButton} onPress={handleStart} disabled={completed[side]}>
              <Text style={styles.startButtonText}>운동 시작</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.switchButton} onPress={handleSwitch}>
              <Text style={styles.switchButtonText}>반대쪽으로 전환</Text>
            </TouchableOpacity>
          </>
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
  stopButton: { backgroundColor: Colors.error, padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  stopButtonText: { color: '#fff', ...Typography.body },
  switchButton: { backgroundColor: Colors.secondary, padding: 12, borderRadius: 8, alignItems: 'center' },
  switchButtonText: { color: '#fff', ...Typography.body },
});

export default BalanceMeasurementScreen; 