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
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Card from '../../components/common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { MainTabParamList } from '../../navigation/types';

type DashboardScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Dashboard'>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  // Mock data
  const todayStats = {
    steps: 3247,
    exerciseTime: 45,
    averagePain: 3,
    calories: 156,
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

  const recentActivities = [
    {
      id: '1',
      type: 'outdoor',
      title: '실외 운동 완료',
      time: '오후 3:30',
      value: '2.5km',
      duration: '45분',
    },
    {
      id: '2',
      type: 'pain',
      title: '통증 기록',
      time: '오후 2:15',
      value: '3/10',
    },
    {
      id: '3',
      type: 'indoor',
      title: '실내 운동 시작',
      time: '오전 10:00',
      value: '45분',
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return '좋은 새벽이에요';
    if (hour < 12) return '좋은 아침이에요';
    if (hour < 18) return '편안한 오후예요';
    return '따뜻한 저녁이에요';
  };

  const handleIndoorExercise = () => {
    navigation.navigate('Indoor');
  };

  const handleOutdoorExercise = () => {
    navigation.navigate('Outdoor');
  };

  const handlePainRecord = () => {
    console.log('통증 기록 화면으로 이동');
  };

  const handleExerciseHistory = () => {
    console.log('운동 기록 화면으로 이동');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
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
                <Text style={styles.summaryValue}>{todayStats.averagePain}/10</Text>
                <Text style={styles.summaryLabel}>통증</Text>
              </View>
            </View>
            <View style={styles.summaryFooter}>
              <View style={styles.summaryFooterItem}>
                <Text style={styles.summaryFooterLabel}>소모 칼로리</Text>
                <Text style={styles.summaryFooterValue}>
                  {todayStats.calories}kcal
                </Text>
              </View>
              <View style={styles.summaryFooterItem}>
                <Text style={styles.summaryFooterLabel}>이동 거리</Text>
                <Text style={styles.summaryFooterValue}>
                  {todayStats.distance}km
                </Text>
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
            >
              <Text style={styles.additionalActionTitle}>통증 기록</Text>
              <Text style={styles.additionalActionSubtitle}>
                오늘의 통증 상태
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.additionalAction}
              onPress={handleExerciseHistory}
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

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>최근 활동</Text>
          <Card style={styles.activityCard}>
            {recentActivities.map((activity, index) => (
              <View
                key={activity.id}
                style={[
                  styles.activityItem,
                  index === recentActivities.length - 1 &&
                    styles.activityItemLast,
                ]}
              >
                <View
                  style={[
                    styles.activityIcon,
                    activity.type === 'indoor' && styles.activityIconIndoor,
                    activity.type === 'outdoor' && styles.activityIconOutdoor,
                    activity.type === 'pain' && styles.activityIconPain,
                  ]}
                >
                  <Text style={styles.activityIconText}>
                    {activity.type === 'indoor'
                      ? '🏠'
                      : activity.type === 'outdoor'
                      ? '🌳'
                      : '📊'}
                  </Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <View style={styles.activityValueContainer}>
                  <Text style={styles.activityValue}>{activity.value}</Text>
                  {activity.duration && (
                    <Text style={styles.activityDuration}>
                      {activity.duration}
                    </Text>
                  )}
                </View>
              </View>
            ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.paddingLarge,
    paddingTop: Spacing.sectionSpacing,
    paddingBottom: Spacing.sectionSpacing,
    backgroundColor: Colors.background,
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
  },
  summaryGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
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
    justifyContent: 'space-around',
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
  activitySection: {
    paddingHorizontal: Spacing.paddingLarge,
  },
  activityCard: {
    padding: 0,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.componentSpacing,
    paddingHorizontal: Spacing.padding,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  activityItemLast: {
    borderBottomWidth: 0,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  activityIconIndoor: {
    backgroundColor: '#E8F5E8',
  },
  activityIconOutdoor: {
    backgroundColor: '#E3F2FD',
  },
  activityIconPain: {
    backgroundColor: '#FFF3E0',
  },
  activityIconText: {
    fontSize: 18,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  activityTime: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  activityValueContainer: {
    alignItems: 'flex-end',
  },
  activityValue: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  activityDuration: {
    ...Typography.caption,
    color: Colors.textLight,
    marginTop: Spacing.xs,
  },
});

export default DashboardScreen; 