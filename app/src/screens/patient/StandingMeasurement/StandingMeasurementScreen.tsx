import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import Card from '../../../components/common/Card';
import { IndoorStackParamList } from '../../../navigation/types';
import { recordSimpleExercise } from '../../../api';
import { StandingMeasurementState } from './types';
import { 
  EXERCISE_CONFIG, 
  EXERCISE_STEPS, 
  EXERCISE_BENEFITS, 
  EXERCISE_CAUTIONS, 
  EXERCISE_INFO,
  PHASE_CONFIG 
} from './mock';
import { styles } from './StandingMeasurementScreen.styled';

const StandingMeasurementScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<IndoorStackParamList, 'StandingMeasurement'>>();
  const [state, setState] = useState<StandingMeasurementState>({
    started: false,
    currentSet: 0,
    currentRep: 0,
    isResting: false,
    restTimer: EXERCISE_CONFIG.restDuration,
    currentPhase: 'sitting',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleStart = () => {
    setState(prev => ({
      ...prev,
      started: true,
      currentSet: 1,
      currentRep: 0,
      currentPhase: 'sitting',
      isResting: false,
    }));
    setStartTime(Date.now()); // 시작 시간 기록
  };

  const handleRep = () => {
    if (state.currentPhase === 'sitting') {
      // 일어서기 동작
      setState(prev => ({ ...prev, currentPhase: 'standing' }));
    } else {
      // 앉기 동작 완료 - 1회 완료
      const newRep = state.currentRep + 1;
      setState(prev => ({ ...prev, currentRep: newRep, currentPhase: 'sitting' }));

      // 진행률 애니메이션
      const progress = newRep / EXERCISE_CONFIG.repsPerSet;
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start();

      if (newRep >= EXERCISE_CONFIG.repsPerSet) {
        // 한 세트 완료
        if (state.currentSet >= EXERCISE_CONFIG.totalSets) {
          // 모든 세트 완료 - API 호출
          const completeExercise = async () => {
            try {
              setIsSubmitting(true);
              
              const totalDuration = startTime ? Math.max(1, Math.floor((Date.now() - startTime) / 60000)) : 3; // 분 단위
              
              const exerciseRecord = {
                exerciseId: 4, // 서서하기 운동 ID  
                durationMinutes: totalDuration,
                notes: `서서하기 운동 ${EXERCISE_CONFIG.totalSets}세트 (${EXERCISE_CONFIG.repsPerSet}회/세트) 완료`
              };

              console.log('서서하기 운동 기록 전송:', exerciseRecord);
              
              const result = await recordSimpleExercise(exerciseRecord);
              console.log('서서하기 운동 기록 성공:', result);

              Alert.alert(
                '운동 완료! 🎉',
                `서서하기 운동 ${EXERCISE_CONFIG.totalSets}세트를 모두 완료하셨습니다!\n\n하체 근력이 크게 향상되었어요.`,
                [
                  {
                    text: '확인',
                    onPress: () => {
                      setState(prev => ({ ...prev, started: false }));
                      navigation.navigate('HealthCheck', {
                        exerciseName: '서서하기 운동',
                        exerciseType: 'standing',
                        exerciseData: {
                          duration: totalDuration * 60,
                          sets: EXERCISE_CONFIG.totalSets,
                          reps: EXERCISE_CONFIG.repsPerSet
                        }
                      });
                    },
                  },
                ]
              );
            } catch (error) {
              console.error('서서하기 운동 기록 저장 실패:', error);
              
              Alert.alert(
                '운동 완료! 🎉',
                `서서하기 운동 ${EXERCISE_CONFIG.totalSets}세트를 모두 완료하셨습니다!\n\n기록 저장에는 실패했지만 건강 체크는 계속 진행됩니다.`,
                [
                  {
                    text: '확인',
                    onPress: () => {
                      setState(prev => ({ ...prev, started: false }));
                      navigation.navigate('HealthCheck', {
                        exerciseName: '서서하기 운동',
                        exerciseType: 'standing',
                        exerciseData: {
                          duration: 3 * 60, // 기본값 3분
                          sets: EXERCISE_CONFIG.totalSets,
                          reps: EXERCISE_CONFIG.repsPerSet
                        }
                      });
                    },
                  },
                ]
              );
            } finally {
              setIsSubmitting(false);
            }
          };
          
          completeExercise();
        } else {
          // 다음 세트로
          setState(prev => ({
            ...prev,
            currentSet: prev.currentSet + 1,
            currentRep: 0,
          }));
          progressAnim.setValue(0);
          startRestTimer(EXERCISE_CONFIG.restDuration);
        }
      }
    }
  };

  const startRestTimer = (seconds: number) => {
    setState(prev => ({ ...prev, isResting: true, restTimer: seconds }));
    
    intervalRef.current = setInterval(() => {
      setState(prev => {
        if (prev.restTimer <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return { ...prev, isResting: false, restTimer: seconds };
        }
        return { ...prev, restTimer: prev.restTimer - 1 };
      });
    }, 1000);
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    Alert.alert(
      '운동 중단',
      '정말 운동을 중단하시겠습니까?',
      [
        { text: '계속하기', style: 'cancel' },
        {
          text: '중단하기',
          style: 'destructive',
          onPress: () => {
            setState({
              started: false,
              currentSet: 0,
              currentRep: 0,
              isResting: false,
              restTimer: EXERCISE_CONFIG.restDuration,
              currentPhase: 'sitting',
            });
            progressAnim.setValue(0);
          },
        },
      ]
    );
  };

  const handleGoBack = () => {
    if (state.started) {
      Alert.alert(
        '운동 중단',
        '운동을 중단하고 이전 화면으로 돌아가시겠습니까?',
        [
          { text: '계속하기', style: 'cancel' },
          {
            text: '나가기',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const getTotalProgress = () => 
    ((state.currentSet - 1) * EXERCISE_CONFIG.repsPerSet + state.currentRep) / 
    (EXERCISE_CONFIG.totalSets * EXERCISE_CONFIG.repsPerSet) * 100;

  const currentPhaseConfig = PHASE_CONFIG[state.currentPhase];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="chevron-left" size={28} color="#A3A8AF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{EXERCISE_INFO.title}</Text>
          <Text style={styles.headerSubtitle}>{EXERCISE_INFO.subtitle}</Text>
        </View>
        {state.started && (
          <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
            <Feather name="x" size={24} color="#EF4444" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {!state.started ? (
          <>
            {/* 운동 소개 카드 */}
            <View style={styles.section}>
              <Card style={styles.introCard}>
                <View style={styles.introHeader}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.iconText}>{EXERCISE_INFO.emoji}</Text>
                  </View>
                  <View style={styles.introInfo}>
                    <Text style={styles.introTitle}>{EXERCISE_INFO.title}</Text>
                    <Text style={styles.introDescription}>{EXERCISE_INFO.description}</Text>
                  </View>
                </View>
                <View style={styles.exerciseStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{EXERCISE_CONFIG.totalSets}</Text>
                    <Text style={styles.statLabel}>세트</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{EXERCISE_CONFIG.repsPerSet}</Text>
                    <Text style={styles.statLabel}>회/세트</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{EXERCISE_CONFIG.estimatedDuration}</Text>
                    <Text style={styles.statLabel}>소요시간</Text>
                  </View>
                </View>
              </Card>
            </View>

            {/* 운동 방법 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>운동 방법</Text>
              <Card style={styles.methodCard}>
                <View style={styles.stepList}>
                  {EXERCISE_STEPS.map((step) => (
                    <View key={step.id} style={styles.stepItem}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>{step.id}</Text>
                      </View>
                      <Text style={styles.stepText}>{step.description}</Text>
                    </View>
                  ))}
                </View>
              </Card>
            </View>

            {/* 운동 효과 & 주의사항 */}
            <View style={styles.twoColumnSection}>
              <View style={styles.halfWidth}>
                <Text style={styles.sectionTitle}>운동 효과</Text>
                <Card style={styles.benefitCard}>
                  {EXERCISE_BENEFITS.map((benefit, index) => (
                    <View key={index} style={styles.benefitItem}>
                      <Text style={styles.benefitIcon}>{benefit.icon}</Text>
                      <Text style={styles.benefitText}>{benefit.text}</Text>
                    </View>
                  ))}
                </Card>
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.sectionTitle}>주의사항</Text>
                <Card style={styles.cautionCard}>
                  {EXERCISE_CAUTIONS.map((caution, index) => (
                    <View key={index} style={styles.cautionItem}>
                      <Text style={styles.cautionIcon}>{caution.icon}</Text>
                      <Text style={styles.cautionText}>{caution.text}</Text>
                    </View>
                  ))}
                </Card>
              </View>
            </View>

            {/* 시작 버튼 */}
            <View style={styles.section}>
              <TouchableOpacity style={styles.startButton} onPress={handleStart}>
                <Text style={styles.startButtonText}>운동 시작하기</Text>
                <Feather name="play" size={20} color="#FFFFFF" style={styles.startButtonIcon} />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {/* 진행 상황 카드 */}
            <View style={styles.section}>
              <Card style={styles.progressCard}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressTitle}>
                    {state.currentSet}세트 - {state.currentRep + 1}번째
                  </Text>
                  <Text style={styles.progressSubtitle}>
                    {EXERCISE_CONFIG.totalSets}세트 중 {state.currentSet}세트 진행 중
                  </Text>
                </View>
                
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressBarFill, { width: `${getTotalProgress()}%` }]} />
                  </View>
                  <Text style={styles.progressPercent}>{Math.round(getTotalProgress())}%</Text>
                </View>
              </Card>
            </View>

            {/* 현재 상태 카드 */}
            <View style={styles.section}>
              <Card style={styles.statusCard}>
                {state.isResting ? (
                  <View style={styles.statusContent}>
                    <Text style={styles.statusTitle}>휴식 시간</Text>
                    <Text style={styles.statusSubtitle}>다음 세트까지</Text>
                    <Text style={styles.timerText}>{state.restTimer}초</Text>
                    <Text style={styles.statusInstruction}>
                      충분히 휴식을 취하고 다음 세트를 준비하세요
                    </Text>
                  </View>
                ) : (
                  <View style={styles.statusContent}>
                    <Text style={styles.statusTitle}>{currentPhaseConfig.text}</Text>
                    <Text style={styles.statusSubtitle}>
                      {state.currentRep}/{EXERCISE_CONFIG.repsPerSet}회 완료
                    </Text>
                    
                    <View style={styles.exerciseIconContainer}>
                      <Text style={styles.currentExerciseIcon}>
                        {currentPhaseConfig.emoji}
                      </Text>
                    </View>

                    <View style={styles.animationBarContainer}>
                      <Animated.View
                        style={[
                          styles.animationBar,
                          {
                            width: progressAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0%', '100%'],
                            }),
                          },
                        ]}
                      />
                    </View>
                    
                    <View style={styles.instructionContainer}>
                      <Text style={styles.instructionText}>
                        {currentPhaseConfig.instruction}
                      </Text>
                    </View>
                    
                    <TouchableOpacity style={styles.repButton} onPress={handleRep}>
                      <Text style={styles.repButtonText}>{currentPhaseConfig.action}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Card>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StandingMeasurementScreen;
