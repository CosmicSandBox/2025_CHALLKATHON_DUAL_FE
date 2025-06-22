import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Card from '../../components/common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { IndoorStackParamList } from '../../navigation/types';
import { Feather } from '@expo/vector-icons';

type WalkingMeasurementScreenNavigationProp = NativeStackNavigationProp<IndoorStackParamList, 'WalkingMeasurement'>;

const WalkingMeasurementScreen: React.FC = () => {
  const navigation = useNavigation<WalkingMeasurementScreenNavigationProp>();
  const [isWalking, setIsWalking] = useState(false);
  const [steps, setSteps] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [pace, setPace] = useState(0);
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const stepIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 걸음 수 시뮬레이션 (실제로는 센서 데이터 사용)
  const simulateSteps = () => {
    if (isWalking) {
      setSteps(prev => {
        const newSteps = prev + 1;
        // 평균 보폭 60cm로 거리 계산
        setDistance(Math.round(newSteps * 0.6 * 100) / 100);
        // 평균 체중 60kg 기준 칼로리 계산 (걸음당 약 0.04kcal)
        setCalories(Math.round(newSteps * 0.04 * 100) / 100);
        return newSteps;
      });
    }
  };

  // 펄스 애니메이션
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
  };

  // 타이머 시작
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => {
        const newTime = prev + 1;
        // 페이스 계산 (분당 걸음 수)
        if (steps > 0) {
          setPace(Math.round((steps / newTime) * 60));
        }
        return newTime;
      });
    }, 1000);
  };

  // 타이머 정지
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // 걸음 수 시뮬레이션 시작
  const startStepSimulation = () => {
    stepIntervalRef.current = setInterval(simulateSteps, 2000); // 2초마다 1걸음
  };

  // 걸음 수 시뮬레이션 정지
  const stopStepSimulation = () => {
    if (stepIntervalRef.current) {
      clearInterval(stepIntervalRef.current);
      stepIntervalRef.current = null;
    }
  };

  const startWalking = () => {
    setIsWalking(true);
    startTimer();
    startStepSimulation();
    startPulseAnimation();
  };

  const stopWalking = () => {
    Alert.alert(
      '걷기 종료',
      '걷기를 종료하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '종료', 
          onPress: () => {
            setIsWalking(false);
            stopTimer();
            stopStepSimulation();
            stopPulseAnimation();
          }
        },
      ]
    );
  };

  const handleGoBack = () => {
    if (isWalking) {
      Alert.alert(
        '측정 중',
        '걷기 측정이 진행 중입니다. 정말 나가시겠습니까?',
        [
          { text: '취소', style: 'cancel' },
          { 
            text: '나가기', 
            onPress: () => {
              setIsWalking(false);
              stopTimer();
              stopStepSimulation();
              stopPulseAnimation();
              navigation.goBack();
            }
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      stopTimer();
      stopStepSimulation();
      stopPulseAnimation();
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="chevron-left" size={28} color="#A3A8AF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>걸음 수 측정</Text>
          <Text style={styles.headerSubtitle}>실내에서 안전하게 걷기 운동을 시작해보세요</Text>
        </View>
      </View>

      {/* Main Measurement Display */}
      <View style={styles.measurementSection}>
        <Card style={styles.measurementCard}>
          {/* Walking Status */}
          <View style={styles.statusContainer}>
            <Animated.View 
              style={[
                styles.walkingIndicator,
                { transform: [{ scale: pulseAnim }] }
              ]}
            >
              <Text style={styles.walkingIcon}>
                {isWalking ? '🚶‍♂️' : '⏸️'}
              </Text>
            </Animated.View>
            <Text style={styles.statusText}>
              {isWalking ? '걷는 중...' : '대기 중'}
            </Text>
          </View>

          {/* Main Stats */}
          <View style={styles.mainStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{steps}</Text>
              <Text style={styles.statLabel}>걸음 수</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatTime(elapsedTime)}</Text>
              <Text style={styles.statLabel}>경과 시간</Text>
            </View>
          </View>

          {/* Secondary Stats */}
          <View style={styles.secondaryStats}>
            <View style={styles.secondaryStatItem}>
              <Text style={styles.secondaryStatValue}>{distance}m</Text>
              <Text style={styles.secondaryStatLabel}>이동 거리</Text>
            </View>
            <View style={styles.secondaryStatItem}>
              <Text style={styles.secondaryStatValue}>{calories}kcal</Text>
              <Text style={styles.secondaryStatLabel}>소모 칼로리</Text>
            </View>
            <View style={styles.secondaryStatItem}>
              <Text style={styles.secondaryStatValue}>{pace}걸음/분</Text>
              <Text style={styles.secondaryStatLabel}>페이스</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Instructions */}
      <View style={styles.instructionSection}>
        <Card style={styles.instructionCard}>
          <Text style={styles.instructionTitle}>걷기 방법</Text>
          <View style={styles.instructionSteps}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>편안한 자세로 서서 준비합니다</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>천천히 한 걸음씩 내딛습니다</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>무리하지 말고 본인의 페이스를 유지합니다</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.stepText}>통증이나 불편함이 있으면 즉시 중단합니다</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Action Button */}
      <View style={styles.actionSection}>
        {!isWalking ? (
          <TouchableOpacity
            style={styles.startButton}
            onPress={startWalking}
          >
            <Text style={styles.startButtonText}>걷기 시작</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.stopButton}
            onPress={stopWalking}
          >
            <Text style={styles.stopButtonText}>걷기 종료</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: Spacing.sectionSpacing,
    paddingBottom: Spacing.sectionSpacing,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#F8F9FA',
  },
  backButton: {
    marginRight: 8,
    marginTop: 0,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#A3A8AF',
    fontWeight: '400',
  },
  measurementSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  measurementCard: {
    padding: Spacing.padding,
    alignItems: 'center',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  walkingIndicator: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  walkingIcon: {
    fontSize: 40,
  },
  statusText: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  mainStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...Typography.h1,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.body,
    color: Colors.textLight,
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: Colors.borderLight,
    marginHorizontal: Spacing.componentSpacing,
  },
  secondaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  secondaryStatItem: {
    alignItems: 'center',
  },
  secondaryStatValue: {
    ...Typography.h3,
    color: Colors.primary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  secondaryStatLabel: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  instructionSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  instructionCard: {
    padding: Spacing.padding,
  },
  instructionTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.componentSpacing,
  },
  instructionSteps: {
    gap: Spacing.componentSpacing,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
    marginTop: 2,
  },
  stepNumberText: {
    ...Typography.caption,
    color: Colors.background,
    fontWeight: '600',
  },
  stepText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
  actionSection: {
    paddingHorizontal: Spacing.paddingLarge,
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: Spacing.cardRadius,
    paddingVertical: Spacing.paddingLarge,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  startButtonText: {
    ...Typography.body,
    color: Colors.background,
    fontWeight: '600',
  },
  stopButton: {
    backgroundColor: '#F44336',
    borderRadius: Spacing.cardRadius,
    paddingVertical: Spacing.paddingLarge,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stopButtonText: {
    ...Typography.body,
    color: Colors.background,
    fontWeight: '600',
  },
});

export default WalkingMeasurementScreen; 