import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import Card from '../../../components/common/Card';
import { useExerciseRecords } from '../../../hooks/useExerciseRecords';
import { styles } from './ExerciseHistoryScreen.styled';

type MainStackParamList = {
  ExerciseHistory: undefined;
  // 다른 스크린들...
};

type ExerciseHistoryScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

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
  
  const { exerciseHistory: records, loading, error, refreshRecords } = useExerciseRecords();

  // 로딩 상태 처리
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#666' }}>운동 기록을 불러오는 중...</Text>
      </SafeAreaView>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 16, color: '#f44336', textAlign: 'center', marginBottom: 16 }}>
          운동 기록을 불러오는데 실패했습니다.
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#2196F3',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
          onPress={refreshRecords}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>다시 시도</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // API 데이터에서 운동 기록 목록 가져오기
  const exerciseHistory = records?.exerciseRecords || [];

  // 필터링된 운동 기록 가져오기
  const getFilteredExercises = () => {
    return exerciseHistory
      .filter(exercise => {
        if (selectedTab === 'all') return true;
        // API에서는 exerciseType으로 구분 (예: 'INDOOR', 'OUTDOOR')
        const isIndoor = exercise.exerciseType?.toUpperCase().includes('INDOOR') || 
                        exercise.exerciseType?.toUpperCase().includes('실내');
        if (selectedTab === 'indoor') return isIndoor;
        if (selectedTab === 'outdoor') return !isIndoor;
        return true;
      })
      .sort((a, b) => 
        new Date(b.exerciseDate + ' ' + b.startTime).getTime() - 
        new Date(a.exerciseDate + ' ' + a.startTime).getTime()
      );
  };

  // 주간 통계 계산
  const getWeeklyStats = (): WeeklyStats => {
    const filteredExercises = getFilteredExercises();
    return {
      totalExercises: filteredExercises.length,
      totalDuration: filteredExercises.reduce((sum, ex) => sum + ex.durationMinutes, 0),
      totalSteps: filteredExercises.reduce((sum, ex) => sum + (ex.steps || 0), 0),
      totalDistance: filteredExercises.reduce((sum, ex) => sum + (ex.distanceKm || 0), 0),
      totalCalories: filteredExercises.reduce((sum, ex) => sum + (ex.caloriesBurned || 0), 0),
      averagePain: 0, // API에 통증 데이터가 없으므로 0으로 설정
    };
  };

  // 통계 카드 렌더링
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
        </View>
      </View>
    );
  };

  // 운동 기록 리스트 렌더링
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
            {filteredExercises.map((exercise, index) => (
              <Card key={exercise.recordId || index} style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <View style={styles.exerciseTypeContainer}>
                    <View style={[
                      styles.exerciseTypeBadge,
                      { backgroundColor: '#E8F5E8' }
                    ]}>
                      <Text style={styles.exerciseTypeIcon}>🏃</Text>
                      <Text style={[
                        styles.exerciseTypeText,
                        { color: '#2E7D32' }
                      ]}>
                        운동
                      </Text>
                    </View>
                  </View>

                  <View style={styles.exerciseDateTime}>
                    <Text style={styles.exerciseDate}>{exercise.exerciseDate}</Text>
                    <Text style={styles.exerciseTime}>{exercise.startTime}</Text>
                  </View>
                </View>

                <View style={styles.exerciseCardContent}>
                  <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>{exercise.exerciseName}</Text>
                    <Text style={styles.exerciseSubType}>
                      {exercise.exerciseType}
                    </Text>
                  </View>

                  <View style={styles.exerciseMetrics}>
                    <View style={styles.metricItem}>
                      <Text style={styles.metricLabel}>시간</Text>
                      <Text style={styles.metricValue}>{exercise.durationMinutes}분</Text>
                    </View>

                    {exercise.distanceKm && exercise.distanceKm > 0 && (
                      <View style={styles.metricItem}>
                        <Text style={styles.metricLabel}>거리</Text>
                        <Text style={styles.metricValue}>{exercise.distanceKm}km</Text>
                      </View>
                    )}

                    {exercise.caloriesBurned && exercise.caloriesBurned > 0 && (
                      <View style={styles.metricItem}>
                        <Text style={styles.metricLabel}>칼로리</Text>
                        <Text style={styles.metricValue}>{exercise.caloriesBurned}kcal</Text>
                      </View>
                    )}

                    {exercise.steps && exercise.steps > 0 && (
                      <View style={styles.metricItem}>
                        <Text style={styles.metricLabel}>걸음수</Text>
                        <Text style={styles.metricValue}>{exercise.steps}보</Text>
                      </View>
                    )}
                  </View>
                </View>
              </Card>
            ))}
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