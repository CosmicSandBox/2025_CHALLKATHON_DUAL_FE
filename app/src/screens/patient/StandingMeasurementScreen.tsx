import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import Card from '../../components/common/Card';
import { IndoorStackParamList } from '../../navigation/types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

const { width: screenWidth } = Dimensions.get('window');
const TOTAL_SETS = 3;
const REPS_PER_SET = 8;

const StandingMeasurementScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<IndoorStackParamList, 'StandingMeasurement'>>();
  const [started, setStarted] = useState(false);
  const [currentSet, setCurrentSet] = useState(0);
  const [currentRep, setCurrentRep] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(60);
  const [currentPhase, setCurrentPhase] = useState<'sitting' | 'standing'>('sitting');

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
    setCurrentRep(0);
    setCurrentPhase('sitting');
    setIsResting(false);
  };

  const handleRep = () => {
    if (currentPhase === 'sitting') {
      // 일어서기 동작
      setCurrentPhase('standing');
    } else {
      // 앉기 동작 완료 - 1회 완료
      const newRep = currentRep + 1;
      setCurrentRep(newRep);
      setCurrentPhase('sitting');

      // 진행률 애니메이션
      const progress = newRep / REPS_PER_SET;
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start();

      if (newRep >= REPS_PER_SET) {
        // 한 세트 완료
        if (currentSet >= TOTAL_SETS) {
          // 모든 세트 완료
          Alert.alert(
            '운동 완료! 🎉',
            `서서하기 운동 ${TOTAL_SETS}세트를 모두 완료하셨습니다!\n\n하체 근력이 크게 향상되었어요.`,
            [
              {
                text: '확인',
                onPress: () => {
                  setStarted(false);
                  navigation.goBack();
                },
              },
            ]
          );
        } else {
          // 다음 세트로
          setCurrentSet(currentSet + 1);
          setCurrentRep(0);
          progressAnim.setValue(0);
          startRestTimer(60); // 60초 휴식
        }
      }
    }
  };

  const startRestTimer = (seconds: number) => {
    setIsResting(true);
    setRestTimer(seconds);
    
    intervalRef.current = setInterval(() => {
      setRestTimer((prev) => {
        if (prev <= 1) {
          setIsResting(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return seconds;
        }
        return prev - 1;
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
            setStarted(false);
            setCurrentSet(0);
            setCurrentRep(0);
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

  const getTotalProgress = () => ((currentSet - 1) * REPS_PER_SET + currentRep) / (TOTAL_SETS * REPS_PER_SET) * 100;
  const getPhaseText = () => currentPhase === 'sitting' ? '앉은 자세' : '선 자세';
  const getActionText = () => currentPhase === 'sitting' ? '일어서기' : '앉기';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="chevron-left" size={28} color="#A3A8AF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>서서하기 운동</Text>
          <Text style={styles.headerSubtitle}>하체 근력 강화와 기능적 움직임</Text>
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
                    <Text style={styles.iconText}>💪</Text>
                  </View>
                  <View style={styles.introInfo}>
                    <Text style={styles.introTitle}>서서하기 운동</Text>
                    <Text style={styles.introDescription}>의자에서 일어서고 앉기를 반복하여 하체 근력을 강화하는 기능적 운동</Text>
                  </View>
                </View>
                <View style={styles.exerciseStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{TOTAL_SETS}</Text>
                    <Text style={styles.statLabel}>세트</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{REPS_PER_SET}</Text>
                    <Text style={styles.statLabel}>회/세트</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>~10분</Text>
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
                  {[
                    '의자에 앉아 양발을 어깨너비로 벌리고 발을 바닥에 평평하게 둡니다',
                    '팔을 앞으로 뻗거나 가슴 앞에서 교차시킵니다',
                    '상체를 약간 앞으로 기울이며 천천히 일어섭니다',
                    '완전히 선 상태에서 잠시 멈춘 후 천천히 앉습니다',
                  ].map((step, index) => (
                    <View key={index} style={styles.stepItem}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.stepText}>{step}</Text>
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
                  {['하체 근력 강화', '일상 동작 개선', '균형감각 향상', '낙상 예방'].map((benefit, index) => (
                    <View key={index} style={styles.benefitItem}>
                      <Text style={styles.benefitIcon}>✓</Text>
                      <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                  ))}
                </Card>
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.sectionTitle}>주의사항</Text>
                <Card style={styles.cautionCard}>
                  {['무릎 통증 시 중단', '천천히 움직이기', '안정적인 의자 사용'].map((caution, index) => (
                    <View key={index} style={styles.cautionItem}>
                      <Text style={styles.cautionIcon}>⚠️</Text>
                      <Text style={styles.cautionText}>{caution}</Text>
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
                    {currentSet}세트 - {currentRep + 1}번째
                  </Text>
                  <Text style={styles.progressSubtitle}>
                    {TOTAL_SETS}세트 중 {currentSet}세트 진행 중
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
                    <Text style={styles.statusTitle}>휴식 시간</Text>
                    <Text style={styles.statusSubtitle}>다음 세트까지</Text>
                    <Text style={styles.timerText}>{restTimer}초</Text>
                    <Text style={styles.statusInstruction}>
                      충분히 휴식을 취하고 다음 세트를 준비하세요
                    </Text>
                  </View>
                ) : (
                  <View style={styles.statusContent}>
                    <Text style={styles.statusTitle}>{getPhaseText()}</Text>
                    <Text style={styles.statusSubtitle}>
                      {currentRep}/{REPS_PER_SET}회 완료
                    </Text>
                    
                    <View style={styles.exerciseIconContainer}>
                      <Text style={styles.currentExerciseIcon}>
                        {currentPhase === 'sitting' ? '🪑' : '🧍‍♂️'}
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
                        {currentPhase === 'sitting' 
                          ? '팔을 앞으로 뻗고 천천히 일어서세요' 
                          : '천천히 앉으면서 1회를 완료하세요'}
                      </Text>
                    </View>
                    
                    <TouchableOpacity style={styles.repButton} onPress={handleRep}>
                      <Text style={styles.repButtonText}>{getActionText()}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
  stopButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  introCard: {
    padding: 20,
  },
  introHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FEF3E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 30,
  },
  introInfo: {
    flex: 1,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  introDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  exerciseStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
  },
  methodCard: {
    padding: 20,
  },
  stepList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3182F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  twoColumnSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  benefitCard: {
    padding: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitIcon: {
    fontSize: 14,
    color: '#10B981',
    marginRight: 8,
    fontWeight: '700',
  },
  benefitText: {
    fontSize: 13,
    color: '#374151',
  },
  cautionCard: {
    padding: 16,
    backgroundColor: '#FEF3F2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
  },
  cautionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cautionIcon: {
    fontSize: 12,
    marginRight: 8,
  },
  cautionText: {
    fontSize: 13,
    color: '#DC2626',
  },
  startButton: {
    backgroundColor: '#3182F6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3182F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 8,
  },
  startButtonIcon: {
    marginLeft: 4,
  },
  progressCard: {
    padding: 20,
  },
  progressHeader: {
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginRight: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    minWidth: 40,
    textAlign: 'right',
  },
  statusCard: {
    padding: 24,
    alignItems: 'center',
  },
  statusContent: {
    alignItems: 'center',
    width: '100%',
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  timerText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#3182F6',
    marginBottom: 16,
  },
  exerciseIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentExerciseIcon: {
    fontSize: 40,
  },
  animationBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  animationBar: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  statusInstruction: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  instructionContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    width: '100%',
  },
  instructionText: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 20,
  },
  repButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  repButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default StandingMeasurementScreen;