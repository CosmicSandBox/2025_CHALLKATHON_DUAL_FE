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

const CaregiverDashboardScreen: React.FC = () => {
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
});

export default CaregiverDashboardScreen; 