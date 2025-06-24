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
const HOLD_TIME = 15; // 초

const BalanceMeasurementScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<IndoorStackParamList, 'BalanceMeasurement'>>();
  const [started, setStarted] = useState(false);
  const [currentSet, setCurrentSet] = useState(0);
  const [currentFoot, setCurrentFoot] = useState<'left' | 'right'>('left');
  const [isHolding, setIsHolding] = useState(false);
  const [holdTimer, setHoldTimer] = useState(HOLD_TIME);
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(30);

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
    setCurrentFoot('left');
    setIsHolding(false);
    setIsResting(false);
  };

  const handleStartBalance = () => {
    setIsHolding(true);
    setHoldTimer(HOLD_TIME);
    
    intervalRef.current = setInterval(() => {
      setHoldTimer((prev) => {
        if (prev <= 1) {
          handleBalanceComplete();
          return HOLD_TIME;
        }
        return prev - 1;
      });
    }, 1000);

    // 진행률 애니메이션
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: HOLD_TIME * 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleBalanceComplete = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsHolding(false);
    progressAnim.setValue(0);

    if (currentFoot === 'left') {
      // 왼발 완료, 오른발로 전환
      setCurrentFoot('right');
      startRestTimer(10); // 10초 휴식
    } else {
      // 오른발도 완료, 한 세트 완료
      if (currentSet >= TOTAL_SETS) {
        // 모든 세트 완료
        Alert.alert(
          '운동 완료! 🎉',
          `균형 운동 ${TOTAL_SETS}세트를 모두 완료하셨습니다!\n\n균형감각이 크게 향상되었어요.`,
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
        setCurrentFoot('left');
        startRestTimer(30); // 30초 휴식
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

  const getFootText = (foot: 'left' | 'right') => foot === 'left' ? '왼발' : '오른발';
  const getTotalProgress = () => {
    const completedSets = (currentSet - 1) * 2; // 한 세트당 양발
    const currentSetProgress = currentFoot === 'right' ? 1 : 0;
    return ((completedSets + currentSetProgress) / (TOTAL_SETS * 2)) * 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="chevron-left" size={28} color="#A3A8AF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>균형 운동</Text>
          <Text style={styles.headerSubtitle}>균형감각과 안정성 향상</Text>
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
                    <Text style={styles.iconText}>⚖️</Text>
                  </View>
                  <View style={styles.introInfo}>
                    <Text style={styles.introTitle}>균형 운동</Text>
                    <Text style={styles.introDescription}>한 발로 서서 균형감각을 기르고 낙상을 예방하는 운동</Text>
                  </View>
                </View>
                <View style={styles.exerciseStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{TOTAL_SETS}</Text>
                    <Text style={styles.statLabel}>세트</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{HOLD_TIME}초</Text>
                    <Text style={styles.statLabel}>유지시간</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>~8분</Text>
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
                    '벽이나 안정적인 물체 근처에 서서 준비합니다',
                    '두 발을 모으고 똑바로 선 자세를 취합니다',
                    '한쪽 발을 바닥에서 들어올려 균형을 잡습니다',
                    '15초간 자세를 유지한 후 반대쪽 발로 반복합니다',
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
                  {['균형감각 향상', '낙상 예방', '하체 안정성', '자신감 향상'].map((benefit, index) => (
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
                  {['벽 근처에서 실시', '어지러움 시 중단', '보호자와 함께'].map((caution, index) => (
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
                    {currentSet}세트 - {getFootText(currentFoot)} 균형
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
                    <Text style={styles.statusTitle}>잠시 휴식하세요</Text>
                    <Text style={styles.statusSubtitle}>다음 동작까지</Text>
                    <Text style={styles.timerText}>{restTimer}초</Text>
                    <Text style={styles.statusInstruction}>
                      {currentFoot === 'right' && currentSet < TOTAL_SETS 
                        ? `잠시 후 ${currentSet + 1}세트를 시작합니다`
                        : `잠시 후 ${getFootText(currentFoot)} 균형 운동을 시작합니다`}
                    </Text>
                  </View>
                ) : isHolding ? (
                  <View style={styles.statusContent}>
                    <Text style={styles.statusTitle}>균형 유지 중</Text>
                    <Text style={styles.statusSubtitle}>
                      {getFootText(currentFoot)} 균형 잡기
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
                      {getFootText(currentFoot)}로 균형을 잡으며 중심을 유지하세요
                    </Text>
                  </View>
                ) : (
                  <View style={styles.statusContent}>
                    <Text style={styles.statusTitle}>준비하세요</Text>
                    <Text style={styles.statusSubtitle}>
                      {getFootText(currentFoot)} 균형 잡기
                    </Text>
                    
                    <View style={styles.exerciseIconContainer}>
                      <Text style={styles.currentExerciseIcon}>
                        {currentFoot === 'left' ? '🦵' : '🦶'}
                      </Text>
                    </View>
                    
                    <View style={styles.instructionContainer}>
                      <Text style={styles.instructionText}>
                        {getFootText(currentFoot)}로 서서 균형을 잡은 후{'\n'}
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
    backgroundColor: '#FEF7E6',
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
    backgroundColor: '#FEF7E6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    width: '100%',
    borderColor: '#F59E0B',
    borderWidth: 1,
  },
  instructionText: {
    fontSize: 14,
    color: '#92400E',
    textAlign: 'center',
    lineHeight: 20,
  },
  balanceButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default BalanceMeasurementScreen;