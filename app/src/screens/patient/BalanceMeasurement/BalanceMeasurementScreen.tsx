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
import { BalanceMeasurementState } from './types';
import { 
  BALANCE_CONFIG,
  BALANCE_STEPS,
  EXERCISE_BENEFITS,
  SAFETY_CAUTIONS,
  EXERCISE_INFO,
  FOOT_CONFIG
} from './mock';
import { styles } from './BalanceMeasurementScreen.styled';

const BalanceMeasurementScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<IndoorStackParamList, 'BalanceMeasurement'>>();
  const [state, setState] = useState<BalanceMeasurementState>({
    started: false,
    currentSet: 0,
    currentFoot: 'left',
    isHolding: false,
    holdTimer: BALANCE_CONFIG.holdTime,
    isResting: false,
    restTimer: BALANCE_CONFIG.restTimeShort,
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
      currentFoot: 'left',
      isHolding: false,
      isResting: false,
    }));
  };

  const handleStartBalance = () => {
    setState(prev => ({ ...prev, isHolding: true, holdTimer: BALANCE_CONFIG.holdTime }));
    
    intervalRef.current = setInterval(() => {
      setState(prev => {
        if (prev.holdTimer <= 1) {
          handleBalanceComplete();
          return { ...prev, holdTimer: BALANCE_CONFIG.holdTime };
        }
        return { ...prev, holdTimer: prev.holdTimer - 1 };
      });
    }, 1000);

    // 진행률 애니메이션
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: BALANCE_CONFIG.holdTime * 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleBalanceComplete = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setState(prev => ({ ...prev, isHolding: false }));
    progressAnim.setValue(0);

    if (state.currentFoot === 'left') {
      // 왼발 완료, 오른발로 전환
      setState(prev => ({ ...prev, currentFoot: 'right' }));
      startRestTimer(BALANCE_CONFIG.restTimeShort); // 10초 휴식
    } else {
      // 오른발도 완료, 한 세트 완료
      if (state.currentSet >= BALANCE_CONFIG.totalSets) {
        // 모든 세트 완료
        Alert.alert(
          '운동 완료! 🎉',
          `균형 운동 ${BALANCE_CONFIG.totalSets}세트를 모두 완료하셨습니다!\n\n균형감각이 크게 향상되었어요.`,
          [
            {
              text: '확인',
              onPress: () => {
                setState({
                  started: false,
                  currentSet: 0,
                  currentFoot: 'left',
                  isHolding: false,
                  holdTimer: BALANCE_CONFIG.holdTime,
                  isResting: false,
                  restTimer: BALANCE_CONFIG.restTimeShort,
                });
                navigation.navigate('HealthCheck', {
                  exerciseName: '균형 운동',
                  exerciseType: 'balance'
                });
              },
            },
          ]
        );
      } else {
        // 다음 세트로
        setState(prev => ({ ...prev, currentSet: prev.currentSet + 1, currentFoot: 'left' }));
        startRestTimer(BALANCE_CONFIG.restTimeLong); // 30초 휴식
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
              currentFoot: 'left',
              isHolding: false,
              holdTimer: BALANCE_CONFIG.holdTime,
              isResting: false,
              restTimer: BALANCE_CONFIG.restTimeShort,
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
    const completedSets = (state.currentSet - 1) * 2; // 한 세트당 양발
    const currentSetProgress = state.currentFoot === 'right' ? 1 : 0;
    return ((completedSets + currentSetProgress) / (BALANCE_CONFIG.totalSets * 2)) * 100;
  };

  const currentFootConfig = FOOT_CONFIG[state.currentFoot];

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
                    <Text style={styles.statValue}>{BALANCE_CONFIG.totalSets}</Text>
                    <Text style={styles.statLabel}>세트</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{BALANCE_CONFIG.holdTime}초</Text>
                    <Text style={styles.statLabel}>유지시간</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{BALANCE_CONFIG.estimatedDuration}</Text>
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
                  {BALANCE_STEPS.map((step) => (
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
                    {state.currentSet}세트 - {currentFootConfig.name} 균형
                  </Text>
                  <Text style={styles.progressSubtitle}>
                    {BALANCE_CONFIG.totalSets}세트 중 {state.currentSet}세트 진행 중
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
                      {state.currentFoot === 'right' && state.currentSet < BALANCE_CONFIG.totalSets 
                        ? `잠시 후 ${state.currentSet + 1}세트를 시작합니다`
                        : `잠시 후 ${currentFootConfig.name} 균형 운동을 시작합니다`}
                    </Text>
                  </View>
                ) : state.isHolding ? (
                  <View style={styles.statusContent}>
                    <Text style={styles.statusTitle}>균형 유지 중</Text>
                    <Text style={styles.statusSubtitle}>
                      {currentFootConfig.name} 균형 잡기
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
                      {currentFootConfig.name}로 균형을 잡으며 중심을 유지하세요
                    </Text>
                  </View>
                ) : (
                  <View style={styles.statusContent}>
                    <Text style={styles.statusTitle}>준비하세요</Text>
                    <Text style={styles.statusSubtitle}>
                      {currentFootConfig.name} 균형 잡기
                    </Text>
                    
                    <View style={styles.exerciseIconContainer}>
                      <Text style={styles.currentExerciseIcon}>
                        {currentFootConfig.emoji}
                      </Text>
                    </View>
                    
                    <View style={styles.instructionContainer}>
                      <Text style={styles.instructionText}>
                        {currentFootConfig.name}로 서서 균형을 잡은 후{'\n'}
                        준비가 되면 시작 버튼을 눌러주세요{'\n'}
                        벽이나 안정적인 물체 근처에서 실시하세요
                      </Text>
                    </View>
                    
                    <TouchableOpacity style={styles.balanceButton} onPress={handleStartBalance}>
                      <Text style={styles.balanceButtonText}>균형 잡기 시작</Text>
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

export default BalanceMeasurementScreen;
