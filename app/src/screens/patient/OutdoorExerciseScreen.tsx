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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Card from '../../components/common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { RootStackParamList } from '../../navigation/types';

type OutdoorExerciseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const OutdoorExerciseScreen: React.FC = () => {
  const navigation = useNavigation<OutdoorExerciseScreenNavigationProp>();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const [currentDistance, setCurrentDistance] = useState(0);

  const routes = [
    {
      id: '1',
      name: '공원 산책로',
      description: '편안한 산책과 가벼운 운동',
      distance: '1.2km',
      duration: '20분',
      difficulty: '쉬움',
      icon: '🌳',
      color: '#4CAF50',
      features: ['평평한 길', '그늘 많음', '벤치 있음'],
    },
    {
      id: '2',
      name: '강변 트레일',
      description: '강을 따라 걷는 경로',
      distance: '2.5km',
      duration: '35분',
      difficulty: '보통',
      icon: '🌊',
      color: '#2196F3',
      features: ['강 전망', '바람 시원함', '평평한 길'],
    },
    {
      id: '3',
      name: '언덕 코스',
      description: '약간의 경사가 있는 코스',
      distance: '1.8km',
      duration: '30분',
      difficulty: '보통',
      icon: '⛰️',
      color: '#FF9800',
      features: ['경사 있음', '전망 좋음', '운동 효과 높음'],
    },
    {
      id: '4',
      name: '도시 순환로',
      description: '도시를 둘러싸는 순환 경로',
      distance: '3.2km',
      duration: '45분',
      difficulty: '어려움',
      icon: '🏙️',
      color: '#9C27B0',
      features: ['도시 전망', '다양한 경사', '운동 효과 최고'],
    },
  ];

  const todayStats = {
    completed: 1,
    total: 3,
    distance: 2.5,
    time: 35,
  };

  const weatherInfo = {
    temperature: 22,
    condition: '맑음',
    humidity: 65,
    windSpeed: 3,
  };

  const handleGoBack = () => {
    if (isExerciseStarted) {
      Alert.alert(
        '운동 중',
        '운동이 진행 중입니다. 정말 나가시겠습니까?',
        [
          { text: '취소', style: 'cancel' },
          { 
            text: '나가기', 
            onPress: () => {
              setIsExerciseStarted(false);
              setSelectedRoute(null);
              setCurrentDistance(0);
              navigation.goBack();
            }
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const startExercise = () => {
    if (!selectedRoute) {
      Alert.alert('경로 선택', '운동 경로를 선택해주세요.');
      return;
    }
    setIsExerciseStarted(true);
    // 실제로는 GPS 추적 시작 로직
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
            setSelectedRoute(null);
            setCurrentDistance(0);
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>실외 운동</Text>
          <Text style={styles.subtitle}>자연 속에서 건강한 운동을 시작해보세요</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Weather Info */}
        <View style={styles.weatherSection}>
          <Card style={styles.weatherCard}>
            <View style={styles.weatherHeader}>
              <Text style={styles.weatherTitle}>오늘의 날씨</Text>
              <Text style={styles.weatherIcon}>☀️</Text>
            </View>
            <View style={styles.weatherStats}>
              <View style={styles.weatherItem}>
                <Text style={styles.weatherValue}>{weatherInfo.temperature}°C</Text>
                <Text style={styles.weatherLabel}>기온</Text>
              </View>
              <View style={styles.weatherItem}>
                <Text style={styles.weatherValue}>{weatherInfo.condition}</Text>
                <Text style={styles.weatherLabel}>날씨</Text>
              </View>
              <View style={styles.weatherItem}>
                <Text style={styles.weatherValue}>{weatherInfo.humidity}%</Text>
                <Text style={styles.weatherLabel}>습도</Text>
              </View>
              <View style={styles.weatherItem}>
                <Text style={styles.weatherValue}>{weatherInfo.windSpeed}m/s</Text>
                <Text style={styles.weatherLabel}>풍속</Text>
              </View>
            </View>
          </Card>
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
                <Text style={styles.statValue}>{todayStats.distance}km</Text>
                <Text style={styles.statLabel}>총 거리</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{todayStats.time}분</Text>
                <Text style={styles.statLabel}>총 시간</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Route Selection */}
        <View style={styles.routeSection}>
          <Text style={styles.sectionTitle}>운동 경로 선택</Text>
          <View style={styles.routeGrid}>
            {routes.map((route) => (
              <TouchableOpacity
                key={route.id}
                style={[
                  styles.routeCard,
                  selectedRoute === route.id && styles.selectedRouteCard
                ]}
                onPress={() => setSelectedRoute(route.id)}
              >
                <View style={styles.routeHeader}>
                  <View style={[styles.routeIcon, { backgroundColor: route.color + '20' }]}>
                    <Text style={styles.routeIconText}>{route.icon}</Text>
                  </View>
                  <View style={styles.routeInfo}>
                    <Text style={styles.routeName}>{route.name}</Text>
                    <Text style={styles.routeDescription}>{route.description}</Text>
                  </View>
                </View>
                <View style={styles.routeMeta}>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>거리</Text>
                    <Text style={styles.metaValue}>{route.distance}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>시간</Text>
                    <Text style={styles.metaValue}>{route.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>난이도</Text>
                    <Text style={styles.metaValue}>{route.difficulty}</Text>
                  </View>
                </View>
                <View style={styles.routeFeatures}>
                  {route.features.map((feature, index) => (
                    <View key={index} style={styles.featureTag}>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Safety Tips */}
        <View style={styles.safetySection}>
          <Text style={styles.sectionTitle}>안전 수칙</Text>
          <Card style={styles.safetyCard}>
            <View style={styles.safetyItem}>
              <View style={styles.safetyIcon}>
                <Text style={styles.safetyIconText}>🚶‍♂️</Text>
              </View>
              <Text style={styles.safetyText}>보행자 도로를 이용하세요</Text>
            </View>
            <View style={styles.safetyItem}>
              <View style={styles.safetyIcon}>
                <Text style={styles.safetyIconText}>👕</Text>
              </View>
              <Text style={styles.safetyText}>밝은 색의 옷을 입으세요</Text>
            </View>
            <View style={styles.safetyItem}>
              <View style={styles.safetyIcon}>
                <Text style={styles.safetyIconText}>💧</Text>
              </View>
              <Text style={styles.safetyText}>충분한 수분을 섭취하세요</Text>
            </View>
            <View style={styles.safetyItem}>
              <View style={styles.safetyIcon}>
                <Text style={styles.safetyIconText}>📱</Text>
              </View>
              <Text style={styles.safetyText}>긴급 연락처를 준비하세요</Text>
            </View>
          </Card>
        </View>

        {/* Action Button */}
        <View style={styles.actionSection}>
          {!isExerciseStarted ? (
            <TouchableOpacity
              style={[
                styles.actionButton,
                !selectedRoute && styles.disabledButton
              ]}
              onPress={startExercise}
              disabled={!selectedRoute}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.paddingLarge,
    paddingTop: Spacing.sectionSpacing,
    paddingBottom: Spacing.componentSpacing,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 20,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  headerContent: {
    flex: 1,
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
  scrollContent: {
    paddingBottom: Spacing.sectionSpacing,
  },
  weatherSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  weatherCard: {
    padding: Spacing.padding,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  weatherTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  weatherIcon: {
    fontSize: 24,
  },
  weatherStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weatherItem: {
    alignItems: 'center',
  },
  weatherValue: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  weatherLabel: {
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
  routeSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
    fontWeight: '600',
  },
  routeGrid: {
    gap: Spacing.componentSpacing,
  },
  routeCard: {
    backgroundColor: Colors.background,
    borderRadius: Spacing.cardRadius,
    padding: Spacing.padding,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedRouteCard: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  routeHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.componentSpacing,
  },
  routeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  routeIconText: {
    fontSize: 24,
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  routeDescription: {
    ...Typography.caption,
    color: Colors.textLight,
    lineHeight: 16,
  },
  routeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.componentSpacing,
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
  routeFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  featureTag: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  featureText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontSize: 12,
  },
  safetySection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  safetyCard: {
    padding: 0,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.componentSpacing,
    paddingHorizontal: Spacing.padding,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  safetyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  safetyIconText: {
    fontSize: 18,
  },
  safetyText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
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

export default OutdoorExerciseScreen; 