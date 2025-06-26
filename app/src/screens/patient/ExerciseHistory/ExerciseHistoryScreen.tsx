import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import Card from '../../../components/common/Card';
import { Colors } from '../../../constants/colors';
import { 
  MainStackParamList,
  ExerciseRecord,
  WeeklyStats,
  ExerciseType
} from './types';
import {
  exerciseTypeNames,
  exerciseIcons,
  difficultyColors,
  difficultyNames,
  mockExerciseHistory
} from './mock';
import { styles } from './ExerciseHistoryScreen.styled';

type ExerciseHistoryScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const ExerciseHistoryScreen: React.FC = () => {
  const navigation = useNavigation<ExerciseHistoryScreenNavigationProp>();
  const [selectedTab, setSelectedTab] = useState<'all' | 'indoor' | 'outdoor'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');
  const [exerciseHistory] = useState<ExerciseRecord[]>(mockExerciseHistory);

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

export default ExerciseHistoryScreen;