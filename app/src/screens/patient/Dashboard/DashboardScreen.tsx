import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../../../components/common/Card';
import { Colors } from '../../../constants/colors';
import { styles } from './DashboardScreen.styled';
import { DashboardScreenNavigationProp } from './types';
import { mockTodayStats, mockWeeklyData } from './mock';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

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
                  {mockTodayStats.steps.toLocaleString()}
                </Text>
                <Text style={styles.summaryLabel}>걸음</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{mockTodayStats.exerciseTime}분</Text>
                <Text style={styles.summaryLabel}>운동</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{mockTodayStats.distance}km</Text>
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
                <Text style={styles.painValue}>{mockTodayStats.averagePain}</Text>
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
                {mockWeeklyData
                  .reduce((sum, day) => sum + day.steps, 0)
                  .toLocaleString()}{' '}
                걸음
              </Text>
            </View>
            <View style={styles.progressBars}>
              {mockWeeklyData.map((day, index) => (
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

export default DashboardScreen;
