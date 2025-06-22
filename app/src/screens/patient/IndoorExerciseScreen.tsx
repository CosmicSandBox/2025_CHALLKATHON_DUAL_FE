import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Card from '../../components/common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

const IndoorExerciseScreen: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const [exerciseTime, setExerciseTime] = useState(0);

  const exercises = [
    {
      id: '1',
      name: '스트레칭',
      description: '근육 이완과 유연성 향상',
      duration: '10분',
      difficulty: '쉬움',
      icon: '🧘‍♀️',
      color: '#4CAF50',
    },
    {
      id: '2',
      name: '근력 운동',
      description: '근육 강화와 균형 감각 향상',
      duration: '15분',
      difficulty: '보통',
      icon: '💪',
      color: '#2196F3',
    },
    {
      id: '3',
      name: '균형 운동',
      description: '균형 감각과 안정성 향상',
      duration: '12분',
      difficulty: '보통',
      icon: '⚖️',
      color: '#FF9800',
    },
    {
      id: '4',
      name: '유산소 운동',
      description: '심폐 기능과 지구력 향상',
      duration: '20분',
      difficulty: '어려움',
      icon: '🏃‍♂️',
      color: '#9C27B0',
    },
  ];

  const todayStats = {
    completed: 2,
    total: 4,
    time: 35,
  };

  const startExercise = () => {
    if (!selectedExercise) {
      Alert.alert('운동 선택', '운동을 선택해주세요.');
      return;
    }
    setIsExerciseStarted(true);
    // 실제로는 타이머 시작 로직
  };

  const stopExercise = () => {
    Alert.alert(
      '운동 종료',
      '운동을 종료하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '종료', 
          onPress: () => {
            setIsExerciseStarted(false);
            setSelectedExercise(null);
            setExerciseTime(0);
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>실내 운동</Text>
          <Text style={styles.subtitle}>오늘의 실내 운동을 시작해보세요</Text>
        </View>

        {/* Today's Progress */}
        <View style={styles.progressSection}>
          <Card style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>오늘의 진행상황</Text>
              <Text style={styles.progressValue}>{todayStats.completed}/{todayStats.total}</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(todayStats.completed / todayStats.total) * 100}%` }
                ]} 
              />
            </View>
            <View style={styles.progressStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{todayStats.time}분</Text>
                <Text style={styles.statLabel}>총 운동 시간</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>75%</Text>
                <Text style={styles.statLabel}>완료율</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Exercise Selection */}
        <View style={styles.exerciseSection}>
          <Text style={styles.sectionTitle}>운동 선택</Text>
          <View style={styles.exerciseGrid}>
            {exercises.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
                style={[
                  styles.exerciseCard,
                  selectedExercise === exercise.id && styles.selectedExerciseCard
                ]}
                onPress={() => setSelectedExercise(exercise.id)}
              >
                <View style={[styles.exerciseIcon, { backgroundColor: exercise.color + '20' }]}>
                  <Text style={styles.exerciseIconText}>{exercise.icon}</Text>
                </View>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                <View style={styles.exerciseMeta}>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>시간</Text>
                    <Text style={styles.metaValue}>{exercise.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>난이도</Text>
                    <Text style={styles.metaValue}>{exercise.difficulty}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Exercise Instructions */}
        {selectedExercise && (
          <View style={styles.instructionSection}>
            <Text style={styles.sectionTitle}>운동 방법</Text>
            <Card style={styles.instructionCard}>
              <Text style={styles.instructionTitle}>
                {exercises.find(e => e.id === selectedExercise)?.name} 운동 가이드
              </Text>
              <View style={styles.instructionSteps}>
                <View style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <Text style={styles.stepText}>편안한 자세로 서거나 앉습니다</Text>
                </View>
                <View style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <Text style={styles.stepText}>천천히 호흡을 조절합니다</Text>
                </View>
                <View style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <Text style={styles.stepText}>지시에 따라 운동을 수행합니다</Text>
                </View>
                <View style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>4</Text>
                  </View>
                  <Text style={styles.stepText}>무리하지 말고 본인의 페이스를 유지합니다</Text>
                </View>
              </View>
            </Card>
          </View>
        )}

        {/* Action Button */}
        <View style={styles.actionSection}>
          {!isExerciseStarted ? (
            <TouchableOpacity
              style={[
                styles.actionButton,
                !selectedExercise && styles.disabledButton
              ]}
              onPress={startExercise}
              disabled={!selectedExercise}
            >
              <Text style={styles.actionButtonText}>운동 시작</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.actionButton, styles.stopButton]}
              onPress={stopExercise}
            >
              <Text style={styles.actionButtonText}>운동 종료</Text>
            </TouchableOpacity>
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
  scrollContent: {
    paddingBottom: Spacing.sectionSpacing,
  },
  header: {
    paddingHorizontal: Spacing.paddingLarge,
    paddingTop: Spacing.sectionSpacing,
    paddingBottom: Spacing.componentSpacing,
  },
  title: {
    ...Typography.h1,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textLight,
  },
  progressSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  progressCard: {
    padding: Spacing.padding,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  progressTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  progressValue: {
    ...Typography.h3,
    color: Colors.primary,
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
    marginBottom: Spacing.componentSpacing,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  exerciseSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
    fontWeight: '600',
  },
  exerciseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exerciseCard: {
    width: '48%',
    backgroundColor: Colors.background,
    borderRadius: Spacing.cardRadius,
    padding: Spacing.padding,
    marginBottom: Spacing.componentSpacing,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedExerciseCard: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  exerciseIconText: {
    fontSize: 24,
  },
  exerciseName: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  exerciseDescription: {
    ...Typography.caption,
    color: Colors.textLight,
    marginBottom: Spacing.sm,
    lineHeight: 16,
  },
  exerciseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    ...Typography.caption,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  metaValue: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  instructionSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  instructionCard: {
    padding: Spacing.padding,
  },
  instructionTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.componentSpacing,
  },
  instructionSteps: {
    gap: Spacing.componentSpacing,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
    marginTop: 2,
  },
  stepNumberText: {
    ...Typography.caption,
    color: Colors.background,
    fontWeight: '600',
  },
  stepText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
  actionSection: {
    paddingHorizontal: Spacing.paddingLarge,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    borderRadius: Spacing.cardRadius,
    paddingVertical: Spacing.paddingLarge,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: Colors.borderLight,
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    ...Typography.body,
    color: Colors.background,
    fontWeight: '600',
  },
});

export default IndoorExerciseScreen; 