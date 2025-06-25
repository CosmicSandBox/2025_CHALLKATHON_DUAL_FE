import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import Card from '../../components/common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

const { width: screenWidth } = Dimensions.get('window');

type MainStackParamList = {
  MainTabs: undefined;
  PainRecord: undefined;
  ExerciseHistory: undefined;
};

type ExerciseHistoryScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

type ExerciseType = 'indoor' | 'outdoor';
type IndoorExerciseSubType = 'walking' | 'stretching' | 'balance' | 'sitting' | 'standing' | 'walkingSupport';
type OutdoorExerciseSubType = 'walking' | 'jogging' | 'cycling';

interface ExerciseRecord {
  id: string;
  date: string;
  time: string;
  type: ExerciseType;
  subType: IndoorExerciseSubType | OutdoorExerciseSubType;
  name: string;
  duration: number; // 분
  steps?: number;
  distance?: number; // km
  calories?: number;
  avgHeartRate?: number;
  maxHeartRate?: number;
  painBefore?: number; // 1-10
  painAfter?: number; // 1-10
  notes?: string;
  completionRate: number; // 0-100%
  difficulty: 'easy' | 'normal' | 'hard';
}

interface WeeklyStats {
  totalExercises: number;
  totalDuration: number;
  totalSteps: number;
  totalDistance: number;
  totalCalories: number;
  averagePain: number;
}

const ExerciseHistoryScreen: React.FC = () => {
  const navigation = useNavigation<ExerciseHistoryScreenNavigationProp>();
  const [selectedTab, setSelectedTab] = useState<'all' | 'indoor' | 'outdoor'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

  // Mock data for exercise history
  const [exerciseHistory] = useState<ExerciseRecord[]>([
    {
      id: '1',
      date: '2024-01-15',
      time: '09:30',
      type: 'indoor',
      subType: 'walking',
      name: '실내 걷기 운동',
      duration: 20,
      steps: 1847,
      distance: 1.1,
      calories: 85,
      painBefore: 3,
      painAfter: 2,
      notes: '무릎 상태가 많이 좋아짐',
      completionRate: 95,
      difficulty: 'normal',
    },
    {
      id: '2',
      date: '2024-01-15',
      time: '15:45',
      type: 'indoor',
      subType: 'stretching',
      name: '스트레칭',
      duration: 15,
      painBefore: 4,
      painAfter: 2,
      completionRate: 100,
      difficulty: 'easy',
    },
    {
      id: '3',
      date: '2024-01-14',
      time: '08:15',
      type: 'outdoor',
      subType: 'walking',
      name: '공원 산책',
      duration: 35,
      steps: 3247,
      distance: 2.1,
      calories: 156,
      avgHeartRate: 78,
      maxHeartRate: 92,
      painBefore: 2,
      painAfter: 3,
      notes: '날씨가 좋아서 평소보다 오래 걸었음',
      completionRate: 100,
      difficulty: 'normal',
    },
    {
      id: '4',
      date: '2024-01-13',
      time: '10:20',
      type: 'indoor',
      subType: 'balance',
      name: '균형 잡기 운동',
      duration: 12,
      painBefore: 2,
      painAfter: 2,
      completionRate: 80,
      difficulty: 'hard',
    },
    {
      id: '5',
      date: '2024-01-12',
      time: '16:30',
      type: 'outdoor',
      subType: 'walking',
      name: '동네 한바퀴',
      duration: 25,
      steps: 2156,
      distance: 1.4,
      calories: 98,
      avgHeartRate: 75,
      maxHeartRate: 88,
      painBefore: 3,
      painAfter: 3,
      completionRate: 100,
      difficulty: 'easy',
    },
  ]);

  const exerciseTypeNames = {
    walking: '걷기',
    stretching: '스트레칭',
    balance: '균형 잡기',
    sitting: '앉기/서기',
    standing: '서기 운동',
    walkingSupport: '보행 보조',
    jogging: '조깅',
    cycling: '자전거',
  };

  const exerciseIcons = {
    walking: '🚶‍♂️',
    stretching: '🧘‍♂️',
    balance: '⚖️',
    sitting: '🪑',
    standing: '🧍‍♂️',
    walkingSupport: '🦯',
    jogging: '🏃‍♂️',
    cycling: '🚴‍♂️',
  };

  const difficultyColors = {
    easy: '#4CAF50',
    normal: '#FF9800',
    hard: '#F44336',
  };

  const difficultyNames = {
    easy: '쉬움',
    normal: '보통',
    hard: '어려움',
  };

  const getFilteredExercises = () => {
    let filtered = exerciseHistory;
    
    if (selectedTab !== 'all') {
      filtered = filtered.filter(exercise => exercise.type === selectedTab);
    }

    // 기간 필터링
    const now = new Date();
    if (selectedPeriod === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(exercise => new Date(exercise.date) >= weekAgo);
    } else if (selectedPeriod === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(exercise => new Date(exercise.date) >= monthAgo);
    }

    return filtered.sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime());
  };

  const getWeeklyStats = (): WeeklyStats => {
    const weeklyExercises = getFilteredExercises();
    
    return {
      totalExercises: weeklyExercises.length,
      totalDuration: weeklyExercises.reduce((sum, ex) => sum + ex.duration, 0),
      totalSteps: weeklyExercises.reduce((sum, ex) => sum + (ex.steps || 0), 0),
      totalDistance: weeklyExercises.reduce((sum, ex) => sum + (ex.distance || 0), 0),
      totalCalories: weeklyExercises.reduce((sum, ex) => sum + (ex.calories || 0), 0),
      averagePain: weeklyExercises.length > 0 
        ? weeklyExercises.reduce((sum, ex) => sum + (ex.painAfter || 0), 0) / weeklyExercises.length 
        : 0,
    };
  };

  const getPainDifference = (before?: number, after?: number) => {
    if (!before || !after) return null;
    return after - before;
  };

  const getPainDifferenceColor = (diff: number | null) => {
    if (diff === null) return '#6B7280';
    if (diff < 0) return '#10B981'; // 좋아짐 - 초록색
    if (diff > 0) return '#F59E0B'; // 나빠짐 - 주황색
    return '#6B7280'; // 변화없음 - 회색
  };

  const getPainDifferenceText = (diff: number | null) => {
    if (diff === null) return '-';
    if (diff < 0) return `${Math.abs(diff)} 감소`;
    if (diff > 0) return `${diff} 증가`;
    return '변화 없음';
  };

  const handleExerciseDetail = (exercise: ExerciseRecord) => {
    Alert.alert(
      exercise.name,
      `날짜: ${exercise.date} ${exercise.time}\n` +
      `운동 시간: ${exercise.duration}분\n` +
      `완주율: ${exercise.completionRate}%\n` +
      `난이도: ${difficultyNames[exercise.difficulty]}\n` +
      (exercise.steps ? `걸음 수: ${exercise.steps.toLocaleString()}걸음\n` : '') +
      (exercise.distance ? `거리: ${exercise.distance}km\n` : '') +
      (exercise.calories ? `칼로리: ${exercise.calories}kcal\n` : '') +
      (exercise.painBefore ? `운동 전 통증: ${exercise.painBefore}/10\n` : '') +
      (exercise.painAfter ? `운동 후 통증: ${exercise.painAfter}/10\n` : '') +
      (exercise.notes ? `\n메모: ${exercise.notes}` : ''),
      [{ text: '확인' }]
    );
  };

  const renderStatsCards = () => {
    const stats = getWeeklyStats();
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {selectedPeriod === 'week' ? '이번 주' : selectedPeriod === 'month' ? '이번 달' : '전체'} 통계
        </Text>
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={styles.statIcon}>🏃‍♂️</Text>
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>{stats.totalExercises}</Text>
                <Text style={styles.statLabel}>운동 횟수</Text>
              </View>
            </View>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={styles.statIcon}>⏱️</Text>
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>{stats.totalDuration}</Text>
                <Text style={styles.statLabel}>총 운동시간(분)</Text>
              </View>
            </View>
          </Card>
          
          {stats.totalSteps > 0 && (
            <Card style={styles.statCard}>
              <View style={styles.statContent}>
                <Text style={styles.statIcon}>👟</Text>
                <View style={styles.statInfo}>
                  <Text style={styles.statValue}>{stats.totalSteps.toLocaleString()}</Text>
                  <Text style={styles.statLabel}>총 걸음 수</Text>
                </View>
              </View>
            </Card>
          )}
          
          {stats.totalDistance > 0 && (
            <Card style={styles.statCard}>
              <View style={styles.statContent}>
                <Text style={styles.statIcon}>📏</Text>
                <View style={styles.statInfo}>
                  <Text style={styles.statValue}>{stats.totalDistance.toFixed(1)}</Text>
                  <Text style={styles.statLabel}>총 거리(km)</Text>
                </View>
              </View>
            </Card>
          )}
          
          {stats.totalCalories > 0 && (
            <Card style={styles.statCard}>
              <View style={styles.statContent}>
                <Text style={styles.statIcon}>🔥</Text>
                <View style={styles.statInfo}>
                  <Text style={styles.statValue}>{stats.totalCalories}</Text>
                  <Text style={styles.statLabel}>총 칼로리(kcal)</Text>
                </View>
              </View>
            </Card>
          )}
          
          {stats.averagePain > 0 && (
            <Card style={styles.statCard}>
              <View style={styles.statContent}>
                <Text style={styles.statIcon}>😐</Text>
                <View style={styles.statInfo}>
                  <Text style={styles.statValue}>{stats.averagePain.toFixed(1)}</Text>
                  <Text style={styles.statLabel}>평균 통증</Text>
                </View>
              </View>
            </Card>
          )}
        </View>
      </View>
    );
  };

  const renderExerciseList = () => {
    const filteredExercises = getFilteredExercises();
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>운동 기록</Text>
        {filteredExercises.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>선택한 기간에 운동 기록이 없습니다.</Text>
            <Text style={styles.emptySubtext}>운동을 시작해보세요!</Text>
          </Card>
        ) : (
          <View style={styles.exerciseList}>
            {filteredExercises.map((exercise) => {
              const painDiff = getPainDifference(exercise.painBefore, exercise.painAfter);
              
              return (
                <TouchableOpacity
                  key={exercise.id}
                  style={styles.exerciseCard}
                  onPress={() => handleExerciseDetail(exercise)}
                  activeOpacity={0.7}
                >
                  <Card style={styles.exerciseCardContent}>
                    <View style={styles.exerciseHeader}>
                      <View style={styles.exerciseTypeContainer}>
                        <View style={[
                          styles.exerciseTypeBadge,
                          { backgroundColor: exercise.type === 'indoor' ? '#E8F5E8' : '#E3F2FD' }
                        ]}>
                          <Text style={styles.exerciseTypeIcon}>
                            {exerciseIcons[exercise.subType as keyof typeof exerciseIcons]}
                          </Text>
                          <Text style={[
                            styles.exerciseTypeText,
                            { color: exercise.type === 'indoor' ? '#2E7D32' : '#1976D2' }
                          ]}>
                            {exercise.type === 'indoor' ? '실내' : '실외'}
                          </Text>
                        </View>
                        <View style={[
                          styles.difficultyBadge,
                          { backgroundColor: difficultyColors[exercise.difficulty] }
                        ]}>
                          <Text style={styles.difficultyText}>
                            {difficultyNames[exercise.difficulty]}
                          </Text>
                        </View>
                      </View>
                      
                      <View style={styles.exerciseDateTime}>
                        <Text style={styles.exerciseDate}>{exercise.date}</Text>
                        <Text style={styles.exerciseTime}>{exercise.time}</Text>
                      </View>
                    </View>

                    <View style={styles.exerciseInfo}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <Text style={styles.exerciseSubType}>
                        {exerciseTypeNames[exercise.subType as keyof typeof exerciseTypeNames]}
                      </Text>
                    </View>

                    <View style={styles.exerciseMetrics}>
                      <View style={styles.metricItem}>
                        <Text style={styles.metricLabel}>시간</Text>
                        <Text style={styles.metricValue}>{exercise.duration}분</Text>
                      </View>
                      
                      {/* 실내 걷기와 실외 운동에서는 완주율을 표시하지 않음 */}
                      {!(exercise.type === 'indoor' && exercise.subType === 'walking') && exercise.type !== 'outdoor' && (
                        <View style={styles.metricItem}>
                          <Text style={styles.metricLabel}>완주율</Text>
                          <Text style={[
                            styles.metricValue,
                            { color: exercise.completionRate >= 90 ? '#10B981' : exercise.completionRate >= 70 ? '#F59E0B' : '#F87171' }
                          ]}>
                            {exercise.completionRate}%
                          </Text>
                        </View>
                      )}

                      {exercise.steps && (
                        <View style={styles.metricItem}>
                          <Text style={styles.metricLabel}>걸음</Text>
                          <Text style={styles.metricValue}>{exercise.steps.toLocaleString()}</Text>
                        </View>
                      )}

                      {exercise.distance && (
                        <View style={styles.metricItem}>
                          <Text style={styles.metricLabel}>거리</Text>
                          <Text style={styles.metricValue}>{exercise.distance}km</Text>
                        </View>
                      )}

                      {exercise.calories && (
                        <View style={styles.metricItem}>
                          <Text style={styles.metricLabel}>칼로리</Text>
                          <Text style={styles.metricValue}>{exercise.calories}kcal</Text>
                        </View>
                      )}
                    </View>

                    {(exercise.painBefore || exercise.painAfter) && (
                      <View style={styles.painInfo}>
                        <View style={styles.painItem}>
                          <Text style={styles.painLabel}>통증 변화</Text>
                          <View style={styles.painValues}>
                            {exercise.painBefore && (
                              <Text style={styles.painBefore}>{exercise.painBefore}</Text>
                            )}
                            <Text style={styles.painArrow}>→</Text>
                            {exercise.painAfter && (
                              <Text style={styles.painAfter}>{exercise.painAfter}</Text>
                            )}
                            <Text style={[
                              styles.painDifference,
                              { color: getPainDifferenceColor(painDiff) }
                            ]}>
                              ({getPainDifferenceText(painDiff)})
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}

                    {exercise.notes && (
                      <View style={styles.exerciseNotes}>
                        <Text style={styles.exerciseNotesLabel}>메모:</Text>
                        <Text style={styles.exerciseNotesText}>{exercise.notes}</Text>
                      </View>
                    )}
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={28} color="#A3A8AF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>운동 기록</Text>
          <Text style={styles.headerSubtitle}>운동 히스토리와 통계를 확인하세요</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filtersContainer}>
        {/* Type Filter */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'all' && styles.tabActive]}
            onPress={() => setSelectedTab('all')}
          >
            <Text style={[styles.tabText, selectedTab === 'all' && styles.tabTextActive]}>
              전체
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'indoor' && styles.tabActive]}
            onPress={() => setSelectedTab('indoor')}
          >
            <Text style={[styles.tabText, selectedTab === 'indoor' && styles.tabTextActive]}>
              실내
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'outdoor' && styles.tabActive]}
            onPress={() => setSelectedTab('outdoor')}
          >
            <Text style={[styles.tabText, selectedTab === 'outdoor' && styles.tabTextActive]}>
              실외
            </Text>
          </TouchableOpacity>
        </View>

        {/* Period Filter */}
        <View style={styles.periodContainer}>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'week' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text style={[styles.periodText, selectedPeriod === 'week' && styles.periodTextActive]}>
              이번 주
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'month' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text style={[styles.periodText, selectedPeriod === 'month' && styles.periodTextActive]}>
              이번 달
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'all' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('all')}
          >
            <Text style={[styles.periodText, selectedPeriod === 'all' && styles.periodTextActive]}>
              전체
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStatsCards()}
        {renderExerciseList()}
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
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#A3A8AF',
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  periodContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  periodButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  periodTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (screenWidth - 64) / 2,
    padding: 16,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  exerciseList: {
    gap: 12,
  },
  exerciseCard: {
    marginBottom: 4,
  },
  exerciseCardContent: {
    padding: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  exerciseTypeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  exerciseTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  exerciseTypeIcon: {
    fontSize: 14,
  },
  exerciseTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  exerciseDateTime: {
    alignItems: 'flex-end',
  },
  exerciseDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  exerciseTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  exerciseInfo: {
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  exerciseSubType: {
    fontSize: 14,
    color: '#6B7280',
  },
  exerciseMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  painInfo: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  painItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  painLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  painValues: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  painBefore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
  },
  painArrow: {
    fontSize: 14,
    color: '#6B7280',
  },
  painAfter: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  painDifference: {
    fontSize: 12,
    fontWeight: '500',
  },
  exerciseNotes: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
  },
  exerciseNotesLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  exerciseNotesText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  emptyCard: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default ExerciseHistoryScreen;