import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Card from '../../../components/common/Card';
import { styles } from './IndoorExerciseScreen.styled';
import { IndoorExerciseScreenNavigationProp } from './types';
import { useIndoorExercises } from '../../../hooks/useIndoorExercises';

const IndoorExerciseScreen: React.FC = () => {
  const navigation = useNavigation<IndoorExerciseScreenNavigationProp>();
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { 
    exerciseData, 
    loading, 
    error, 
    refreshExercises 
  } = useIndoorExercises();

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#666' }}>운동 목록을 불러오는 중...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 16, color: '#f44336', textAlign: 'center', marginBottom: 16 }}>
          운동 목록을 불러오는데 실패했습니다.
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#2196F3',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
          onPress={refreshExercises}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>다시 시도</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // exerciseData에서 exercises와 기타 데이터 추출
  const exercises = [
    ...(exerciseData?.requiredExercises || []).map(ex => ({ ...ex, type: 'essential' })),
    ...(exerciseData?.recommendedExercises || []).map(ex => ({ ...ex, type: 'optional' }))
  ];
  const todayStats = exerciseData?.todayProgress;
  
  // Mock categories for now (API에 categories가 없다면 기본값 사용)
  const categories = [
    { id: 'all', name: '전체', icon: '📋' },
    { id: 'essential', name: '필수운동', icon: '⭐' },
    { id: 'balance', name: '균형운동', icon: '⚖️' },
    { id: 'strength', name: '근력운동', icon: '💪' },
    { id: 'flexibility', name: '유연성', icon: '🤸' },
  ];

  const filteredExercises = selectedCategory === 'all' 
    ? exercises 
    : exercises.filter((exercise: any) => exercise.category === selectedCategory);

  // 운동을 타입별로 분류
  const essentialExercises = filteredExercises.filter((exercise: any) => exercise.type === 'essential');
  const optionalExercises = filteredExercises.filter((exercise: any) => exercise.type === 'optional');

  const handleExercisePress = (exerciseId: string) => {
    setSelectedExercise(exerciseId);
  };

  const handleExerciseStart = (exerciseId: string) => {
    const exercise = exercises.find((e: any) => e.exerciseId.toString() === exerciseId);
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

  const renderExerciseCard = (exercise: any) => (
    <View key={exercise.exerciseId}>
      <View
        style={[
          styles.exerciseCard,
          selectedExercise === exercise.exerciseId.toString() && styles.selectedExerciseCard,
          exercise.type === 'essential' && styles.essentialExerciseCard,
        ]}
      >
        <TouchableOpacity
          style={styles.exerciseContent}
          onPress={() => handleExercisePress(exercise.exerciseId.toString())}
          activeOpacity={0.7}
        >
          <View style={styles.exerciseHeader}>
            <View style={[styles.exerciseIcon, { backgroundColor: '#2196F3' + '15' }]}>
              <Text style={styles.exerciseIconText}>🏃</Text>
            </View>
            <View style={styles.exerciseInfo}>
              <View style={styles.exerciseTitleRow}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                {exercise.type === 'essential' && (
                  <View style={styles.essentialBadge}>
                    <Text style={styles.essentialText}>필수</Text>
                  </View>
                )}
                {exercise.isRequired && (
                  <View style={styles.recommendedBadge}>
                    <Text style={styles.recommendedText}>필수</Text>
                  </View>
                )}
              </View>
              <Text style={styles.exerciseDescription}>{exercise.description}</Text>
              <View style={styles.exerciseMeta}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>📋</Text>
                  <Text style={styles.metaText}>순서: {exercise.orderIndex}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>✅</Text>
                  <Text style={styles.metaText}>{exercise.isCompleted ? '완료' : '미완료'}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* 인라인 상세 정보 */}
      {selectedExercise === exercise.exerciseId.toString() && (
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
              {(exercise.benefits || ['운동 효과 정보를 불러오는 중입니다.']).map((benefit: string, benefitIndex: number) => (
                <View key={benefitIndex} style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>✓</Text>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.targetContainer}>
            <Text style={styles.targetLabel}>운동 설명</Text>
            <Text style={styles.targetValue}>{exercise.description}</Text>
          </View>

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => handleExerciseStart(exercise.exerciseId.toString())}
            activeOpacity={0.8}
          >
            <Text style={styles.startButtonText}>
              {exercise.name} 시작하기
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

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
                  <Text style={styles.streakText}>운동 기록</Text>
                </View>
              </View>
              <View style={styles.progressCircle}>
                <Text style={styles.progressText}>{Math.round(todayStats?.requiredExerciseCompletionRate || 0)}%</Text>
                <Text style={styles.progressLabel}>완료율</Text>
              </View>
            </View>
            
            <View style={styles.summaryStats}>
              <View style={styles.summaryStat}>
                <Text style={styles.summaryStatValue}>{todayStats?.completedRequiredExercises || 0}</Text>
                <Text style={styles.summaryStatLabel}>완료</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryStat}>
                <Text style={styles.summaryStatValue}>{todayStats?.totalExerciseMinutes || 0}분</Text>
                <Text style={styles.summaryStatLabel}>총 시간</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryStat}>
                <Text style={styles.summaryStatValue}>{Math.round(todayStats?.requiredExerciseCompletionRate || 0)}%</Text>
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
                {essentialExercises.map((exercise) => renderExerciseCard(exercise))}
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
                {optionalExercises.map((exercise) => renderExerciseCard(exercise))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndoorExerciseScreen;
