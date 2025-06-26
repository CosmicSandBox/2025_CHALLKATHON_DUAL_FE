import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Card from '../../components/common/Card';
import ExerciseAlertModal from '../../components/settings/ExerciseAlertModal';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { deleteUser } from '../../api';
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/slices/authSlice';
import { AppDispatch } from '../../store';
import { RootStackParamList } from '../../navigation/types';
import { Feather } from '@expo/vector-icons';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const SettingsScreen: React.FC = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [exerciseAlerts, setExerciseAlerts] = useState(true);
  const [isLinkedToCaregiver, setIsLinkedToCaregiver] = useState(false);
  const [showExerciseAlertModal, setShowExerciseAlertModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCaregiverLink = () => {
    if (isLinkedToCaregiver) {
      Alert.alert(
        '보호자 연동 해제',
        '보호자와의 연동을 해제하시겠습니까?\n운동 데이터 공유가 중단됩니다.',
        [
          { text: '취소', style: 'cancel' },
          { 
            text: '해제', 
            style: 'destructive',
            onPress: () => {
              setIsLinkedToCaregiver(false);
              Alert.alert('알림', '보호자 연동이 해제되었습니다.');
            }
          }
        ]
      );
    } else {
      Alert.alert(
        '보호자 연동',
        '보호자 연동 코드를 입력하여 가족과 운동 데이터를 공유할 수 있습니다.',
        [
          { text: '취소', style: 'cancel' },
          { 
            text: '연동하기',
            onPress: () => {
              // 보호자 연동 화면으로 이동하는 로직
              console.log('보호자 연동 화면으로 이동');
              // 임시로 연동 상태 변경
              setIsLinkedToCaregiver(true);
              Alert.alert('성공', '보호자와 성공적으로 연동되었습니다!');
            }
          }
        ]
      );
    }
  };

  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃 하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '로그아웃', onPress: () => dispatch(signOut()) }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      '계정 삭제',
      '계정을 삭제하면 모든 운동 기록과 건강 데이터가 영구적으로 삭제됩니다.\n\n정말 계정을 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '삭제', 
          style: 'destructive', 
          onPress: () => {
            Alert.alert(
              '최종 확인',
              '마지막 확인입니다. 계정 삭제는 되돌릴 수 없습니다.',
              [
                { text: '취소', style: 'cancel' },
                { 
                  text: '완전 삭제', 
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      setIsDeleting(true);
                      console.log('계정 삭제 API 호출 시작');
                      
                      const result = await deleteUser();
                      console.log('계정 삭제 성공:', result);
                      
                      Alert.alert(
                        '계정 삭제 완료',
                        '계정이 성공적으로 삭제되었습니다.',
                        [
                          {
                            text: '확인',
                            onPress: () => dispatch(signOut())
                          }
                        ]
                      );
                    } catch (error) {
                      console.error('계정 삭제 실패:', error);
                      const errorMessage = error instanceof Error ? error.message : '계정 삭제에 실패했습니다.';
                      Alert.alert('삭제 실패', errorMessage);
                    } finally {
                      setIsDeleting(false);
                    }
                  }
                }
              ]
            );
          }
        },
      ]
    );
  };

  const handleExerciseAlertsPress = () => {
    if (!pushNotifications) {
      Alert.alert(
        '푸시 알림 필요',
        '운동 알림을 설정하려면 먼저 푸시 알림을 활성화해주세요.',
        [{ text: '확인' }]
      );
      return;
    }
    
    setShowExerciseAlertModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="chevron-left" size={28} color="#A3A8AF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>설정</Text>
          <Text style={styles.headerSubtitle}>앱 설정 및 계정 관리</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 보호자 연동 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>가족 연동</Text>
          <Card style={styles.sectionCard}>
            <TouchableOpacity style={styles.settingItem} onPress={handleCaregiverLink}>
              <View style={[styles.settingIcon, { backgroundColor: isLinkedToCaregiver ? '#E8F5E8' : '#FEF3E2' }]}>
                <Text style={styles.settingIconText}>👨‍👩‍👧‍👦</Text>
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>보호자 연동</Text>
                <Text style={styles.settingSubtitle}>
                  {isLinkedToCaregiver 
                    ? '보호자와 연동되어 있습니다 • 해제하려면 탭하세요'
                    : '가족과 운동 데이터를 공유하세요'}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: isLinkedToCaregiver ? '#10B981' : '#F59E0B' }]}>
                <Text style={styles.statusBadgeText}>
                  {isLinkedToCaregiver ? '연동됨' : '미연동'}
                </Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>

        {/* 알림 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>알림 설정</Text>
          <Card style={styles.sectionCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Text style={styles.settingIconText}>🔔</Text>
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>푸시 알림</Text>
                <Text style={styles.settingSubtitle}>
                  앱 알림 수신 설정
                </Text>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={(value) => {
                  setPushNotifications(value);
                  if (!value) {
                    setExerciseAlerts(false); // 푸시 알림을 끄면 운동 알림도 자동으로 꺼짐
                  }
                }}
                trackColor={{ false: '#E5E7EB', true: '#3182F6' + '40' }}
                thumbColor={pushNotifications ? '#3182F6' : '#9CA3AF'}
              />
            </View>
            
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={[styles.settingItem, !pushNotifications && styles.disabledItem]} 
              onPress={handleExerciseAlertsPress}
              disabled={!pushNotifications}
            >
              <View style={[styles.settingIcon, !pushNotifications && styles.disabledIcon]}>
                <Text style={styles.settingIconText}>⏰</Text>
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, !pushNotifications && styles.disabledText]}>
                  운동 알림
                </Text>
                <Text style={[styles.settingSubtitle, !pushNotifications && styles.disabledText]}>
                  {pushNotifications ? '운동 시간 알림 설정' : '푸시 알림을 먼저 활성화하세요'}
                </Text>
              </View>
              <Text style={[styles.settingArrow, !pushNotifications && styles.disabledText]}>›</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* 앱 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>앱 정보</Text>
          <Card style={styles.sectionCard}>
            <TouchableOpacity style={styles.settingItem} onPress={() => {
              Alert.alert(
                '도움말',
                '앱 사용법과 자주 묻는 질문을 확인할 수 있습니다.',
                [
                  { text: '취소', style: 'cancel' },
                  { text: '보기', onPress: () => console.log('도움말 화면으로 이동') }
                ]
              );
            }}>
              <View style={styles.settingIcon}>
                <Text style={styles.settingIconText}>❓</Text>
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>도움말 및 지원</Text>
                <Text style={styles.settingSubtitle}>사용법 및 문의하기</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem} onPress={() => {
              Alert.alert(
                'RecoveryFit',
                '버전 1.0.0\n\n재활 운동을 위한 스마트 헬스케어 앱\n\n© 2024 RecoveryFit. All rights reserved.',
                [{ text: '확인' }]
              );
            }}>
              <View style={styles.settingIcon}>
                <Text style={styles.settingIconText}>ℹ️</Text>
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>앱 정보</Text>
                <Text style={styles.settingSubtitle}>버전 1.0.0</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* 계정 관리 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>계정 관리</Text>
          <Card style={styles.dangerCard}>
            <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
              <View style={styles.actionIcon}>
                <Feather name="log-out" size={20} color="#6B7280" />
              </View>
              <Text style={styles.actionButtonText}>로그아웃</Text>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.actionButton} onPress={handleDeleteAccount}>
              <View style={styles.actionIcon}>
                <Feather name="trash-2" size={20} color="#EF4444" />
              </View>
              {isDeleting ? (
                <ActivityIndicator color="#EF4444" size="small" style={{ flex: 1 }} />
              ) : (
                <Text style={styles.deleteButtonText}>계정 삭제</Text>
              )}
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>

      {/* 운동 알림 모달 */}
      <ExerciseAlertModal
        visible={showExerciseAlertModal}
        onClose={() => setShowExerciseAlertModal(false)}
      />
    </SafeAreaView>
  );
};

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
  section: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  sectionCard: {
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  disabledItem: {
    opacity: 0.5,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  disabledIcon: {
    backgroundColor: '#F9FAFB',
  },
  settingIconText: {
    fontSize: 20,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  disabledText: {
    color: '#9CA3AF',
  },
  settingArrow: {
    fontSize: 20,
    color: '#9CA3AF',
    fontWeight: '300',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginLeft: 80,
  },
  dangerCard: {
    padding: 0,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    flex: 1,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
    flex: 1,
  },
});

export default SettingsScreen;