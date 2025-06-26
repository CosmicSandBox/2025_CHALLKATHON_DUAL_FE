import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getGuardianPatientDetail, GuardianPatientDetail } from '../../api';
import Card from '../../components/common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

const PatientDetailScreen: React.FC = () => {
  const [patientData, setPatientData] = useState<GuardianPatientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPatientDetail();
  }, []);

  const loadPatientDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getGuardianPatientDetail();
      setPatientData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '환자 정보를 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('환자 상세 정보 로딩 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#666' }}>환자 정보를 불러오는 중...</Text>
      </SafeAreaView>
    );
  }

  if (error || !patientData) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 }}>정보 로딩 실패</Text>
        <Text style={{ fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 }}>
          {error || '환자 정보를 불러올 수 없습니다.'}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#2196F3',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
          onPress={loadPatientDetail}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>다시 시도</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const getStatusColor = (status: string) => {
    return status === 'online' ? '#4CAF50' : '#9E9E9E';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#4CAF50';
    if (progress >= 60) return '#FF9800';
    return '#F44336';
  };

  const handleCallPatient = () => {
    console.log('환자에게 전화:', patientData?.contactInfo.phoneNumber);
  };

  const handleEmergencyCall = () => {
    console.log('긴급 연락처:', patientData?.contactInfo.emergencyContact);
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
                  {patientData.patientInfo.patientName} ({patientData.patientInfo.patientAge}세)
                </Text>
                <Text style={styles.patientCondition}>{patientData.patientInfo.disease}</Text>
                <View style={styles.patientStatus}>
                  <View style={[styles.statusDot, { backgroundColor: '#4CAF50' }]} />
                  <Text style={[styles.statusText, { color: '#4CAF50' }]}>
                    연동됨 • 최근 업데이트
                  </Text>
                </View>
              </View>
            </View>
          </Card>
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
                <Text style={styles.contactValue}>{patientData.contactInfo.phoneNumber}</Text>
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
                <Text style={styles.contactValue}>긴급 연락처</Text>
                <Text style={styles.contactSubValue}>{patientData.contactInfo.emergencyContact}</Text>
              </View>
              <Text style={styles.contactArrow}>›</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Weekly Progress */}
        <View style={styles.weeklySection}>
          <Text style={styles.sectionTitle}>이번 주 진행상황</Text>
          <Card style={styles.weeklyCard}>
            <View style={styles.weeklyHeader}>
              <Text style={styles.weeklyTitle}>주간 걸음 수</Text>
              <Text style={styles.weeklyTotal}>
                {Object.values(patientData.weeklyProgress).reduce((sum: number, steps: number) => sum + steps, 0).toLocaleString()} 걸음
              </Text>
            </View>
            <View style={styles.weeklyBars}>
              {Object.entries(patientData.weeklyProgress).map(([day, steps], index) => (
                <View key={index} style={styles.weeklyBarContainer}>
                  <View style={styles.weeklyBar}>
                    <View 
                      style={[
                        styles.weeklyBarFill, 
                        { 
                          height: `${Math.min((steps / 4000) * 100, 100)}%`,
                          backgroundColor: steps >= 3000 ? Colors.primary : Colors.accent
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.weeklyDay}>{day}</Text>
                  <Text style={styles.weeklySteps}>{steps.toLocaleString()}</Text>
                </View>
              ))}
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
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
    fontWeight: '600',
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
});

export default PatientDetailScreen; 