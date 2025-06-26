import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Card from '../../components/common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

const CaregiverDashboardScreen: React.FC = () => {
  // 환자 위치 보기 모달 상태
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [webViewLoading, setWebViewLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);

  const caregiverInfo = {
    name: '김보호',
    role: '전문 보호자',
  };

  // 1명의 환자 정보
  const patient = {
    id: '1',
    name: '홍길동',
    age: 65,
    condition: '뇌졸중 후유증',
    status: '온라인',
    lastUpdate: '10분 전',
    todaySteps: 3247,
    todayExercise: 45,
    painLevel: 3,
    mood: '좋음',
    needsAttention: false,
    phone: '010-1234-5678',
    emergencyContact: '010-9876-5432',
    progress: 75,
    assignedDate: '2024-01-15',
  };

  const urgentAlerts = [
    {
      id: '1',
      type: '통증 증가',
      message: '통증 수준이 7/10으로 증가',
      time: '5분 전',
      priority: 'high',
    },
    {
      id: '2',
      type: '운동 중단',
      message: '실외 운동이 예상보다 일찍 종료',
      time: '15분 전',
      priority: 'medium',
    },
  ];

  const getStatusColor = (status: string) => {
    return status === '온라인' ? '#4CAF50' : '#9E9E9E';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return Colors.primary;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#4CAF50';
    if (progress >= 60) return '#FF9800';
    return '#F44336';
  };

  const handleCallPatient = () => {
    console.log('환자에게 전화:', patient.phone);
  };

  const handleEmergencyCall = () => {
    console.log('긴급 연락처:', patient.emergencyContact);
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
            <Text style={styles.greeting}>보호자님, 안녕하세요 👋</Text>
            <Text style={styles.subtitle}>환자를 잘 케어해주세요</Text>
          </View>
          <View style={styles.profileContainer}>
            <Text style={styles.profileIcon}>👨‍⚕️</Text>
          </View>
        </View>

        {/* Caregiver Info */}
        <View style={styles.caregiverSection}>
          <Card style={styles.caregiverCard}>
            <View style={styles.caregiverHeader}>
              <View style={styles.caregiverAvatar}>
                <Text style={styles.caregiverAvatarText}>👨‍⚕️</Text>
              </View>
              <View style={styles.caregiverInfo}>
                <Text style={styles.caregiverName}>{caregiverInfo.name} 보호자</Text>
                <Text style={styles.caregiverRole}>{caregiverInfo.role}</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Patient Info - 1명 환자 중심 */}
        <View style={styles.patientSection}>
          <Text style={styles.sectionTitle}>담당 환자</Text>
          <Card style={{
            ...styles.patientCard,
            ...(patient.needsAttention && styles.attentionCard),
          }}>
            <View style={styles.patientHeader}>
              <View style={styles.patientAvatar}>
                <Text style={styles.patientAvatarText}>👴</Text>
              </View>
              <View style={styles.patientInfo}>
                <Text style={styles.patientName}>
                  {patient.name} ({patient.age}세)
                </Text>
                <Text style={styles.patientCondition}>{patient.condition}</Text>
                <View style={styles.patientStatus}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(patient.status) }]} />
                  <Text style={[styles.statusText, { color: getStatusColor(patient.status) }]}>
                    {patient.status} • 마지막 업데이트: {patient.lastUpdate}
                  </Text>
                </View>
              </View>
              {patient.needsAttention && (
                <View style={styles.attentionBadge}>
                  <Text style={styles.attentionBadgeText}>⚠️</Text>
                </View>
              )}
            </View>

            {/* Progress Bar */}
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>재활 진행률</Text>
                <Text style={[styles.progressValue, { color: getProgressColor(patient.progress) }]}>
                  {patient.progress}%
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${patient.progress}%`,
                      backgroundColor: getProgressColor(patient.progress)
                    }
                  ]} 
                />
              </View>
            </View>

            {/* Contact Actions */}
            <View style={styles.contactSection}>
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={handleCallPatient}
              >
                <Text style={styles.contactButtonIcon}>📞</Text>
                <Text style={styles.contactButtonText}>환자 연락</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.contactButton, styles.emergencyButton]}
                onPress={handleEmergencyCall}
              >
                <Text style={styles.contactButtonIcon}>🚨</Text>
                <Text style={styles.contactButtonText}>긴급 연락</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* Patient Location Button */}
        <View style={styles.locationSection}>
          <TouchableOpacity 
            style={styles.locationButton}
            onPress={() => setShowLocationModal(true)}
          >
            <Text style={styles.locationButtonIcon}>📍</Text>
            <Text style={styles.locationButtonText}>환자 위치 보기</Text>
            <Text style={styles.locationButtonArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Overview - 해당 환자 현황 */}
        <View style={styles.overviewSection}>
          <Text style={styles.sectionTitle}>오늘의 현황</Text>
          <View style={styles.overviewCards}>
            <Card style={styles.overviewCard}>
              <View style={styles.overviewContent}>
                <Text style={styles.overviewIcon}>👟</Text>
                <View style={styles.overviewText}>
                  <Text style={styles.overviewValue}>{patient.todaySteps.toLocaleString()}</Text>
                  <Text style={styles.overviewLabel}>걸음</Text>
                </View>
              </View>
            </Card>
            
            <Card style={styles.overviewCard}>
              <View style={styles.overviewContent}>
                <Text style={styles.overviewIcon}>⏱️</Text>
                <View style={styles.overviewText}>
                  <Text style={styles.overviewValue}>{patient.todayExercise}분</Text>
                  <Text style={styles.overviewLabel}>운동</Text>
                </View>
              </View>
            </Card>
            
            <Card style={styles.overviewCard}>
              <View style={styles.overviewContent}>
                <Text style={styles.overviewIcon}>😐</Text>
                <View style={styles.overviewText}>
                  <Text style={styles.overviewValue}>{patient.painLevel}/10</Text>
                  <Text style={styles.overviewLabel}>통증</Text>
                </View>
              </View>
            </Card>
          </View>
        </View>

        {/* Urgent Alerts - 해당 환자 알림만 */}
        {urgentAlerts.length > 0 && (
          <View style={styles.alertsSection}>
            <Text style={styles.sectionTitle}>⚠️ 긴급 알림</Text>
            <View style={styles.alertsList}>
              {urgentAlerts.map((alert) => (
                <Card key={alert.id} style={styles.alertCard}>
                  <View style={styles.alertHeader}>
                    <View style={[styles.alertPriority, { backgroundColor: getPriorityColor(alert.priority) }]} />
                    <View style={styles.alertInfo}>
                      <Text style={styles.alertType}>{alert.type}</Text>
                      <Text style={styles.alertTime}>{alert.time}</Text>
                    </View>
                  </View>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                  <View style={styles.alertActions}>
                    <TouchableOpacity style={styles.alertButton}>
                      <Text style={styles.alertButtonText}>확인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.alertButton, styles.primaryButton]}>
                      <Text style={styles.primaryButtonText}>연락하기</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </View>
          </View>
        )}

        {/* Quick Actions - 1인 관리 특화 */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>빠른 액션</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>📊</Text>
              </View>
              <Text style={styles.actionTitle}>상세 리포트</Text>
              <Text style={styles.actionSubtitle}>환자 상세 통계</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>👨‍⚕️</Text>
              </View>
              <Text style={styles.actionTitle}>의료진 연락</Text>
              <Text style={styles.actionSubtitle}>담당 의사 상담</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>📝</Text>
              </View>
              <Text style={styles.actionTitle}>환자 정보</Text>
              <Text style={styles.actionSubtitle}>환자 정보 수정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>🔔</Text>
              </View>
              <Text style={styles.actionTitle}>알림 설정</Text>
              <Text style={styles.actionSubtitle}>긴급 상황 알림</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Patient Location Modal */}
      <Modal
        visible={showLocationModal}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>환자 위치</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowLocationModal(false)}
            >
              <Text style={styles.closeButtonText}>나가기</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.mapContainer}>
            {webViewLoading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>지도를 불러오는 중...</Text>
              </View>
            )}
            
            <WebView
              ref={webViewRef}
              source={{
                html: `
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="utf-8">
                    <title>환자 위치 추적</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                      body { 
                        margin: 0; 
                        padding: 0; 
                        font-family: -apple-system, BlinkMacSystemFont, "Malgun Gothic", sans-serif;
                        height: 100vh;
                        overflow: hidden;
                      }
                      #map { 
                        height: 100vh; 
                        width: 100%; 
                        position: relative;
                      }
                      #loading {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 9999;
                        background: rgba(255, 255, 255, 0.9);
                        padding: 20px;
                        border-radius: 12px;
                        text-align: center;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                      }
                      .loading-spinner {
                        width: 40px;
                        height: 40px;
                        border: 4px solid #f3f3f3;
                        border-top: 4px solid #2E7D32;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 10px;
                      }
                      @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }
                      .info-box {
                        position: absolute;
                        bottom: 20px;
                        left: 20px;
                        right: 20px;
                        background: rgba(255,255,255,0.95);
                        padding: 15px;
                        border-radius: 12px;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                        z-index: 1000;
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255,255,255,0.2);
                      }
                      .info-title {
                        font-weight: bold;
                        font-size: 16px;
                        margin-bottom: 8px;
                        color: #333;
                      }
                      .info-item {
                        margin-bottom: 4px;
                        font-size: 14px;
                        color: #555;
                      }
                      .info-note {
                        margin-top: 10px;
                        font-size: 12px;
                        color: #666;
                        font-style: italic;
                      }
                      .patient-status {
                        display: inline-block;
                        background: #4CAF50;
                        color: white;
                        padding: 2px 8px;
                        border-radius: 12px;
                        font-size: 12px;
                        font-weight: bold;
                      }
                    </style>
                  </head>
                  <body>
                    <div id="loading">
                      <div class="loading-spinner"></div>
                      <div>지도를 불러오는 중...</div>
                    </div>
                    
                    <div id="map"></div>
                    
                    <div class="info-box">
                      <div class="info-title">📍 환자 위치 정보</div>
                      <div class="info-item">👤 이름: ${patient.name} (${patient.age}세)</div>
                      <div class="info-item">🏥 상태: <span class="patient-status">${patient.status}</span></div>
                      <div class="info-item">🕐 마지막 업데이트: ${patient.lastUpdate}</div>
                      <div class="info-item">🩺 진단명: ${patient.condition}</div>
                      <div class="info-note">* 이 위치는 실시간으로 업데이트됩니다</div>
                    </div>

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
                          console.log('카카오 맵 API 로드 시도...');
                          
                          if (window.kakao && window.kakao.maps) {
                            console.log('카카오 맵 API 이미 로드됨');
                            resolve();
                            return;
                          }
                          
                          const script = document.createElement('script');
                          script.type = 'text/javascript';
                          script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=4130719bf72a312a77503c40294d252d&libraries=services&autoload=false';
                          
                          script.onload = () => {
                            console.log('카카오 맵 스크립트 로드 완료, 초기화 중...');
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
                          console.log('카카오 맵 스크립트 추가됨');
                        });
                      }

                      let map;
                      let patientMarker = null;

                      // 지도 초기화
                      async function initializeMap() {
                        console.log('지도 초기화 시작');
                        showLoading();
                        
                        try {
                          await loadKakaoMapAPI();
                          
                          const mapContainer = document.getElementById('map');
                          const patientLat = 37.5665; // 서울시청 좌표 (임시)
                          const patientLng = 126.9780;
                          
                          const mapOption = {
                            center: new kakao.maps.LatLng(patientLat, patientLng),
                            level: 3,
                            mapTypeId: kakao.maps.MapTypeId.ROADMAP
                          };

                          map = new kakao.maps.Map(mapContainer, mapOption);
                          console.log('카카오 맵 생성 완료');

                          // 지도 컨트롤 추가
                          const mapTypeControl = new kakao.maps.MapTypeControl();
                          map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

                          const zoomControl = new kakao.maps.ZoomControl();
                          map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

                          // 환자 마커 생성
                          createPatientMarker(patientLat, patientLng);
                          
                          hideLoading();
                          console.log('지도 초기화 완료');
                          
                          // 실시간 위치 업데이트 시뮬레이션 시작
                          setTimeout(updatePatientLocation, 3000);
                          
                        } catch (error) {
                          console.error('지도 초기화 실패:', error);
                          hideLoading();
                          alert('지도를 불러올 수 없습니다: ' + error.message);
                        }
                      }

                      // 환자 마커 생성
                      function createPatientMarker(lat, lng) {
                        try {
                          // 커스텀 마커 이미지 생성
                          const markerImageSrc = 'data:image/svg+xml;base64,' + btoa(\`
                            <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 0C8.954 0 0 8.954 0 20c0 11.046 20 30 20 30s20-18.954 20-30C40 8.954 31.046 0 20 0z" fill="#FF4444"/>
                              <circle cx="20" cy="20" r="12" fill="white"/>
                              <text x="20" y="26" text-anchor="middle" font-size="12" fill="#FF4444">👤</text>
                            </svg>
                          \`);
                          
                          const markerImageSize = new kakao.maps.Size(40, 50);
                          const markerImageOption = {offset: new kakao.maps.Point(20, 50)};
                          const markerImage = new kakao.maps.MarkerImage(
                            markerImageSrc, 
                            markerImageSize, 
                            markerImageOption
                          );

                          patientMarker = new kakao.maps.Marker({
                            position: new kakao.maps.LatLng(lat, lng),
                            image: markerImage,
                            title: '${patient.name} (환자)',
                            map: map
                          });

                          // 마커 클릭 이벤트
                          kakao.maps.event.addListener(patientMarker, 'click', function() {
                            const content = \`
                              <div style="padding:10px; min-width:200px; text-align:center; font-family:-apple-system,BlinkMacSystemFont,sans-serif;">
                                <div style="font-weight:bold; margin-bottom:5px;">👤 ${patient.name}</div>
                                <div style="font-size:12px; color:#666; margin-bottom:3px;">${patient.age}세 • ${patient.condition}</div>
                                <div style="font-size:12px;">
                                  <span style="background:#4CAF50; color:white; padding:2px 6px; border-radius:8px;">
                                    ${patient.status}
                                  </span>
                                </div>
                                <div style="font-size:11px; color:#999; margin-top:5px;">
                                  마지막 업데이트: ${patient.lastUpdate}
                                </div>
                              </div>
                            \`;

                            const infowindow = new kakao.maps.InfoWindow({
                              content: content,
                              removable: true
                            });

                            infowindow.open(map, patientMarker);
                          });

                          console.log('환자 마커 생성 완료');
                        } catch (error) {
                          console.error('마커 생성 실패:', error);
                          // 기본 마커로 폴백
                          patientMarker = new kakao.maps.Marker({
                            position: new kakao.maps.LatLng(lat, lng),
                            title: '${patient.name} (환자)',
                            map: map
                          });
                        }
                      }

                      // 실시간 위치 업데이트 시뮬레이션
                      function updatePatientLocation() {
                        if (!patientMarker) return;
                        
                        // 임시로 약간의 위치 변동 시뮬레이션
                        const lat = 37.5665 + (Math.random() - 0.5) * 0.002;
                        const lng = 126.9780 + (Math.random() - 0.5) * 0.002;
                        const newPosition = new kakao.maps.LatLng(lat, lng);
                        
                        patientMarker.setPosition(newPosition);
                        
                        console.log('환자 위치 업데이트:', lat, lng);
                        
                        // 5초마다 위치 업데이트 (실제로는 백엔드에서 받아올 데이터)
                        setTimeout(updatePatientLocation, 5000);
                      }

                      // 페이지 로드 시 지도 초기화
                      window.addEventListener('load', function() {
                        console.log('페이지 로드 완료, 지도 초기화 시작');
                        initializeMap();
                      });
                      
                      // 즉시 초기화도 시도 (안전장치)
                      if (document.readyState === 'complete') {
                        initializeMap();
                      }
                    </script>
                  </body>
                  </html>
                `,
              }}
              style={styles.webView}
              onLoadStart={() => setWebViewLoading(true)}
              onLoadEnd={() => setWebViewLoading(false)}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
          </View>
        </SafeAreaView>
      </Modal>
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
    ...Typography.h1,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textLight,
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
  caregiverSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  caregiverCard: {
    padding: Spacing.padding,
  },
  caregiverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caregiverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  caregiverAvatarText: {
    fontSize: 28,
  },
  caregiverInfo: {
    flex: 1,
  },
  caregiverName: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  caregiverRole: {
    ...Typography.body,
    color: Colors.textLight,
  },
  patientSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
    fontWeight: '600',
  },
  patientCard: {
    padding: Spacing.padding,
  },
  attentionCard: {
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  patientAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  patientAvatarText: {
    fontSize: 32,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    ...Typography.h2,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  patientCondition: {
    ...Typography.body,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  patientStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.xs,
  },
  statusText: {
    ...Typography.caption,
    fontWeight: '500',
  },
  attentionBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attentionBadgeText: {
    fontSize: 16,
  },
  progressSection: {
    marginBottom: Spacing.componentSpacing,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  progressLabel: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  progressValue: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  contactSection: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.padding,
    borderRadius: Spacing.cardRadius,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  emergencyButton: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  contactButtonIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  contactButtonText: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  overviewSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  overviewCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
    padding: Spacing.padding,
  },
  overviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overviewIcon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  overviewText: {
    flex: 1,
  },
  overviewValue: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  overviewLabel: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  alertsSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  alertsList: {
    gap: Spacing.componentSpacing,
  },
  alertCard: {
    padding: Spacing.padding,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  alertPriority: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: Spacing.sm,
  },
  alertInfo: {
    flex: 1,
  },
  alertType: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  alertTime: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  alertMessage: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
  },
  alertActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  alertButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.padding,
    borderRadius: Spacing.cardRadius,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
  },
  alertButtonText: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  primaryButtonText: {
    ...Typography.bodySmall,
    color: Colors.background,
    fontWeight: '500',
  },
  actionsSection: {
    paddingHorizontal: Spacing.paddingLarge,
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
    backgroundColor: Colors.secondary,
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
  // Location button styles
  locationSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  locationButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationButtonIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  locationButtonText: {
    ...Typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
    flex: 1,
  },
  locationButtonArrow: {
    ...Typography.body,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.paddingLarge,
    paddingVertical: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  closeButton: {
    backgroundColor: '#FF4444',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
  },
  closeButtonText: {
    ...Typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  webView: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
});

export default CaregiverDashboardScreen; 