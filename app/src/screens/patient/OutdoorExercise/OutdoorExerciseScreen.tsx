import React, { useState, useRef, useEffect } from 'react';
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
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import Card from '../../../components/common/Card';
import { Colors } from '../../../constants/colors';
import { styles } from './OutdoorExerciseScreen.styled';
import { OutdoorExerciseScreenNavigationProp, WebViewMessage, LocationSubscription } from './types';
import { useOutdoorExercise } from '../../../hooks/useOutdoorExercise';
import { mapHtml } from './mapHtml';

const OutdoorExerciseScreen: React.FC = () => {
  const navigation = useNavigation<OutdoorExerciseScreenNavigationProp>();
  const webViewRef = useRef<WebView>(null);
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [maxDistance] = useState(3500);
  const [checkpointCount, setCheckpointCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [exerciseProgress, setExerciseProgress] = useState(0);
  const [locationSubscription, setLocationSubscription] = useState<LocationSubscription | null>(null);

  const { outdoorStatus, loading: exerciseLoading, error, refreshOutdoorStatus } = useOutdoorExercise();

  // Create todayStats from API data
  const todayStats = {
    completed: 0,
    total: 1,
    distance: outdoorStatus?.yesterdayRecord.distanceKm || 0,
    time: outdoorStatus?.yesterdayRecord.durationMinutes || 0
  };

  // Mock data for features not available in API
  const weatherInfo = {
    temperature: 22,
    condition: '맑음',
    humidity: 65,
    windSpeed: 2.1
  };

  const safetyTips = [
    { icon: '🤸', text: '운동 전 충분한 스트레칭을 해주세요' },
    { icon: '💧', text: '수분 섭취를 잊지 마세요' },
    { icon: '🚶', text: '무리하지 말고 천천히 시작하세요' },
    { icon: '⚠️', text: '이상 증상이 있으면 즉시 중단하세요' }
  ];

  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('위치 권한이 없습니다.');
        }
      } catch (error) {
        console.error('권한 확인 중 오류:', error);
      }
    };
    
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const initializeMapIfReady = async () => {
      if (isExerciseStarted && mapReady && webViewRef.current) {
        try {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
          });
          
          setTimeout(() => {
            if (webViewRef.current) {
              const initMapScript = `
                try {
                  initializeMap(${location.coords.latitude}, ${location.coords.longitude});
                  if (typeof gameState !== 'undefined') {
                    gameState.maxDistance = ${maxDistance};
                  }
                } catch (error) {
                  console.error('injectedJavaScript 실행 오류:', error);
                }
                true;
              `;
              
              webViewRef.current.injectJavaScript(initMapScript);
              
              webViewRef.current.postMessage(JSON.stringify({
                type: 'init_map',
                lat: location.coords.latitude,
                lng: location.coords.longitude
              }));
              
              webViewRef.current.postMessage(JSON.stringify({
                type: 'set_max_distance',
                maxDistance: maxDistance
              }));
            }
          }, 100);
          
        } catch (error) {
          console.error('지도 초기화용 위치 가져오기 실패:', error);
        }
      }
    };
    
    initializeMapIfReady();
  }, [isExerciseStarted, mapReady, maxDistance]);

  useEffect(() => {
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
        setLocationSubscription(null);
      }
    };
  }, [locationSubscription]);

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
              if (locationSubscription) {
                locationSubscription.remove();
                setLocationSubscription(null);
              }
              
              setIsExerciseStarted(false);
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

  const startLocationTracking = async () => {
    try {
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 3000,
          distanceInterval: 1,
        },
        (location) => {
          if (webViewRef.current && isExerciseStarted) {
            webViewRef.current.postMessage(JSON.stringify({
              type: 'update_location',
              lat: location.coords.latitude,
              lng: location.coords.longitude
            }));
          }
        }
      );
      
      setLocationSubscription(subscription);
      
    } catch (error) {
      console.error('위치 추적 시작 실패:', error);
      Alert.alert('위치 추적 오류', '위치 추적을 시작할 수 없습니다.');
    }
  };

  const startExercise = async () => {
    setLoading(true);
    try {
      let { status } = await Location.getForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        const result = await Location.requestForegroundPermissionsAsync();
        status = result.status;
      }
      
      if (status !== 'granted') {
        Alert.alert(
          '위치 권한 필요', 
          '운동 경로 추적을 위해 위치 권한이 필요합니다. 설정에서 위치 권한을 허용해주세요.',
          [
            { text: '취소', style: 'cancel' },
            { text: '설정으로 이동', onPress: () => console.log('설정으로 이동') }
          ]
        );
        setLoading(false);
        return;
      }
      
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      
      setIsExerciseStarted(true);
      startLocationTracking();
      
    } catch (e) {
      console.error('Location error:', e);
      Alert.alert('위치 오류', '현재 위치를 가져올 수 없습니다.');
    }
    setLoading(false);
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
            if (locationSubscription) {
              locationSubscription.remove();
              setLocationSubscription(null);
            }
            
            if (webViewRef.current) {
              webViewRef.current.postMessage(JSON.stringify({
                type: 'reset_game'
              }));
            }
            
            setIsExerciseStarted(false);
            setCurrentDistance(0);
            setCheckpointCount(0);
            setExerciseProgress(0);
            setMapReady(false);
          }
        },
      ]
    );
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const data: WebViewMessage = JSON.parse(event.nativeEvent.data);
      
      switch (data.type) {
        case 'map_ready':
          setMapReady(true);
          break;
          
        case 'map_initialized':
          console.log('카카오 맵이 성공적으로 초기화되었습니다');
          break;
          
        case 'location_update':
          if (data.distance !== undefined) setCurrentDistance(data.distance);
          if (data.progress !== undefined) setExerciseProgress(data.progress);
          if (data.checkpoints !== undefined) setCheckpointCount(data.checkpoints);
          break;
          
        case 'checkpoint_reached':
          if (data.checkpoints !== undefined) setCheckpointCount(data.checkpoints);
          Alert.alert('🎉 체크포인트 달성!', `${data.checkpoints}번째 체크포인트를 달성했습니다!`);
          break;
          
        case 'error':
          console.error('WebView 오류:', data.message);
          Alert.alert('지도 오류', `지도에서 오류가 발생했습니다: ${data.message}`);
          break;
      }
    } catch (error) {
      console.error('WebView 메시지 파싱 오류:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="chevron-left" size={28} color="#A3A8AF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>실외 재활 운동</Text>
          <Text style={styles.headerSubtitle}>
            {isExerciseStarted ? '운동이 진행 중입니다' : '안전하고 효과적인 실외 운동을 시작해보세요'}
          </Text>
        </View>
      </View>

      {isExerciseStarted ? (
        <View style={styles.exerciseContainer}>
          {/* 상단 프로그레스 바 */}
          <View style={styles.exerciseHeader}>
            <View style={styles.exerciseHeaderContent}>
              <View style={styles.exerciseTitleContainer}>
                <Text style={styles.exerciseTitle}>실외 재활 운동</Text>
                <View style={styles.recordBadge}>
                  <Text style={styles.recordText}>🏆</Text>
                </View>
              </View>
              
              {/* 진행률 바 */}
              <View style={styles.progressContainer}>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressLabel}>전날기록</Text>
                  <Text style={styles.progressLabel}>현재기록</Text>
                </View>
                <View style={styles.exerciseProgressBar}>
                  <View 
                    style={[styles.maxProgressFill, { width: '100%' }]} 
                  />
                  <View 
                    style={[styles.currentProgressFill, { width: `${exerciseProgress}%` }]} 
                  />
                </View>
              </View>
            </View>
          </View>

          {/* 카카오 맵 */}
          <View style={styles.mapContainer}>
            <WebView
              ref={webViewRef}
              source={{
                html: mapHtml,
                baseUrl: 'https://dapi.kakao.com',
              }}
              style={styles.webView}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              geolocationEnabled={true}
              onMessage={handleWebViewMessage}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              mixedContentMode="compatibility"
              originWhitelist={['*']}
              allowsFullscreenVideo={true}
              startInLoadingState={true}
              allowFileAccess={true}
              allowFileAccessFromFileURLs={true}
              allowUniversalAccessFromFileURLs={true}
              onShouldStartLoadWithRequest={() => true}
              thirdPartyCookiesEnabled={true}
              sharedCookiesEnabled={true}
              cacheEnabled={true}
              userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
              webviewDebuggingEnabled={__DEV__}
              renderLoading={() => (
                <View style={styles.webViewLoading}>
                  <ActivityIndicator size="large" color={Colors.primary} />
                  <Text style={styles.loadingText}>지도를 불러오는 중...</Text>
                </View>
              )}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.error('WebView error: ', nativeEvent);
                Alert.alert('지도 오류', '지도를 불러올 수 없습니다.');
              }}
            />
          </View>

          {/* 하단 기록 카드들 */}
          <View style={styles.recordCardsContainer}>
            <View style={styles.recordCardsRow}>
              <View style={styles.recordCard}>
                <View style={styles.recordCardHeader}>
                  <Text style={styles.recordCardTitle}>전날 운동 기록</Text>
                </View>
                <View style={styles.recordCardContent}>
                  <Text style={styles.recordTime}>-시간 : 30분 21초</Text>
                  <Text style={styles.recordDistance}>-거리 : {maxDistance}보</Text>
                </View>
              </View>
              
              <View style={styles.recordCard}>
                <View style={styles.recordCardHeader}>
                  <Text style={styles.recordCardTitle}>현재 운동 기록</Text>
                </View>
                <View style={styles.recordCardContent}>
                  <Text style={styles.recordTime}>-시간 : 5분 17초</Text>
                  <Text style={styles.recordDistance}>-거리 : {currentDistance}보</Text>
                </View>
              </View>
            </View>
            
            {/* 운동 종료 버튼 */}
            <TouchableOpacity
              style={styles.exerciseStopButton}
              onPress={stopExercise}
            >
              <Text style={styles.exerciseStopButtonText}>운동 멈춤</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
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

          {/* Safety Tips */}
          <View style={styles.safetySection}>
            <Text style={styles.sectionTitle}>안전 수칙</Text>
            <Card style={styles.safetyCard}>
              {safetyTips.map((tip, index) => (
                <View key={index} style={styles.safetyItem}>
                  <View style={styles.safetyIcon}>
                    <Text style={styles.safetyIconText}>{tip.icon}</Text>
                  </View>
                  <Text style={styles.safetyText}>{tip.text}</Text>
                </View>
              ))}
            </Card>
          </View>

          {/* Action Button */}
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={startExercise}
              disabled={loading}
            >
              <Text style={styles.actionButtonText}>
                {loading ? '위치 확인 중...' : '운동 시작'}
              </Text>
              {loading && <ActivityIndicator size="small" color="#fff" style={{ marginLeft: 8 }} />}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default OutdoorExerciseScreen;
