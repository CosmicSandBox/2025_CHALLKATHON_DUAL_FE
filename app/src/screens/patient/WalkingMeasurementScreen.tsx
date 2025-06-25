import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Animated,
  AppState,
  AppStateStatus, // 타입 추가
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Card from '../../components/common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { IndoorStackParamList } from '../../navigation/types';
import { Feather } from '@expo/vector-icons';
import { Pedometer } from 'expo-sensors';

type WalkingMeasurementScreenNavigationProp = NativeStackNavigationProp<IndoorStackParamList, 'WalkingMeasurement'>;

const WalkingMeasurementScreen: React.FC = () => {
  const navigation = useNavigation<WalkingMeasurementScreenNavigationProp>();
  const [isWalking, setIsWalking] = useState(false);
  const [steps, setSteps] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [pace, setPace] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState<boolean | null>(null);
  const [pedometerError, setPedometerError] = useState<string | null>(null);
  const [startTimestamp, setStartTimestamp] = useState<number | null>(null); // 추가
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pedometerSubscription = useRef<any>(null);
  const appState = useRef<AppStateStatus>(AppState.currentState); // 타입 명시

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
    const now = Date.now();
    setStartTimestamp(now);
    setElapsedTime(0);
    
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => {
        const newTime = prev + 1;
        console.log('Timer tick:', newTime);
        return newTime;
      });
    }, 1000);
    
    console.log('Timer started at:', new Date(now).toISOString());
  };

  // 타이머 정지
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      console.log('Timer stopped');
    }
    setStartTimestamp(null);
  };

  // 센서 지원 여부 확인 및 권한 요청
  useEffect(() => {
    const initializePedometer = async () => {
      try {
        // 센서 지원 여부 확인
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(isAvailable);
        
        if (!isAvailable) {
          setPedometerError('이 기기는 걸음 수 측정 센서를 지원하지 않습니다.');
          return;
        }

        // 권한 요청
        if (Pedometer.requestPermissionsAsync) {
          const { status } = await Pedometer.requestPermissionsAsync();
          if (status !== 'granted') {
            setPedometerError('신체 활동 권한이 필요합니다. 설정에서 권한을 허용해 주세요.');
          } else {
            console.log('Pedometer permission granted');
          }
        }
      } catch (error) {
        console.error('Pedometer initialization error:', error);
        setIsPedometerAvailable(false);
        setPedometerError('걸음 수 센서 초기화 중 오류가 발생했습니다.');
      }
    };
    
    initializePedometer();
  }, []);

  // 실제 걸음 수 측정 함수
  const subscribePedometer = () => {
    setPedometerError(null);
    try {
      console.log('Starting pedometer subscription...');
      
      // 현재 걸음 수를 기준점으로 설정
      const startTime = new Date();
      
      pedometerSubscription.current = Pedometer.watchStepCount(result => {
        console.log('Pedometer update:', result);
        const currentSteps = result.steps;
        
        setSteps(currentSteps);
        
        // 평균 보폭 70cm로 거리 계산 (미터 단위)
        const distanceInMeters = Math.round(currentSteps * 0.7 * 100) / 100;
        setDistance(distanceInMeters);
        
        // 평균 체중 65kg 기준, 걸음당 약 0.045kcal 계산
        const caloriesBurned = Math.round(currentSteps * 0.045 * 100) / 100;
        setCalories(caloriesBurned);
      });
      
      console.log('Pedometer subscription started successfully');
    } catch (error) {
      console.error('Pedometer subscription error:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      setPedometerError('걸음 수 센서 구독 중 오류가 발생했습니다: ' + errorMessage);
      
      // 시뮬레이터나 센서가 없는 경우 더미 데이터 사용
      console.log('Starting dummy data simulation...');
      startDummyData();
    }
  };

  // 시뮬레이터용 더미 데이터 (테스트용)
  const startDummyData = () => {
    let simulatedSteps = 0;
    pedometerSubscription.current = setInterval(() => {
      simulatedSteps += Math.floor(Math.random() * 3) + 1; // 1-3 걸음씩 증가
      
      setSteps(simulatedSteps);
      
      // 평균 보폭 70cm로 거리 계산
      const distanceInMeters = Math.round(simulatedSteps * 0.7 * 100) / 100;
      setDistance(distanceInMeters);
      
      // 칼로리 계산
      const caloriesBurned = Math.round(simulatedSteps * 0.045 * 100) / 100;
      setCalories(caloriesBurned);
      
      console.log('Dummy data:', { steps: simulatedSteps, distance: distanceInMeters, calories: caloriesBurned });
    }, 1500); // 1.5초마다 업데이트
  };

  const unsubscribePedometer = () => {
    if (pedometerSubscription.current) {
      console.log('Unsubscribing from pedometer...');
      
      // 실제 센서 구독 해제 또는 더미 데이터 interval 해제
      if (typeof pedometerSubscription.current.remove === 'function') {
        pedometerSubscription.current.remove();
      } else {
        clearInterval(pedometerSubscription.current);
      }
      
      pedometerSubscription.current = null;
      console.log('Pedometer unsubscribed successfully');
    }
  };

  const startWalking = () => {
    if (!isPedometerAvailable) {
      Alert.alert('오류', '걸음 수 센서를 사용할 수 없습니다.');
      return;
    }

    console.log('Starting walking measurement...');
    
    // 모든 상태 초기화
    setIsWalking(true);
    setSteps(0);
    setDistance(0);
    setCalories(0);
    setElapsedTime(0);
    setPace(0);
    setPedometerError(null);
    
    const now = Date.now();
    setStartTimestamp(now);
    
    // 타이머 시작
    startTimer();
    
    // 걸음 수 측정 시작
    subscribePedometer();
    
    // 애니메이션 시작
    startPulseAnimation();
    
    console.log('Walking measurement started successfully');
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
            console.log('Stopping walking measurement...');
            
            setIsWalking(false);
            stopTimer();
            unsubscribePedometer();
            stopPulseAnimation();
            
            // 건강 상태 체크로 이동
            navigation.navigate('HealthCheck', {
              exerciseName: '가벼운 걷기',
              exerciseType: 'walking'
            });
            
            console.log('Walking measurement stopped');
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
              unsubscribePedometer();
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
      console.log('Component unmounting, cleaning up...');
      stopTimer();
      unsubscribePedometer();
      stopPulseAnimation();
    };
  }, []);

  // AppState로 백그라운드/포그라운드 감지 및 경과 시간 보정
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      console.log('App state changed:', appState.current, '->', nextAppState);
      
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        isWalking &&
        startTimestamp
      ) {
        // 포그라운드 복귀 시 실제 경과 시간 보정
        const now = Date.now();
        const actualElapsed = Math.floor((now - startTimestamp) / 1000);
        console.log('Correcting elapsed time to:', actualElapsed);
        setElapsedTime(actualElapsed);
        
        // 타이머 재시작 (정확한 시간 계산을 위해)
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => {
          setElapsedTime(prev => {
            const newTime = Math.floor((Date.now() - startTimestamp) / 1000);
            return newTime;
          });
        }, 1000);
      }
      
      appState.current = nextAppState;
    };
    
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [isWalking, startTimestamp]);

  // 페이스 계산: steps, elapsedTime이 바뀔 때마다 계산
  useEffect(() => {
    if (isWalking && elapsedTime > 0 && steps > 0) {
      // 분당 걸음 수 계산
      const pacePerMinute = Math.round((steps * 60) / elapsedTime);
      setPace(pacePerMinute);
      console.log(`Pace calculated: ${steps} steps in ${elapsedTime}s = ${pacePerMinute} steps/min`);
    } else {
      setPace(0);
    }
  }, [steps, elapsedTime, isWalking]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 센서 지원/에러 안내 */}
      {isPedometerAvailable === false && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            이 기기는 걸음 수 측정 센서를 지원하지 않습니다.
          </Text>
        </View>
      )}
      {pedometerError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {pedometerError}
          </Text>
        </View>
      )}
      {isPedometerAvailable === null && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            센서 상태를 확인하는 중...
          </Text>
        </View>
      )}
      {isPedometerAvailable && !pedometerError && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>
            걸음 수 센서가 사용 가능합니다
          </Text>
        </View>
      )}

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
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: Spacing.sm,
    margin: Spacing.sm,
    borderRadius: Spacing.xs,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
    ...Typography.body,
  },
  infoContainer: {
    backgroundColor: '#E3F2FD',
    padding: Spacing.sm,
    margin: Spacing.sm,
    borderRadius: Spacing.xs,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoText: {
    color: '#1976D2',
    textAlign: 'center',
    ...Typography.body,
  },
  successContainer: {
    backgroundColor: '#E8F5E8',
    padding: Spacing.sm,
    margin: Spacing.sm,
    borderRadius: Spacing.xs,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  successText: {
    color: '#388E3C',
    textAlign: 'center',
    ...Typography.body,
  },
});

export default WalkingMeasurementScreen;