import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import Card from '../../../components/common/Card';
import { IndoorStackParamList } from '../../../navigation/types';
import { SittingMeasurementState } from './types';
import { 
  SITTING_CONFIG,
  SITTING_STEPS,
  EXERCISE_BENEFITS,
  SAFETY_CAUTIONS,
  EXERCISE_INFO,
  LEG_CONFIG
} from './mock';
import { styles } from './SittingMeasurementScreen.styled';

const SittingMeasurementScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<IndoorStackParamList, 'SittingMeasurement'>>();
  const [state, setState] = useState<SittingMeasurementState>({
    started: false,
    currentSet: 0,
    currentRep: 0,
    currentLeg: 'left',
    isHolding: false,
    holdTimer: SITTING_CONFIG.holdTime,
    isResting: false,
    restTimer: SITTING_CONFIG.restTimeShort,
  });

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
      currentLeg: 'left',
      isHolding: false,
      isResting: false,
    }));
  };

  const handleStartHold = () => {
    setState(prev => ({ ...prev, isHolding: true, holdTimer: SITTING_CONFIG.holdTime }));
    
    intervalRef.current = setInterval(() => {
      setState(prev => {
        if (prev.holdTimer <= 1) {
          handleHoldComplete();
          return { ...prev, holdTimer: SITTING_CONFIG.holdTime };
        }
        return { ...prev, holdTimer: prev.holdTimer - 1 };
      });
    }, 1000);

    // 진행률 애니메이션
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: SITTING_CONFIG.holdTime * 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleHoldComplete = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setState(prev => ({ ...prev, isHolding: false }));
    progressAnim.setValue(0);

    const newRep = state.currentRep + 1;
    setState(prev => ({ ...prev, currentRep: newRep }));

    if (newRep >= SITTING_CONFIG.repsPerSet) {
      // 한쪽 다리 세트 완료
      if (state.currentLeg === 'left') {
        // 왼쪽 다리 완료, 오른쪽 다리로 전환
        setState(prev => ({ ...prev, currentLeg: 'right', currentRep: 0 }));
        startRestTimer(SITTING_CONFIG.restTimeShort); // 15초 휴식
      } else {
        // 오른쪽 다리도 완료, 전체 세트 완료
        if (state.currentSet >= SITTING_CONFIG.totalSets) {
          // 모든 세트 완료
          Alert.alert(
            '운동 완료! 🎉',
            `앉아서 다리 운동 ${SITTING_CONFIG.totalSets}세트를 모두 완료하셨습니다!\n\n허벅지 근력이 향상되었어요.`,
            [
              {
                text: '확인',
                onPress: () => {
                  setState({
                    started: false,
                    currentSet: 0,
                    currentRep: 0,
                    currentLeg: 'left',
                    isHolding: false,
                    holdTimer: SITTING_CONFIG.holdTime,
                    isResting: false,
                    restTimer: SITTING_CONFIG.restTimeShort,
                  });
                  navigation.navigate('HealthCheck', {
                    exerciseName: '앉아서 다리 운동',
                    exerciseType: 'sitting'
                  });
                },
              },
            ]
          );
        } else {
          // 다음 세트로
          setState(prev => ({ 
            ...prev, 
            currentSet: prev.currentSet + 1, 
            currentLeg: 'left', 
            currentRep: 0 
          }));
          startRestTimer(SITTING_CONFIG.restTimeLong); // 30초 휴식
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
              currentLeg: 'left',
              isHolding: false,
              holdTimer: SITTING_CONFIG.holdTime,
              isResting: false,
              restTimer: SITTING_CONFIG.restTimeShort,
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

  const getTotalProgress = () => {
    const completedSets = (state.currentSet - 1) * 2; // 한 세트당 양쪽 다리
    const currentSetProgress = state.currentLeg === 'right' ? 1 : 0;
    const currentRepProgress = state.currentRep / SITTING_CONFIG.repsPerSet;
    return ((completedSets + currentSetProgress + currentRepProgress) / (SITTING_CONFIG.totalSets * 2)) * 100;
  };

  const currentLegConfig = LEG_CONFIG[state.currentLeg];

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
                    <Text style={styles.statValue}>{SITTING_CONFIG.totalSets}</Text>
                    <Text style={styles.statLabel}>세트</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{SITTING_CONFIG.repsPerSet}</Text>
                    <Text style={styles.statLabel}>회/다리</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{SITTING_CONFIG.estimatedDuration}</Text>
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
                  {SITTING_STEPS.map((step) => (
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
                  {SAFETY_CAUTIONS.map((caution, index) => (
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
                    {state.currentSet}세트 - {currentLegConfig.name}다리
                  </Text>
                  <Text style={styles.progressSubtitle}>
                    {SITTING_CONFIG.totalSets}세트 중 {state.currentSet}세트 진행 중
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
                    <Text style={styles.statusTitle}>잠시 휴식하세요</Text>
                    <Text style={styles.statusSubtitle}>다음 동작까지</Text>
                    <Text style={styles.timerText}>{state.restTimer}초</Text>
                    <Text style={styles.statusInstruction}>
                      {state.currentLeg === 'right' && state.currentSet < SITTING_CONFIG.totalSets 
                        ? `잠시 후 ${state.currentSet + 1}세트를 시작합니다`
                        : `잠시 후 ${currentLegConfig.name}다리 운동을 시작합니다`}
                    </Text>
                  </View>
                ) : state.isHolding ? (
                  <View style={styles.statusContent}>
                    <Text style={styles.statusTitle}>자세 유지 중</Text>
                    <Text style={styles.statusSubtitle}>
                      {currentLegConfig.name}다리 - {state.currentRep + 1}회
                    </Text>
                    <Text style={styles.timerText}>{state.holdTimer}초</Text>
                    
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
                    
                    <Text style={styles.statusInstruction}>
                      다리를 곧게 편 상태로 허벅지에 힘을 주세요
                    </Text>
                  </View>
                ) : (
                  <View style={styles.statusContent}>
                    <Text style={styles.statusTitle}>준비하세요</Text>
                    <Text style={styles.statusSubtitle}>
                      {currentLegConfig.name}다리 - {state.currentRep + 1}회
                    </Text>
                    
                    <View style={styles.exerciseIconContainer}>
                      <Text style={styles.currentExerciseIcon}>{currentLegConfig.emoji}</Text>
                    </View>
                    
                    <View style={styles.instructionContainer}>
                      <Text style={styles.instructionText}>
                        {currentLegConfig.name}다리를 천천히 곧게 펴서{'\n'}
                        수평이 되도록 들어올린 후{'\n'}
                        준비가 되면 시작 버튼을 눌러주세요
                      </Text>
                    </View>
                    
                    <TouchableOpacity style={styles.holdButton} onPress={handleStartHold}>
                      <Text style={styles.holdButtonText}>자세 유지 시작</Text>
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

export default SittingMeasurementScreen;
