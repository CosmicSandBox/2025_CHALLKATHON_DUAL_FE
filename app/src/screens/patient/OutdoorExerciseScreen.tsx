import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Card from '../../components/common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { RootStackParamList } from '../../navigation/types';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';

type OutdoorExerciseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#F8F9FA',
  },
  backButton: {
    marginRight: 8,
    marginTop: 0,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#A3A8AF',
    fontWeight: '400',
  },
  scrollContent: {
    paddingVertical: Spacing.sm,
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
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
    fontWeight: '600',
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
  stopButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    ...Typography.body,
    color: Colors.background,
    fontWeight: '600',
  },
  exerciseContainer: {
    flex: 1,
  },
  exerciseStatusCard: {
    paddingHorizontal: Spacing.paddingLarge,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.componentSpacing,
  },
  statusCard: {
    padding: Spacing.padding,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  statusTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  progressPercentage: {
    ...Typography.h2,
    color: Colors.primary,
    fontWeight: '700',
  },
  progressBarContainer: {
    marginBottom: Spacing.componentSpacing,
  },
  exerciseProgressBar: {
    height: 12,
    backgroundColor: Colors.borderLight,
    borderRadius: 6,
    overflow: 'hidden',
  },
  exerciseProgressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  exerciseStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  exerciseStatItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  exerciseStatLabel: {
    ...Typography.caption,
    color: Colors.textLight,
    textAlign: 'center',
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: Spacing.paddingLarge,
    borderRadius: Spacing.cardRadius,
    overflow: 'hidden',
    backgroundColor: Colors.background,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  webView: {
    flex: 1,
  },
  exerciseActionSection: {
    paddingHorizontal: Spacing.paddingLarge,
    paddingVertical: Spacing.componentSpacing,
  },
  // 새로운 운동 화면 스타일들
  exerciseHeader: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.paddingLarge,
    paddingTop: Spacing.padding,
    paddingBottom: Spacing.componentSpacing,
  },
  exerciseHeaderContent: {
    backgroundColor: Colors.background,
  },
  exerciseTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  exerciseTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  recordBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordText: {
    fontSize: 16,
  },
  progressContainer: {
    marginTop: Spacing.componentSpacing,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  progressLabel: {
    ...Typography.caption,
    color: Colors.textLight,
    fontWeight: '600',
  },
  maxProgressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  currentProgressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#FF5722',
    borderRadius: 4,
  },
  recordCardsContainer: {
    paddingHorizontal: Spacing.paddingLarge,
    paddingVertical: Spacing.componentSpacing,
    backgroundColor: Colors.background,
  },
  recordCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.componentSpacing,
  },
  recordCard: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    borderRadius: Spacing.cardRadius,
    padding: Spacing.padding,
    marginHorizontal: Spacing.xs,
  },
  recordCardHeader: {
    backgroundColor: '#4CAF50',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.componentSpacing,
    borderRadius: 6,
    marginBottom: Spacing.componentSpacing,
  },
  recordCardTitle: {
    ...Typography.caption,
    color: Colors.background,
    fontWeight: '600',
    textAlign: 'center',
  },
  recordCardContent: {
    paddingHorizontal: Spacing.xs,
  },
  recordTime: {
    ...Typography.caption,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  recordDistance: {
    ...Typography.caption,
    color: '#FF5722',
    fontWeight: '600',
  },
  exerciseStopButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: Spacing.componentSpacing,
    paddingHorizontal: Spacing.padding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseStopButtonText: {
    ...Typography.button,
    color: Colors.background,
    fontWeight: '700',
  },
  webViewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: Spacing.componentSpacing,
    ...Typography.body,
    color: Colors.textLight,
  },
});

const OutdoorExerciseScreen: React.FC = () => {
  const navigation = useNavigation<OutdoorExerciseScreenNavigationProp>();
  const webViewRef = useRef<WebView>(null);
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(3500); // 백엔드에서 받아올 예정
  const [checkpointCount, setCheckpointCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [exerciseProgress, setExerciseProgress] = useState(0);
  const [locationSubscription, setLocationSubscription] = useState<Location.LocationSubscription | null>(null);

  // Kakao Maps JavaScript API를 사용한 커스텀 게임 지도
    const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>카카오 맵 운동 게임</title>
        <style>
            body, html {
                margin: 0;
                padding: 0;
                height: 100%;
                overflow: hidden;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            #map {
                width: 100%;
                height: 100%;
            }
            .loading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                z-index: 1000;
            }
            .checkpoint-notification {
                position: absolute;
                bottom: 20px;
                left: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white;
                border-radius: 16px;
                padding: 20px;
                text-align: center;
                font-weight: bold;
                font-size: 18px;
                display: none;
                z-index: 1000;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                animation: slideUp 0.3s ease-out;
            }
            
            @keyframes slideUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        </style>
    </head>
    <body>
        <div id="loading" class="loading">
            <div>🗺️</div>
            <div>지도를 불러오는 중...</div>
        </div>
        
        <div id="checkpoint-notification" class="checkpoint-notification">
            <div style="font-size: 24px; margin-bottom: 8px;">🎉 체크포인트 달성!</div>
            <div id="checkpoint-message">새로운 도전이 기다립니다!</div>
        </div>
        
        <div id="map"></div>

        <script>
            console.log('카카오 맵 스크립트 시작');
            
            // 로딩 표시
            function showLoading() {
                document.getElementById('loading').style.display = 'block';
            }
            
            function hideLoading() {
                document.getElementById('loading').style.display = 'none';
            }
            
            // 카카오 맵 API 로드
            function loadKakaoMapAPI() {
                return new Promise((resolve, reject) => {
                    if (window.kakao && window.kakao.maps) {
                        resolve();
                        return;
                    }
                    
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=4130719bf72a312a77503c40294d252d&libraries=services&autoload=false';
                    script.onload = () => {
                        kakao.maps.load(() => {
                            console.log('카카오 맵 API 로드 완료');
                            resolve();
                        });
                    };
                    script.onerror = (error) => {
                        console.error('카카오 맵 API 로드 실패:', error);
                        reject(error);
                    };
                    document.head.appendChild(script);
                });
            }
            
            let map;
            let userMarker = null;
            let currentCheckpoint = null;
            let checkpointMarker = null;
            let checkpointCircle = null;
            let userPath = [];
            let pathPolyline = null;
            
            // 게임 상태
            let gameState = {
                userPosition: null,
                currentDistance: 0,
                totalDistance: 0,
                checkpointCount: 0,
                checkpointRadius: 50,
                maxDistance: 3500,
                isTracking: false
            };
            
            // 지도 초기화
            async function initializeMap(lat, lng) {
                console.log('지도 초기화 시작:', lat, lng);
                showLoading();
                
                try {
                    await loadKakaoMapAPI();
                    
                    const mapContainer = document.getElementById('map');
                    const mapOption = {
                        center: new kakao.maps.LatLng(lat, lng),
                        level: 4,
                        mapTypeId: kakao.maps.MapTypeId.ROADMAP
                    };
                    
                    map = new kakao.maps.Map(mapContainer, mapOption);
                    console.log('카카오 맵 생성 완료');
                    
                    // 지도 컨트롤 추가
                    const mapTypeControl = new kakao.maps.MapTypeControl();
                    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
                    
                    const zoomControl = new kakao.maps.ZoomControl();
                    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
                    
                    // 사용자 위치 설정
                    gameState.userPosition = { lat, lng };
                    createUserMarker(lat, lng);
                    
                    // 첫 번째 체크포인트 생성
                    createRandomCheckpoint();
                    
                    hideLoading();
                    sendMessageToApp({ type: 'map_initialized', success: true });
                    
                } catch (error) {
                    console.error('지도 초기화 실패:', error);
                    hideLoading();
                    sendMessageToApp({ 
                        type: 'error', 
                        message: '지도를 불러올 수 없습니다: ' + error.message 
                    });
                }
            }
            
            // React Native에서 위치 업데이트 받기
            function updateUserPositionFromNative(newLat, newLng) {
                const previousPosition = gameState.userPosition;
                
                if (previousPosition) {
                    const distance = calculateDistance(
                        previousPosition.lat, previousPosition.lng,
                        newLat, newLng
                    );
                    
                    if (distance >= 1) {
                        gameState.currentDistance += distance;
                        gameState.totalDistance += distance;
                        
                        userPath.push(new kakao.maps.LatLng(newLat, newLng));
                        updateUserPath();
                    }
                }
                
                gameState.userPosition = { lat: newLat, lng: newLng };
                
                if (userMarker) {
                    userMarker.setPosition(new kakao.maps.LatLng(newLat, newLng));
                }
                
                if (map) {
                    map.panTo(new kakao.maps.LatLng(newLat, newLng));
                }
                
                checkCheckpointReached();
                sendLocationUpdate();
            }
            
            // 사용자 마커 생성
            function createUserMarker(lat, lng) {
                const userIcon = createCustomMarkerIcon('user');
                
                userMarker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(lat, lng),
                    map: map,
                    image: userIcon
                });
                
                map.setCenter(new kakao.maps.LatLng(lat, lng));
            }
            
            // 커스텀 마커 아이콘 생성
            function createCustomMarkerIcon(type) {
                let svgContent;
                let size;
                
                if (type === 'user') {
                    svgContent = \`
                        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="14" fill="#2196F3" stroke="white" stroke-width="3"/>
                            <circle cx="16" cy="16" r="6" fill="white"/>
                            <circle cx="16" cy="16" r="3" fill="#1976D2"/>
                        </svg>
                    \`;
                    size = new kakao.maps.Size(32, 32);
                } else if (type === 'checkpoint') {
                    svgContent = \`
                        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="20" fill="#FFD700" stroke="#FF8C00" stroke-width="4"/>
                            <circle cx="24" cy="24" r="12" fill="#FFA000"/>
                            <text x="24" y="30" text-anchor="middle" font-size="20" fill="white" font-weight="bold">★</text>
                        </svg>
                    \`;
                    size = new kakao.maps.Size(48, 48);
                }
                
                const imageUrl = 'data:image/svg+xml;base64,' + btoa(svgContent);
                return new kakao.maps.MarkerImage(imageUrl, size, {
                    offset: new kakao.maps.Point(size.width/2, size.height/2)
                });
            }
            
            // 랜덤 체크포인트 생성
            function createRandomCheckpoint() {
                if (!gameState.userPosition || !map) return;
                
                if (checkpointMarker) checkpointMarker.setMap(null);
                if (checkpointCircle) checkpointCircle.setMap(null);
                
                const angle = Math.random() * 2 * Math.PI;
                const minDistance = gameState.checkpointRadius * 0.7;
                const maxDistance = gameState.checkpointRadius * 1.3;
                const distance = minDistance + Math.random() * (maxDistance - minDistance);
                
                const deltaLat = (distance * Math.cos(angle)) / 111000;
                const deltaLng = (distance * Math.sin(angle)) / (111000 * Math.cos(gameState.userPosition.lat * Math.PI / 180));
                
                const checkpointLat = gameState.userPosition.lat + deltaLat;
                const checkpointLng = gameState.userPosition.lng + deltaLng;
                
                currentCheckpoint = {
                    lat: checkpointLat,
                    lng: checkpointLng,
                    radius: 25
                };
                
                const checkpointIcon = createCustomMarkerIcon('checkpoint');
                checkpointMarker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(checkpointLat, checkpointLng),
                    map: map,
                    image: checkpointIcon
                });
                
                checkpointCircle = new kakao.maps.Circle({
                    center: new kakao.maps.LatLng(checkpointLat, checkpointLng),
                    radius: currentCheckpoint.radius,
                    strokeWeight: 3,
                    strokeColor: '#FFD700',
                    strokeOpacity: 0.8,
                    strokeStyle: 'dashed',
                    fillColor: '#FFD700',
                    fillOpacity: 0.15
                });
                
                checkpointCircle.setMap(map);
                console.log('체크포인트 생성:', checkpointLat, checkpointLng);
            }
            
            // 사용자 이동 경로 그리기
            function updateUserPath() {
                if (pathPolyline) pathPolyline.setMap(null);
                
                if (userPath.length > 1) {
                    pathPolyline = new kakao.maps.Polyline({
                        path: userPath,
                        strokeWeight: 4,
                        strokeColor: '#2196F3',
                        strokeOpacity: 0.8,
                        strokeStyle: 'solid'
                    });
                    
                    pathPolyline.setMap(map);
                }
            }
            
            // 체크포인트 도달 확인
            function checkCheckpointReached() {
                if (!currentCheckpoint || !gameState.userPosition) return;
                
                const distance = calculateDistance(
                    gameState.userPosition.lat, gameState.userPosition.lng,
                    currentCheckpoint.lat, currentCheckpoint.lng
                );
                
                if (distance <= currentCheckpoint.radius) {
                    onCheckpointReached();
                }
            }
            
            // 체크포인트 도달 처리
            function onCheckpointReached() {
                gameState.checkpointCount++;
                gameState.checkpointRadius += 30;
                
                showCheckpointNotification();
                
                setTimeout(() => {
                    createRandomCheckpoint();
                }, 2000);
                
                sendMessageToApp({
                    type: 'checkpoint_reached',
                    checkpointCount: gameState.checkpointCount,
                    newRadius: gameState.checkpointRadius,
                    totalDistance: Math.round(gameState.totalDistance)
                });
                
                console.log('체크포인트 달성! 개수:', gameState.checkpointCount);
            }
            
            // 체크포인트 달성 알림 표시
            function showCheckpointNotification() {
                const notification = document.getElementById('checkpoint-notification');
                const message = document.getElementById('checkpoint-message');
                
                const messages = [
                    '훌륭합니다! 계속 도전하세요!',
                    '잘하고 있어요! 다음 목표로!',
                    '대단해요! 더 멀리 가봐요!',
                    '완벽해요! 목표 달성!',
                    '놀라워요! 한계를 넘어서고 있어요!'
                ];
                
                message.textContent = messages[Math.floor(Math.random() * messages.length)];
                notification.style.display = 'block';
                
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000);
            }
            
            // 거리 계산
            function calculateDistance(lat1, lng1, lat2, lng2) {
                const R = 6371e3;
                const φ1 = lat1 * Math.PI / 180;
                const φ2 = lat2 * Math.PI / 180;
                const Δφ = (lat2 - lat1) * Math.PI / 180;
                const Δλ = (lng2 - lng1) * Math.PI / 180;

                const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                        Math.cos(φ1) * Math.cos(φ2) *
                        Math.sin(Δλ/2) * Math.sin(Δλ/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                return R * c;
            }
            
            // React Native에 위치 업데이트 전송
            function sendLocationUpdate() {
                const progress = Math.min(100, (gameState.totalDistance / gameState.maxDistance) * 100);
                
                sendMessageToApp({
                    type: 'location_update',
                    distance: Math.round(gameState.totalDistance),
                    currentDistance: Math.round(gameState.currentDistance),
                    progress: progress,
                    checkpoints: gameState.checkpointCount,
                    position: gameState.userPosition
                });
            }
            
            // React Native에 메시지 전송
            function sendMessageToApp(data) {
                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(JSON.stringify(data));
                }
                console.log('React Native로 메시지 전송:', data);
            }
            
            // 게임 상태 리셋
            function resetGameState() {
                gameState = {
                    userPosition: null,
                    currentDistance: 0,
                    totalDistance: 0,
                    checkpointCount: 0,
                    checkpointRadius: 50,
                    maxDistance: 3500,
                    isTracking: false
                };
                
                userPath = [];
                if (pathPolyline) {
                    pathPolyline.setMap(null);
                    pathPolyline = null;
                }
                
                if (checkpointMarker) {
                    checkpointMarker.setMap(null);
                    checkpointMarker = null;
                }
                
                if (checkpointCircle) {
                    checkpointCircle.setMap(null);
                    checkpointCircle = null;
                }
            }
            
            // React Native에서 메시지 수신 (단일 리스너)
            window.addEventListener('message', function(event) {
                try {
                    const data = JSON.parse(event.data);
                    console.log('React Native에서 메시지 수신:', data);
                    
                    switch(data.type) {
                        case 'init_map':
                            initializeMap(data.lat, data.lng);
                            break;
                            
                        case 'update_location':
                            updateUserPositionFromNative(data.lat, data.lng);
                            break;
                            
                        case 'set_max_distance':
                            gameState.maxDistance = data.maxDistance;
                            break;
                            
                        case 'reset_game':
                            resetGameState();
                            break;
                    }
                } catch (error) {
                    console.error('React Native 메시지 파싱 오류:', error);
                }
            });
            
            // 페이지 로드 완료
            window.addEventListener('load', function() {
                console.log('카카오 맵 WebView 로드 완료');
                sendMessageToApp({ type: 'map_ready' });
            });
            
            // 에러 핸들링
            window.addEventListener('error', function(event) {
                console.error('WebView 오류:', event.error);
                sendMessageToApp({
                    type: 'error',
                    message: event.error.message
                });
            });
            
            // DOMContentLoaded 이벤트로도 확인
            document.addEventListener('DOMContentLoaded', function() {
                console.log('DOM 로드 완료');
                sendMessageToApp({ type: 'dom_ready' });
            });
        </script>
    </body>
    </html>`;

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

  // 컴포넌트 언마운트 시 위치 추적 정리
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
              // 위치 추적 중지
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

  // 실시간 위치 추적 시작
  const startLocationTracking = async () => {
    try {
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 3000, // 3초마다 업데이트
          distanceInterval: 1, // 1미터마다 업데이트
        },
        (location) => {
          console.log('Location update:', location.coords);
          
          // WebView에 위치 업데이트 전송
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
      console.log('위치 추적 시작됨');
      
    } catch (error) {
      console.error('위치 추적 시작 실패:', error);
      Alert.alert('위치 추적 오류', '위치 추적을 시작할 수 없습니다.');
    }
  };

  const startExercise = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('위치 권한 필요', '위치 권한을 허용해주세요.');
        setLoading(false);
        return;
      }
      
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      
      console.log('Current location:', location.coords);
      setIsExerciseStarted(true);
      
      // 지도 초기화를 위해 위치 전송
      setTimeout(() => {
        if (webViewRef.current) {
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
      }, 1000);
      
      // 실시간 위치 추적 시작
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
            // 위치 추적 중지
            if (locationSubscription) {
              locationSubscription.remove();
              setLocationSubscription(null);
              console.log('위치 추적 중지됨');
            }
            
            // WebView 게임 상태 리셋
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

  // WebView에서 메시지 수신 처리
  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('WebView 메시지 수신:', data);
      
      switch (data.type) {
        case 'map_ready':
          setMapReady(true);
          console.log('카카오 맵 WebView가 준비되었습니다');
          break;
          
        case 'dom_ready':
          console.log('DOM이 준비되었습니다');
          break;
          
        case 'map_initialized':
          console.log('카카오 맵이 성공적으로 초기화되었습니다');
          break;
          
        case 'location_update':
          setCurrentDistance(data.distance);
          setExerciseProgress(data.progress);
          setCheckpointCount(data.checkpoints);
          break;
          
        case 'checkpoint_reached':
          setCheckpointCount(data.checkpoints);
          Alert.alert('🎉 체크포인트 달성!', `${data.checkpoints}번째 체크포인트를 달성했습니다!`);
          break;
          
        case 'location_error':
          Alert.alert('위치 오류', data.error);
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
                baseUrl: 'https://app.example.com',
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
              onHttpError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.error('WebView HTTP error: ', nativeEvent);
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