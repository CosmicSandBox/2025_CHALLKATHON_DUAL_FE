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

const PatientDetailScreen: React.FC = () => {
  // 1명의 환자 정보
  const patient = {
    id: '1',
    name: '홍길동',
    age: 65,
    condition: '뇌졸중 후유증',
    status: 'online',
    lastUpdate: '10분 전',
    todaySteps: 3247,
    todayExercise: 45,
    painLevel: 3,
    mood: '좋음',
    needsAttention: false,
    phone: '010-1234-5678',
    emergencyContact: '010-9876-5432',
    assignedDate: '2024-01-15',
    progress: 75,
    address: '서울시 강남구 테헤란로 123',
    emergencyContactName: '홍철수 (아들)',
    doctor: '김재활 전문의',
    hospital: '서울대학교병원',
    hospitalPhone: '02-1234-5678',
    notes: '매일 오후 3시에 약물 복용 확인 필요',
  };

  const weeklyStats = [
    { day: '월', steps: 2800, exercise: 40, pain: 2 },
    { day: '화', steps: 3200, exercise: 45, pain: 3 },
    { day: '수', steps: 2900, exercise: 35, pain: 2 },
    { day: '목', steps: 3500, exercise: 50, pain: 4 },
    { day: '금', steps: 3100, exercise: 42, pain: 3 },
    { day: '토', steps: 3800, exercise: 55, pain: 2 },
    { day: '일', steps: 3247, exercise: 45, pain: 3 },
  ];

  const getStatusColor = (status: string) => {
    return status === 'online' ? '#4CAF50' : '#9E9E9E';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#4CAF50';
    if (progress >= 60) return '#FF9800';
    return '#F44336';
  };

  const getPainColor = (painLevel: number) => {
    if (painLevel <= 3) return '#4CAF50';
    if (painLevel <= 5) return '#FF9800';
    return '#F44336';
  };

  const handleCallPatient = () => {
    console.log('환자에게 전화:', patient.phone);
  };

  const handleEmergencyCall = () => {
    console.log('긴급 연락처:', patient.emergencyContact);
  };

  const handleCallHospital = () => {
    console.log('병원에 전화:', patient.hospitalPhone);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>환자 정보</Text>
          <Text style={styles.subtitle}>환자의 상세 정보를 확인하고 관리하세요</Text>
        </View>

        {/* Patient Basic Info */}
        <View style={styles.basicInfoSection}>
          <Card style={styles.basicInfoCard}>
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
                    {patient.status === 'online' ? '온라인' : '오프라인'} • 마지막 업데이트: {patient.lastUpdate}
                  </Text>
                </View>
              </View>
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
          </Card>
        </View>

        {/* Today's Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>오늘의 현황</Text>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Text style={styles.statIcon}>👟</Text>
              <Text style={styles.statValue}>{patient.todaySteps.toLocaleString()}</Text>
              <Text style={styles.statLabel}>걸음</Text>
            </Card>
            <Card style={styles.statCard}>
              <Text style={styles.statIcon}>⏱️</Text>
              <Text style={styles.statValue}>{patient.todayExercise}분</Text>
              <Text style={styles.statLabel}>운동</Text>
            </Card>
            <Card style={styles.statCard}>
              <Text style={styles.statIcon}>😐</Text>
              <Text style={[styles.statValue, { color: getPainColor(patient.painLevel) }]}>
                {patient.painLevel}/10
              </Text>
              <Text style={styles.statLabel}>통증</Text>
            </Card>
            <Card style={styles.statCard}>
              <Text style={styles.statIcon}>😊</Text>
              <Text style={styles.statValue}>{patient.mood}</Text>
              <Text style={styles.statLabel}>기분</Text>
            </Card>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>연락처 정보</Text>
          <Card style={styles.contactCard}>
            <TouchableOpacity style={styles.contactItem} onPress={handleCallPatient}>
              <View style={styles.contactIcon}>
                <Text style={styles.contactIconText}>📞</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>환자 연락처</Text>
                <Text style={styles.contactValue}>{patient.phone}</Text>
              </View>
              <Text style={styles.contactArrow}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.contactItem} onPress={handleEmergencyCall}>
              <View style={styles.contactIcon}>
                <Text style={styles.contactIconText}>🚨</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>긴급 연락처</Text>
                <Text style={styles.contactValue}>{patient.emergencyContactName}</Text>
                <Text style={styles.contactSubValue}>{patient.emergencyContact}</Text>
              </View>
              <Text style={styles.contactArrow}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.contactItem} onPress={handleCallHospital}>
              <View style={styles.contactIcon}>
                <Text style={styles.contactIconText}>🏥</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>담당 병원</Text>
                <Text style={styles.contactValue}>{patient.hospital}</Text>
                <Text style={styles.contactSubValue}>{patient.hospitalPhone}</Text>
              </View>
              <Text style={styles.contactArrow}>›</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Medical Information */}
        <View style={styles.medicalSection}>
          <Text style={styles.sectionTitle}>의료 정보</Text>
          <Card style={styles.medicalCard}>
            <View style={styles.medicalItem}>
              <Text style={styles.medicalLabel}>담당 의사</Text>
              <Text style={styles.medicalValue}>{patient.doctor}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.medicalItem}>
              <Text style={styles.medicalLabel}>담당 시작일</Text>
              <Text style={styles.medicalValue}>{patient.assignedDate}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.medicalItem}>
              <Text style={styles.medicalLabel}>주소</Text>
              <Text style={styles.medicalValue}>{patient.address}</Text>
            </View>
          </Card>
        </View>

        {/* Weekly Progress */}
        <View style={styles.weeklySection}>
          <Text style={styles.sectionTitle}>이번 주 진행상황</Text>
          <Card style={styles.weeklyCard}>
            <View style={styles.weeklyHeader}>
              <Text style={styles.weeklyTitle}>주간 걸음 수</Text>
              <Text style={styles.weeklyTotal}>
                {weeklyStats.reduce((sum, day) => sum + day.steps, 0).toLocaleString()} 걸음
              </Text>
            </View>
            <View style={styles.weeklyBars}>
              {weeklyStats.map((day, index) => (
                <View key={index} style={styles.weeklyBarContainer}>
                  <View style={styles.weeklyBar}>
                    <View 
                      style={[
                        styles.weeklyBarFill, 
                        { 
                          height: `${(day.steps / 4000) * 100}%`,
                          backgroundColor: day.steps >= 3000 ? Colors.primary : Colors.accent
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.weeklyDay}>{day.day}</Text>
                  <Text style={styles.weeklySteps}>{day.steps.toLocaleString()}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Notes */}
        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>특이사항</Text>
          <Card style={styles.notesCard}>
            <Text style={styles.notesText}>{patient.notes}</Text>
          </Card>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>빠른 액션</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>📊</Text>
              </View>
              <Text style={styles.actionTitle}>상세 리포트</Text>
              <Text style={styles.actionSubtitle}>월간 통계 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>📝</Text>
              </View>
              <Text style={styles.actionTitle}>정보 수정</Text>
              <Text style={styles.actionSubtitle}>환자 정보 변경</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>📅</Text>
              </View>
              <Text style={styles.actionTitle}>일정 관리</Text>
              <Text style={styles.actionSubtitle}>의료 일정 확인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>🔔</Text>
              </View>
              <Text style={styles.actionTitle}>알림 설정</Text>
              <Text style={styles.actionSubtitle}>알림 관리</Text>
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
    paddingHorizontal: Spacing.paddingLarge,
    paddingTop: Spacing.sectionSpacing,
    paddingBottom: Spacing.componentSpacing,
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
  basicInfoSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  basicInfoCard: {
    padding: Spacing.padding,
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  patientAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  patientAvatarText: {
    fontSize: 36,
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
  progressSection: {
    marginBottom: Spacing.sm,
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
  statsSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: Spacing.padding,
    marginBottom: Spacing.componentSpacing,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
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
  contactSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  contactCard: {
    padding: 0,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.componentSpacing,
    paddingHorizontal: Spacing.padding,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  contactIconText: {
    fontSize: 18,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  contactValue: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  contactSubValue: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  contactArrow: {
    ...Typography.h3,
    color: Colors.textLight,
    fontWeight: '300',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginLeft: 56 + Spacing.componentSpacing,
  },
  medicalSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  medicalCard: {
    padding: 0,
  },
  medicalItem: {
    paddingVertical: Spacing.componentSpacing,
    paddingHorizontal: Spacing.padding,
  },
  medicalLabel: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  medicalValue: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  weeklySection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  weeklyCard: {
    padding: Spacing.padding,
  },
  weeklyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  weeklyTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  weeklyTotal: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
  },
  weeklyBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },
  weeklyBarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  weeklyBar: {
    width: 20,
    height: 80,
    backgroundColor: Colors.borderLight,
    borderRadius: 10,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  weeklyBarFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 10,
  },
  weeklyDay: {
    ...Typography.caption,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  weeklySteps: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontSize: 10,
  },
  notesSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  notesCard: {
    padding: Spacing.padding,
  },
  notesText: {
    ...Typography.body,
    color: Colors.textPrimary,
    lineHeight: 20,
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

export default PatientDetailScreen; 