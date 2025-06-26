import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../../../components/common/Card';
import { Colors } from '../../../constants/colors';
import { styles } from './DashboardScreen.styled';
import { DashboardScreenNavigationProp } from './types';
import { usePatientDashboard } from '../../../hooks/usePatientDashboard';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const { dashboardData, loading, error, refreshDashboard } = usePatientDashboard();

  useEffect(() => {
    if (error) {
      Alert.alert('오류', error, [
        { text: '다시 시도', onPress: refreshDashboard },
        { text: '확인' },
      ]);
    }
  }, [error]);

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
            <Text style={styles.name}>
              {dashboardData?.todaySummary?.name ? `${dashboardData.todaySummary.name}님` : '사용자님'}
            </Text>
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
          {loading ? (
            <Card style={styles.summaryCard}>
              <View style={[styles.summaryGrid, { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }]}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={[styles.summaryLabel, { marginTop: 10 }]}>데이터를 불러오는 중...</Text>
              </View>
            </Card>
          ) : dashboardData ? (
            <>
              <Card style={styles.summaryCard}>
                <View style={styles.summaryGrid}>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryValue}>
                      {dashboardData.todaySummary.steps.toLocaleString()}
                    </Text>
                    <Text style={styles.summaryLabel}>걸음</Text>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryValue}>{dashboardData.todaySummary.exerciseMinutes}분</Text>
                    <Text style={styles.summaryLabel}>운동</Text>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryValue}>{dashboardData.todaySummary.distanceKm}km</Text>
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
                    <Text style={styles.painValue}>{dashboardData.todaySummary.todayPainLevel}</Text>
                    <Text style={styles.painMaxValue}>/15</Text>
                  </View>
                </View>
              </Card>
            </>
          ) : (
            <Card style={styles.summaryCard}>
              <View style={[styles.summaryGrid, { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }]}>
                <Text style={styles.summaryLabel}>데이터를 불러올 수 없습니다</Text>
                <TouchableOpacity onPress={refreshDashboard} style={{ marginTop: 10 }}>
                  <Text style={[styles.summaryLabel, { color: Colors.primary }]}>다시 시도</Text>
                </TouchableOpacity>
              </View>
            </Card>
          )}
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
          {loading ? (
            <Card style={styles.progressCard}>
              <View style={[styles.summaryGrid, { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }]}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={[styles.summaryLabel, { marginTop: 10 }]}>데이터를 불러오는 중...</Text>
              </View>
            </Card>
          ) : dashboardData?.weeklySteps ? (
            <Card style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>주간 걸음 수</Text>
                <Text style={styles.progressTotal}>
                  {dashboardData.weeklySteps.totalSteps.toLocaleString()} 걸음
                </Text>
              </View>
              <View style={styles.progressBars}>
                {dashboardData.weeklySteps.dailySteps.map((day, index) => {
                  const maxSteps = Math.max(...dashboardData.weeklySteps.dailySteps.map(d => d.steps));
                  const percentage = maxSteps > 0 ? (day.steps / maxSteps) * 100 : 0;
                  
                  return (
                    <View key={index} style={styles.progressBarContainer}>
                      <View style={styles.progressBar}>
                        <View
                          style={[
                            styles.progressBarFill,
                            {
                              height: `${Math.max(percentage, 5)}%`,
                              backgroundColor:
                                day.steps >= 3000 ? Colors.primary : Colors.accent,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.progressDay}>{day.dayName}</Text>
                      <Text style={styles.progressSteps}>
                        {day.steps.toLocaleString()}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </Card>
          ) : (
            <Card style={styles.progressCard}>
              <View style={[styles.summaryGrid, { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }]}>
                <Text style={styles.summaryLabel}>주간 데이터를 불러올 수 없습니다</Text>
                <TouchableOpacity onPress={refreshDashboard} style={{ marginTop: 10 }}>
                  <Text style={[styles.summaryLabel, { color: Colors.primary }]}>다시 시도</Text>
                </TouchableOpacity>
              </View>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
