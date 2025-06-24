import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Card from '../../components/common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { IndoorStackParamList } from '../../navigation/types';
import { Feather } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

type IndoorExerciseScreenNavigationProp = NativeStackNavigationProp<IndoorStackParamList, 'IndoorToday'>;

const IndoorExerciseScreen: React.FC = () => {
  const navigation = useNavigation<IndoorExerciseScreenNavigationProp>();
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: '전체', icon: '🏠' },
    { id: 'walking', name: '걷기', icon: '🚶‍♂️' },
    { id: 'strength', name: '근력', icon: '💪' },
    { id: 'balance', name: '균형', icon: '⚖️' },
  ];

  const exercises = [
    {
      id: '1',
      name: '가벼운 걷기',
      description: '실내에서 안전하게 걷기 운동',
      duration: '10-15분',
      difficulty: '쉬움',
      icon: '🚶‍♂️',
      color: '#00D4AA',
      category: 'walking',
      target: '걸음 수 측정',
      benefits: ['근력 강화', '균형 감각 향상', '혈액순환 개선'],
      lastCompleted: '2시간 전',
      recommended: true,
      type: 'essential', // 필수 운동
    },
    {
      id: '2',
      name: '다리 스트레칭',
      description: '다리 근육 이완과 유연성 향상',
      duration: '8-10분',
      difficulty: '쉬움',
      icon: '🧘‍♀️',
      color: '#3182F6',
      category: 'strength',
      target: '관절 가동범위 측정',
      benefits: ['근육 이완', '관절 유연성', '통증 완화'],
      lastCompleted: '1일 전',
      recommended: false,
      type: 'essential', // 필수 운동
    },
    {
      id: '6',
      name: '걷기 보조 운동',
      description: '걷기 전 준비 운동',
      duration: '5-8분',
      difficulty: '쉬움',
      icon: '🦯',
      color: '#6B7280',
      category: 'walking',
      target: '보행 능력 측정',
      benefits: ['보행 개선', '자신감 향상', '안전성'],
      lastCompleted: '30분 전',
      recommended: false,
      type: 'essential', // 필수 운동
    },
    {
      id: '3',
      name: '서서하기 운동',
      description: '서서하는 다리 근력 강화 운동',
      duration: '12-15분',
      difficulty: '보통',
      icon: '💪',
      color: '#FF6B35',
      category: 'strength',
      target: '근력 측정',
      benefits: ['근력 강화', '균형 감각', '일상생활 개선'],
      lastCompleted: '3일 전',
      recommended: true,
      type: 'optional', // 함께하면 좋아요
    },
    {
      id: '4',
      name: '앉아서 다리 운동',
      description: '앉은 자세에서 하는 다리 운동',
      duration: '10-12분',
      difficulty: '쉬움',
      icon: '🪑',
      color: '#8B5CF6',
      category: 'strength',
      target: '근력 측정',
      benefits: ['근력 강화', '안정성', '통증 완화'],
      lastCompleted: '5시간 전',
      recommended: false,
      type: 'optional', // 함께하면 좋아요
    },
    {
      id: '5',
      name: '균형 운동',
      description: '균형 감각과 안정성 향상',
      duration: '8-10분',
      difficulty: '보통',
      icon: '⚖️',
      color: '#F59E0B',
      category: 'balance',
      target: '균형 측정',
      benefits: ['균형 감각', '안정성', '낙상 예방'],
      lastCompleted: '1주일 전',
      recommended: true,
      type: 'optional', // 함께하면 좋아요
    },
  ];

  const todayStats = {
    completed: 2,
    total: 3, // 필수 운동 3개로 변경
    time: 25,
    streak: 5,
    weeklyGoal: 80,
  };

  const filteredExercises = selectedCategory === 'all' 
    ? exercises 
    : exercises.filter(exercise => exercise.category === selectedCategory);

  // 운동을 타입별로 분류
  const essentialExercises = filteredExercises.filter(exercise => exercise.type === 'essential');
  const optionalExercises = filteredExercises.filter(exercise => exercise.type === 'optional');

  const handleExercisePress = (exerciseId: string) => {
    setSelectedExercise(exerciseId);
  };

  const handleExerciseStart = (exerciseId: string) => {
    const exercise = exercises.find(e => e.id === exerciseId);
    if (!exercise) return;

    switch (exerciseId) {
      case '1':
        navigation.navigate('WalkingMeasurement' as never);
        break;
      case '2':
        navigation.navigate('StretchingMeasurement' as never);
        break;
      case '3':
        navigation.navigate('StandingMeasurement' as never);
        break;
      case '4':
        navigation.navigate('SittingMeasurement' as never);
        break;
      case '5':
        navigation.navigate('BalanceMeasurement' as never);
        break;
      case '6':
        navigation.navigate('WalkingSupportMeasurement' as never);
        break;
      default:
        Alert.alert('준비 중', '해당 운동 측정 기능은 준비 중입니다.');
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedExercise(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="chevron-left" size={28} color="#A3A8AF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>실내 재활 운동</Text>
          <Text style={styles.headerSubtitle}>오늘도 건강한 하루를 시작해보세요</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Today's Summary Card */}
        <View style={styles.summarySection}>
          <Card style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <View style={styles.summaryTitleContainer}>
                <Text style={styles.summaryTitle}>오늘의 진행상황</Text>
                <View style={styles.streakContainer}>
                  <Text style={styles.streakIcon}>🔥</Text>
                  <Text style={styles.streakText}>{todayStats.streak}일 연속</Text>
                </View>
              </View>
              <View style={styles.progressCircle}>
                <Text style={styles.progressText}>{todayStats.weeklyGoal}%</Text>
                <Text style={styles.progressLabel}>주간 목표</Text>
              </View>
            </View>
            
            <View style={styles.summaryStats}>
              <View style={styles.summaryStat}>
                <Text style={styles.summaryStatValue}>{todayStats.completed}/{todayStats.total}</Text>
                <Text style={styles.summaryStatLabel}>완료</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryStat}>
                <Text style={styles.summaryStatValue}>{todayStats.time}분</Text>
                <Text style={styles.summaryStatLabel}>총 시간</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryStat}>
                <Text style={styles.summaryStatValue}>67%</Text>
                <Text style={styles.summaryStatLabel}>완료율</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Category Filter */}
        <View style={styles.categorySection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Exercise List */}
        <View style={styles.exerciseSection}>
          {/* 필수 운동 섹션 */}
          {essentialExercises.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>필수 운동</Text>
                <Text style={styles.exerciseCount}>{essentialExercises.length}개</Text>
              </View>
              
              <View style={styles.exerciseList}>
                {essentialExercises.map((exercise, index) => (
                  <View key={exercise.id}>
                    <View
                      style={[
                        styles.exerciseCard,
                        selectedExercise === exercise.id && styles.selectedExerciseCard,
                        styles.essentialExerciseCard, // 필수 운동 스타일
                      ]}
                    >
                      <TouchableOpacity
                        style={styles.exerciseContent}
                        onPress={() => handleExercisePress(exercise.id)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.exerciseHeader}>
                          <View style={[styles.exerciseIcon, { backgroundColor: exercise.color + '15' }]}>
                            <Text style={styles.exerciseIconText}>{exercise.icon}</Text>
                          </View>
                          <View style={styles.exerciseInfo}>
                            <View style={styles.exerciseTitleRow}>
                              <Text style={styles.exerciseName}>{exercise.name}</Text>
                              <View style={styles.essentialBadge}>
                                <Text style={styles.essentialText}>필수</Text>
                              </View>
                              {exercise.recommended && (
                                <View style={styles.recommendedBadge}>
                                  <Text style={styles.recommendedText}>추천</Text>
                                </View>
                              )}
                            </View>
                            <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                            <View style={styles.exerciseMeta}>
                              <View style={styles.metaItem}>
                                <Text style={styles.metaIcon}>⏱️</Text>
                                <Text style={styles.metaText}>{exercise.duration}</Text>
                              </View>
                              <View style={styles.metaItem}>
                                <Text style={styles.metaIcon}>📊</Text>
                                <Text style={styles.metaText}>{exercise.difficulty}</Text>
                              </View>
                              <View style={styles.metaItem}>
                                <Text style={styles.metaIcon}>🕐</Text>
                                <Text style={styles.metaText}>{exercise.lastCompleted}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* 인라인 상세 정보 */}
                    {selectedExercise === exercise.id && (
                      <View style={styles.inlineDetailCard}>
                        <View style={styles.detailHeader}>
                          <Text style={styles.detailTitle}>운동 효과</Text>
                          <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={() => setSelectedExercise(null)}
                          >
                            <Text style={styles.closeButtonText}>×</Text>
                          </TouchableOpacity>
                        </View>
                        
                        <View style={styles.benefitsContainer}>
                          <View style={styles.benefitsList}>
                            {exercise.benefits.map((benefit, benefitIndex) => (
                              <View key={benefitIndex} style={styles.benefitItem}>
                                <Text style={styles.benefitIcon}>✓</Text>
                                <Text style={styles.benefitText}>{benefit}</Text>
                              </View>
                            ))}
                          </View>
                        </View>

                        <View style={styles.targetContainer}>
                          <Text style={styles.targetLabel}>측정 항목</Text>
                          <Text style={styles.targetValue}>{exercise.target}</Text>
                        </View>

                        <TouchableOpacity
                          style={styles.startButton}
                          onPress={() => handleExerciseStart(exercise.id)}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.startButtonText}>
                            {exercise.target} 시작하기
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </>
          )}

          {/* 함께하면 좋아요 운동 섹션 */}
          {optionalExercises.length > 0 && (
            <>
              <View style={[styles.sectionHeader, { marginTop: 32 }]}>
                <Text style={styles.sectionTitle}>함께하면 좋아요</Text>
                <Text style={styles.exerciseCount}>{optionalExercises.length}개</Text>
              </View>
              
              <View style={styles.exerciseList}>
                {optionalExercises.map((exercise, index) => (
                  <View key={exercise.id}>
                    <View
                      style={[
                        styles.exerciseCard,
                        selectedExercise === exercise.id && styles.selectedExerciseCard,
                      ]}
                    >
                      <TouchableOpacity
                        style={styles.exerciseContent}
                        onPress={() => handleExercisePress(exercise.id)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.exerciseHeader}>
                          <View style={[styles.exerciseIcon, { backgroundColor: exercise.color + '15' }]}>
                            <Text style={styles.exerciseIconText}>{exercise.icon}</Text>
                          </View>
                          <View style={styles.exerciseInfo}>
                            <View style={styles.exerciseTitleRow}>
                              <Text style={styles.exerciseName}>{exercise.name}</Text>
                              {exercise.recommended && (
                                <View style={styles.recommendedBadge}>
                                  <Text style={styles.recommendedText}>추천</Text>
                                </View>
                              )}
                            </View>
                            <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                            <View style={styles.exerciseMeta}>
                              <View style={styles.metaItem}>
                                <Text style={styles.metaIcon}>⏱️</Text>
                                <Text style={styles.metaText}>{exercise.duration}</Text>
                              </View>
                              <View style={styles.metaItem}>
                                <Text style={styles.metaIcon}>📊</Text>
                                <Text style={styles.metaText}>{exercise.difficulty}</Text>
                              </View>
                              <View style={styles.metaItem}>
                                <Text style={styles.metaIcon}>🕐</Text>
                                <Text style={styles.metaText}>{exercise.lastCompleted}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* 인라인 상세 정보 */}
                    {selectedExercise === exercise.id && (
                      <View style={styles.inlineDetailCard}>
                        <View style={styles.detailHeader}>
                          <Text style={styles.detailTitle}>운동 효과</Text>
                          <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={() => setSelectedExercise(null)}
                          >
                            <Text style={styles.closeButtonText}>×</Text>
                          </TouchableOpacity>
                        </View>
                        
                        <View style={styles.benefitsContainer}>
                          <View style={styles.benefitsList}>
                            {exercise.benefits.map((benefit, benefitIndex) => (
                              <View key={benefitIndex} style={styles.benefitItem}>
                                <Text style={styles.benefitIcon}>✓</Text>
                                <Text style={styles.benefitText}>{benefit}</Text>
                              </View>
                            ))}
                          </View>
                        </View>

                        <View style={styles.targetContainer}>
                          <Text style={styles.targetLabel}>측정 항목</Text>
                          <Text style={styles.targetValue}>{exercise.target}</Text>
                        </View>

                        <TouchableOpacity
                          style={styles.startButton}
                          onPress={() => handleExerciseStart(exercise.id)}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.startButtonText}>
                            {exercise.target} 시작하기
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
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
  scrollContent: {
    paddingBottom: 100,
  },
  summarySection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  summaryCard: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryTitleContainer: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  streakText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  progressLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
  summaryStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryStat: {
    flex: 1,
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  summaryStatLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryContainer: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryButtonActive: {
    backgroundColor: '#1F2937',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  exerciseSection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  exerciseCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  exerciseList: {
    gap: 12,
  },
  exerciseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedExerciseCard: {
    borderWidth: 2,
    borderColor: '#3182F6',
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  exerciseContent: {
    padding: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseIconText: {
    fontSize: 24,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginRight: 8,
  },
  recommendedBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  recommendedText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  exerciseMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  inlineDetailCard: {
    marginTop: -12,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#3182F6',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '600',
  },
  benefitsContainer: {
    marginBottom: 16,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '700',
    marginRight: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  targetContainer: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  targetLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  targetValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  startButton: {
    backgroundColor: '#3182F6',
    borderRadius: 12,
    paddingVertical: 16,
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
  },
  essentialExerciseCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  essentialBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },
  essentialText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default IndoorExerciseScreen; 