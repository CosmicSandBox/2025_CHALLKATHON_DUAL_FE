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
import { Feather } from '@expo/vector-icons';
import Card from '../../../components/common/Card';
import { styles } from './StretchingMeasurementScreen.styled';
import { recordSimpleExercise } from '../../../api';
import { 
  StretchingMeasurementScreenNavigationProp,
  SideType,
  ExerciseState
} from './types';
import { exerciseConstants, exerciseSteps, benefits, cautions } from './mock';

const StretchingMeasurementScreen: React.FC = () => {
  const navigation = useNavigation<StretchingMeasurementScreenNavigationProp>();
  const [started, setStarted] = useState(false);
  const [currentSet, setCurrentSet] = useState(0);
  const [currentSide, setCurrentSide] = useState<SideType>('left');
  const [isHolding, setIsHolding] = useState(false);
  const [holdTimer, setHoldTimer] = useState(exerciseConstants.holdTime);
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(exerciseConstants.restTime);
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
    setStarted(true);
    setCurrentSet(1);
    setCurrentSide('left');
    setIsHolding(false);
    setIsResting(false);
    setHoldTimer(exerciseConstants.holdTime);
    setStartTime(Date.now()); // 시작 시간 기록
  };

  const handleStartHold = () => {
    setIsHolding(true);
    setHoldTimer(exerciseConstants.holdTime);
    
    intervalRef.current = setInterval(() => {
      setHoldTimer((prev) => {
        if (prev <= 1) {
          handleHoldComplete();
          return exerciseConstants.holdTime;
        }
        return prev - 1;
      });
    }, 1000);

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: exerciseConstants.holdTime * 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleHoldComplete = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsHolding(false);
    progressAnim.setValue(0);

    if (currentSide === 'left') {
      setCurrentSide('right');
      setIsResting(true);
      setRestTimer(exerciseConstants.shortRestTime);
      
      intervalRef.current = setInterval(() => {
        setRestTimer((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return exerciseConstants.restTime;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (currentSet >= exerciseConstants.totalSets) {
        // 운동 완료 - API 호출
        try {
          setIsSubmitting(true);
          
          const totalDuration = startTime ? Math.max(1, Math.floor((Date.now() - startTime) / 60000)) : 5; // 분 단위
          
          const exerciseRecord = {
            exerciseId: 2, // 다리 스트레칭 운동 ID
            durationMinutes: totalDuration,
            notes: `다리 스트레칭 ${exerciseConstants.totalSets}세트 완료`
          };

          console.log('스트레칭 운동 기록 전송:', exerciseRecord);
          
          const result = await recordSimpleExercise(exerciseRecord);
          console.log('스트레칭 운동 기록 성공:', result);

          Alert.alert(
            '운동 완료! 🎉',
            `다리 스트레칭 ${exerciseConstants.totalSets}세트를 모두 완료하셨습니다!\n\n오늘의 목표를 달성했어요.`,
            [
              {
                text: '확인',
                onPress: () => {
                  setStarted(false);
                  navigation.navigate('HealthCheck', {
                    exerciseName: '다리 스트레칭',
                    exerciseType: 'stretching',
                    exerciseData: {
                      duration: totalDuration * 60, // 초 단위로 변환
                      sets: exerciseConstants.totalSets
                    }
                  });
                },
              },
            ]
          );
        } catch (error) {
          console.error('스트레칭 운동 기록 저장 실패:', error);
          
          Alert.alert(
            '운동 완료! 🎉',
            `다리 스트레칭 ${exerciseConstants.totalSets}세트를 모두 완료하셨습니다!\n\n기록 저장에는 실패했지만 건강 체크는 계속 진행됩니다.`,
            [
              {
                text: '확인',
                onPress: () => {
                  setStarted(false);
                  navigation.navigate('HealthCheck', {
                    exerciseName: '다리 스트레칭',
                    exerciseType: 'stretching',
                    exerciseData: {
                      duration: 5 * 60, // 기본값 5분
                      sets: exerciseConstants.totalSets
                    }
                  });
                },
              },
            ]
          );
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setCurrentSet(currentSet + 1);
        setCurrentSide('left');
        setIsResting(true);
        setRestTimer(exerciseConstants.restTime);
        
        intervalRef.current = setInterval(() => {
          setRestTimer((prev) => {
            if (prev <= 1) {
              setIsResting(false);
              if (intervalRef.current) clearInterval(intervalRef.current);
              return exerciseConstants.restTime;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }
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
            setStarted(false);
            setCurrentSet(0);
            setIsHolding(false);
            setIsResting(false);
            progressAnim.setValue(0);
          },
        },
      ]
    );
  };

  const handleGoBack = () => {
    if (started) {
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

  const getSideText = (side: SideType) => side === 'left' ? '왼쪽' : '오른쪽';
  const getTotalProgress = () => ((currentSet - 1) * 2 + (currentSide === 'right' ? 1 : 0)) / (exerciseConstants.totalSets * 2) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="chevron-left" size={28} color="#A3A8AF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>다리 스트레칭</Text>
          <Text style={styles.headerSubtitle}>근육 이완과 유연성 향상</Text>
        </View>
        {started && (
          <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
            <Feather name="x" size={24} color="#EF4444" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {!started ? (
          <>
            {/* 운동 소개 카드 */}
            <View style={styles.section}>
              <Card style={styles.introCard}>
                <View style={styles.introHeader}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.iconText}>🧘‍♀️</Text>
                  </View>
                  <View style={styles.introInfo}>
                    <Text style={styles.introTitle}>다리 스트레칭</Text>
                    <Text style={styles.introDescription}>종아리와 허벅지 근육을 부드럽게 늘려주는 운동</Text>
                  </View>
                </View>
                <View style={styles.exerciseStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{exerciseConstants.totalSets}</Text>
                    <Text style={styles.statLabel}>세트</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{exerciseConstants.holdTime}초</Text>
                    <Text style={styles.statLabel}>유지</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>~5분</Text>
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
                  {exerciseSteps.map((step, index) => (
                    <View key={index} style={styles.stepItem}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.stepText}>{step.text}</Text>
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
                  {benefits.map((benefit, index) => (
                    <View key={index} style={styles.benefitItem}>
                      <Text style={styles.benefitIcon}>✓</Text>
                      <Text style={styles.benefitText}>{benefit.text}</Text>
                    </View>
                  ))}
                </Card>
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.sectionTitle}>주의사항</Text>
                <Card style={styles.cautionCard}>
                  {cautions.map((caution, index) => (
                    <View key={index} style={styles.cautionItem}>
                      <Text style={styles.cautionIcon}>⚠️</Text>
                      <Text style={styles.cautionText}>{caution.text}</Text>
                    </View>
                  ))}
                </Card>
              </View>
            </View>

            {/* 시작 버튼 */}
            <View style={styles.section}>
              <TouchableOpacity style={styles.startButton} onPress={handleStart}>
                <Text style={styles.startButtonText}>스트레칭 시작하기</Text>
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
                    {currentSet}세트 - {getSideText(currentSide)}다리
                  </Text>
                  <Text style={styles.progressSubtitle}>
                    {exerciseConstants.totalSets}세트 중 {currentSet}세트 진행 중
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
                {isResting ? (
                  <View style={styles.statusContent}>
                    <Text style={styles.statusTitle}>잠시 휴식하세요</Text>
                    <Text style={styles.statusSubtitle}>다음 동작까지</Text>
                    <Text style={styles.timerText}>{restTimer}초</Text>
                    <Text style={styles.statusInstruction}>
                      {currentSide === 'right' && currentSet < exerciseConstants.totalSets 
                        ? `잠시 후 ${currentSet + 1}세트를 시작합니다`
                        : '잠시 후 오른쪽 다리로 진행합니다'}
                    </Text>
                  </View>
                ) : isHolding ? (
                  <View style={styles.statusContent}>
                    <Text style={styles.statusTitle}>자세 유지 중</Text>
                    <Text style={styles.statusSubtitle}>
                      {getSideText(currentSide)}다리 스트레칭
                    </Text>
                    <Text style={styles.timerText}>{holdTimer}초</Text>
                    
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
                      종아리 근육이 늘어나는 것을 느끼며 자세를 유지하세요
                    </Text>
                  </View>
                ) : (
                  <View style={styles.statusContent}>
                    <Text style={styles.statusTitle}>준비하세요</Text>
                    <Text style={styles.statusSubtitle}>
                      {getSideText(currentSide)}다리 스트레칭
                    </Text>
                    <View style={styles.instructionContainer}>
                      <Text style={styles.instructionText}>
                        {getSideText(currentSide)}다리를 뒤로 뻗고{'\n'}
                        발뒤꿈치를 바닥에 붙인 후{'\n'}
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

export default StretchingMeasurementScreen;
