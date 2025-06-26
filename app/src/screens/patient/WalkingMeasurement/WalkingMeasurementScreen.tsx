import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Animated,
  AppState,
  AppStateStatus,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Pedometer } from 'expo-sensors';
import Card from '../../../components/common/Card';
import { styles } from './WalkingMeasurementScreen.styled';
import { 
  WalkingMeasurementScreenNavigationProp,
  WalkingStats,
  PedometerResult,
  WalkingState
} from './types';
import { instructionSteps, walkingConstants } from './mock';

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
  const [startTimestamp, setStartTimestamp] = useState<number | null>(null);
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pedometerSubscription = useRef<any>(null);
  const appState = useRef<AppStateStatus>(AppState.currentState);

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
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(isAvailable);
        
        if (!isAvailable) {
          setPedometerError('이 기기는 걸음 수 측정 센서를 지원하지 않습니다.');
          return;
        }

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
      
      const startTime = new Date();
      
      pedometerSubscription.current = Pedometer.watchStepCount((result: PedometerResult) => {
        console.log('Pedometer update:', result);
        const currentSteps = result.steps;
        
        setSteps(currentSteps);
        
        // 평균 보폭으로 거리 계산 (미터 단위)
        const distanceInMeters = Math.round(currentSteps * walkingConstants.averageStepLength * 100) / 100;
        setDistance(distanceInMeters);
        
        // 칼로리 계산
        const caloriesBurned = Math.round(currentSteps * walkingConstants.caloriesPerStep * 100) / 100;
        setCalories(caloriesBurned);
      });
      
      console.log('Pedometer subscription started successfully');
    } catch (error) {
      console.error('Pedometer subscription error:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      setPedometerError('걸음 수 센서 구독 중 오류가 발생했습니다: ' + errorMessage);
      
      console.log('Starting dummy data simulation...');
      startDummyData();
    }
  };

  // 시뮬레이터용 더미 데이터 (테스트용)
  const startDummyData = () => {
    let simulatedSteps = 0;
    pedometerSubscription.current = setInterval(() => {
      simulatedSteps += Math.floor(Math.random() * walkingConstants.maxStepsPerInterval) + walkingConstants.minStepsPerInterval;
      
      setSteps(simulatedSteps);
      
      const distanceInMeters = Math.round(simulatedSteps * walkingConstants.averageStepLength * 100) / 100;
      setDistance(distanceInMeters);
      
      const caloriesBurned = Math.round(simulatedSteps * walkingConstants.caloriesPerStep * 100) / 100;
      setCalories(caloriesBurned);
      
      console.log('Dummy data:', { steps: simulatedSteps, distance: distanceInMeters, calories: caloriesBurned });
    }, walkingConstants.simulationInterval);
  };

  const unsubscribePedometer = () => {
    if (pedometerSubscription.current) {
      console.log('Unsubscribing from pedometer...');
      
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
    
    setIsWalking(true);
    setSteps(0);
    setDistance(0);
    setCalories(0);
    setElapsedTime(0);
    setPace(0);
    setPedometerError(null);
    
    const now = Date.now();
    setStartTimestamp(now);
    
    startTimer();
    subscribePedometer();
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
        const now = Date.now();
        const actualElapsed = Math.floor((now - startTimestamp) / 1000);
        console.log('Correcting elapsed time to:', actualElapsed);
        setElapsedTime(actualElapsed);
        
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

  // 페이스 계산
  useEffect(() => {
    if (isWalking && elapsedTime > 0 && steps > 0) {
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
          <Text style={styles.updateIndicator}>📱 OTA 업데이트 적용됨 v1.1</Text>
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
            {instructionSteps.map((step) => (
              <View key={step.number} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.number}</Text>
                </View>
                <Text style={styles.stepText}>{step.text}</Text>
              </View>
            ))}
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

export default WalkingMeasurementScreen;
