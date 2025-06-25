import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Card from '../../components/common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { MainTabParamList } from '../../navigation/types';

// 탭 네비게이션을 위한 타입 정의
type TabNavigationProp = BottomTabNavigationProp<MainTabParamList>;

// Stack과 Tab을 함께 사용하기 위한 복합 타입
type DashboardScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<{ PainRecord: undefined; ExerciseHistory: undefined }>,
  TabNavigationProp
>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  // Mock data
  const todayStats = {
    steps: 3247,
    exerciseTime: 45,
    averagePain: 3,
    distance: 2.1,
  };

  const weeklyData = [
    { day: '월', steps: 2800, pain: 2 },
    { day: '화', steps: 3200, pain: 3 },
    { day: '수', steps: 2900, pain: 2 },
    { day: '목', steps: 3500, pain: 4 },
    { day: '금', steps: 3100, pain: 3 },
    { day: '토', steps: 3800, pain: 2 },
    { day: '일', steps: 3247, pain: 3 },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return '좋은 새벽이에요';
    if (hour < 12) return '좋은 아침이에요';
    if (hour < 18) return '편안한 오후예요';
    return '따뜻한 저녁이에요';
  };

  const handleIndoorExercise = () => {
    try {
      console.log('🏠 실내 운동 버튼 클릭');
      navigation.navigate('Indoor' as never);
    } catch (error) {
      console.error('❌ 실내 운동 네비게이션 에러:', error);
    }
  };

  const handleOutdoorExercise = () => {
    try {
      console.log('🌳 실외 운동 버튼 클릭');
      navigation.navigate('Outdoor' as never);
    } catch (error) {
      console.error('❌ 실외 운동 네비게이션 에러:', error);
    }
  };

  const handlePainRecord = () => {
    try {
      console.log('📝 통증 기록 버튼 클릭');
      navigation.navigate('PainRecord' as never);
    } catch (error) {
      console.error('❌ 통증 기록 네비게이션 에러:', error);
    }
  };

  const handleExerciseHistory = () => {
    try {
      console.log('📊 운동 기록 버튼 클릭');
      navigation.navigate('ExerciseHistory' as never);
    } catch (error) {
      console.error('❌ 운동 기록 네비게이션 에러:', error);
    }
  };

  const handleSettings = () => {
    try {
      console.log('⚙️ 설정 버튼 클릭');
      navigation.navigate('Settings' as never);
    } catch (error) {
      console.error('❌ 설정 네비게이션 에러:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerBackground} />
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.name}>홍길동님</Text>
            <View style={styles.subtitleContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.subtitle}>오늘도 건강한 하루를 시작해보세요</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
            <View style={styles.settingsIcon}>
              <View style={styles.dotsContainer}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Today's Summary - 토스 스타일 */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>오늘의 요약</Text>
          <Card style={styles.summaryCard}>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>
                  {todayStats.steps.toLocaleString()}
                </Text>
                <Text style={styles.summaryLabel}>걸음</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{todayStats.exerciseTime}분</Text>
                <Text style={styles.summaryLabel}>운동</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{todayStats.distance}km</Text>
                <Text style={styles.summaryLabel}>거리</Text>
              </View>
            </View>
          </Card>
          
          {/* Pain Status Card */}
          <Card style={styles.painCard}>
            <View style={styles.painContent}>
              <View style={styles.painInfo}>
                <Text style={styles.painTitle}>오늘의 통증 수준</Text>
                <Text style={styles.painSubtitle}>낮을수록 좋아요</Text>
              </View>
              <View style={styles.painValueContainer}>
                <Text style={styles.painValue}>{todayStats.averagePain}</Text>
                <Text style={styles.painMaxValue}>/10</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Quick Actions - 실내/실외 가시적 구분 */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>빠른 시작</Text>
          <View style={styles.actionsContainer}>
            {/* 실내 운동 */}
            <TouchableOpacity
              style={styles.indoorAction}
              onPress={handleIndoorExercise}
              activeOpacity={0.7}
            >
              <View style={styles.actionContent}>
                <View style={styles.actionHeader}>
                  <Text style={styles.actionTitle}>실내 운동</Text>
                  <Text style={styles.actionSubtitle}>재활 운동 및 스트레칭</Text>
                </View>
                <View style={styles.actionBadge}>
                  <Text style={styles.actionBadgeText}>추천</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* 실외 운동 */}
            <TouchableOpacity
              style={styles.outdoorAction}
              onPress={handleOutdoorExercise}
              activeOpacity={0.7}
            >
              <View style={styles.actionContent}>
                <View style={styles.actionHeader}>
                  <Text style={styles.actionTitle}>실외 운동</Text>
                  <Text style={styles.actionSubtitle}>걷기 및 유산소 운동</Text>
                </View>
                <View style={styles.actionBadge}>
                  <Text style={styles.actionBadgeText}>선택</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Additional Actions */}
        <View style={styles.additionalActionsSection}>
          <View style={styles.additionalActionsGrid}>
            <TouchableOpacity
              style={styles.additionalAction}
              onPress={handlePainRecord}
              activeOpacity={0.7}
            >
              <Text style={styles.additionalActionTitle}>통증 기록</Text>
              <Text style={styles.additionalActionSubtitle}>
                오늘의 통증 상태
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.additionalAction}
              onPress={handleExerciseHistory}
              activeOpacity={0.7}
            >
              <Text style={styles.additionalActionTitle}>운동 기록</Text>
              <Text style={styles.additionalActionSubtitle}>전체 기록 보기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>이번 주 진행상황</Text>
          <Card style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>주간 걸음 수</Text>
              <Text style={styles.progressTotal}>
                {weeklyData
                  .reduce((sum, day) => sum + day.steps, 0)
                  .toLocaleString()}{' '}
                걸음
              </Text>
            </View>
            <View style={styles.progressBars}>
              {weeklyData.map((day, index) => (
                <View key={index} style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          height: `${(day.steps / 4000) * 100}%`,
                          backgroundColor:
                            day.steps >= 3000 ? Colors.primary : Colors.accent,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressDay}>{day.day}</Text>
                  <Text style={styles.progressSteps}>
                    {day.steps.toLocaleString()}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
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
    paddingBottom: Spacing.sectionSpacing * 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.paddingLarge,
    paddingTop: Spacing.sectionSpacing,
    paddingBottom: Spacing.sectionSpacing,
    backgroundColor: '#F8F9FA',
    position: 'relative',
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F8F9FA',
    zIndex: -1,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 16,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.textLight,
  },
  summarySection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
    fontWeight: '600',
  },
  summaryCard: {
    padding: Spacing.padding,
    marginBottom: Spacing.componentSpacing,
  },
  painCard: {
    padding: Spacing.padding,
    backgroundColor: '#FEF7F0',
    borderWidth: 1,
    borderColor: '#F97316',
  },
  painContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  painInfo: {
    flex: 1,
  },
  painTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  painSubtitle: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  painValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  painValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F97316',
  },
  painMaxValue: {
    fontSize: 18,
    fontWeight: '500',
    color: '#F97316',
    opacity: 0.7,
  },
  summaryGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    ...Typography.h2,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  summaryLabel: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.borderLight,
  },
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: Spacing.componentSpacing,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  summaryFooterItem: {
    alignItems: 'center',
  },
  summaryFooterLabel: {
    ...Typography.caption,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  summaryFooterValue: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  actionsSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  actionsContainer: {
    gap: Spacing.componentSpacing,
  },
  indoorAction: {
    backgroundColor: '#E8F5E8',
    borderRadius: Spacing.cardRadius,
    padding: Spacing.padding,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  outdoorAction: {
    backgroundColor: '#E3F2FD',
    borderRadius: Spacing.cardRadius,
    padding: Spacing.padding,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  actionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionHeader: {
    flex: 1,
  },
  actionTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  actionSubtitle: {
    ...Typography.body,
    color: Colors.textLight,
  },
  actionBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.cardRadius,
  },
  actionBadgeText: {
    ...Typography.caption,
    color: Colors.background,
    fontWeight: '600',
  },
  additionalActionsSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  additionalActionsGrid: {
    flexDirection: 'row',
    gap: Spacing.componentSpacing,
  },
  additionalAction: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: Spacing.cardRadius,
    padding: Spacing.padding,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  additionalActionTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  additionalActionSubtitle: {
    ...Typography.caption,
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
  progressTotal: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
  },
  progressBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },
  progressBarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  progressBar: {
    width: 20,
    height: 80,
    backgroundColor: Colors.borderLight,
    borderRadius: 10,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  progressBarFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 10,
  },
  progressDay: {
    ...Typography.caption,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  progressSteps: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontSize: 10,
  },
});

export default DashboardScreen;