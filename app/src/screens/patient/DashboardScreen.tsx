import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Card from '../../components/common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

const DashboardScreen: React.FC = () => {
  // Mock data
  const todayStats = {
    steps: 3247,
    exerciseTime: 45,
    averagePain: 3,
  };

  const quickActions = [
    { title: '실내 운동', subtitle: '오늘의 실내 운동 기록', icon: '🏠', color: '#4CAF50' },
    { title: '실외 운동', subtitle: '오늘의 실외 운동 기록', icon: '🌳', color: '#2196F3' },
    { title: '통증 기록', subtitle: '오늘의 통증 상태 기록', icon: '📊', color: '#FF9800' },
    { title: '운동 기록', subtitle: '전체 운동 기록 보기', icon: '📈', color: '#9C27B0' },
  ];

  const weeklyData = [
    { day: '월', steps: 2800, pain: 2 },
    { day: '화', steps: 3200, pain: 3 },
    { day: '수', steps: 2900, pain: 2 },
    { day: '목', steps: 3500, pain: 4 },
    { day: '금', steps: 3100, pain: 3 },
    { day: '토', steps: 3800, pain: 2 },
    { day: '일', steps: 3247, pain: 3 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>안녕하세요 👋</Text>
            <Text style={styles.name}>홍길동님</Text>
          </View>
          <View style={styles.profileContainer}>
            <Text style={styles.profileIcon}>👤</Text>
          </View>
        </View>

        {/* Today's Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>오늘의 요약</Text>
          <View style={styles.summaryCards}>
            <Card style={styles.summaryCard}>
              <View style={styles.summaryContent}>
                <Text style={styles.summaryIcon}>👟</Text>
                <View style={styles.summaryText}>
                  <Text style={styles.summaryValue}>{todayStats.steps.toLocaleString()}</Text>
                  <Text style={styles.summaryLabel}>걸음</Text>
                </View>
              </View>
            </Card>
            
            <Card style={styles.summaryCard}>
              <View style={styles.summaryContent}>
                <Text style={styles.summaryIcon}>⏱️</Text>
                <View style={styles.summaryText}>
                  <Text style={styles.summaryValue}>{todayStats.exerciseTime}분</Text>
                  <Text style={styles.summaryLabel}>운동</Text>
                </View>
              </View>
            </Card>
            
            <Card style={styles.summaryCard}>
              <View style={styles.summaryContent}>
                <Text style={styles.summaryIcon}>😐</Text>
                <View style={styles.summaryText}>
                  <Text style={styles.summaryValue}>{todayStats.averagePain}/10</Text>
                  <Text style={styles.summaryLabel}>통증</Text>
                </View>
              </View>
            </Card>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>빠른 시작</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <Text style={styles.actionIconText}>{action.icon}</Text>
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Weekly Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>이번 주 진행상황</Text>
          <Card style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>주간 걸음 수</Text>
              <Text style={styles.progressTotal}>{weeklyData.reduce((sum, day) => sum + day.steps, 0).toLocaleString()} 걸음</Text>
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
                          backgroundColor: day.steps >= 3000 ? Colors.primary : Colors.accent
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressDay}>{day.day}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>최근 활동</Text>
          <Card style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>🏃‍♂️</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>실외 운동 완료</Text>
                <Text style={styles.activityTime}>오후 3:30</Text>
              </View>
              <Text style={styles.activityValue}>2.5km</Text>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>📊</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>통증 기록</Text>
                <Text style={styles.activityTime}>오후 2:15</Text>
              </View>
              <Text style={styles.activityValue}>3/10</Text>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>🏠</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>실내 운동 시작</Text>
                <Text style={styles.activityTime}>오전 10:00</Text>
              </View>
              <Text style={styles.activityValue}>45분</Text>
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
    paddingBottom: Spacing.sectionSpacing,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.paddingLarge,
    paddingTop: Spacing.sectionSpacing,
    paddingBottom: Spacing.componentSpacing,
  },
  greeting: {
    ...Typography.body,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  name: {
    ...Typography.h1,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  profileContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 24,
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
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
    padding: Spacing.padding,
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIcon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  summaryText: {
    flex: 1,
  },
  summaryValue: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  summaryLabel: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  actionsSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
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
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  actionIconText: {
    fontSize: 24,
  },
  actionTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  actionSubtitle: {
    ...Typography.caption,
    color: Colors.textLight,
    lineHeight: 16,
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
    height: 120,
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
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
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
  activityValue: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default DashboardScreen; 