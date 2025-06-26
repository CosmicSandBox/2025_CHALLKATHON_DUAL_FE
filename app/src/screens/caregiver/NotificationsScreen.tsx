import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getGuardianNotifications, markNotificationAsRead, GuardianNotificationList, GuardianNotification } from '../../api';
import Card from '../../components/common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

const NotificationsScreen: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'urgent' | 'warning' | 'info'>('all');
  const [isMarkingRead, setIsMarkingRead] = useState<string | null>(null);
  const [notificationData, setNotificationData] = useState<GuardianNotificationList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getGuardianNotifications();
      setNotificationData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알림을 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('알림 로딩 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#666' }}>알림을 불러오는 중...</Text>
      </SafeAreaView>
    );
  }

  if (error || !notificationData) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 }}>알림 로딩 실패</Text>
        <Text style={{ fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 }}>
          {error || '알림을 불러올 수 없습니다.'}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#2196F3',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
          onPress={loadNotifications}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>다시 시도</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const notifications = notificationData.notifications;

  const filteredNotifications = notifications.filter(notification => {
    if (filterType === 'all') return true;
    return notification.type === filterType;
  });

  const notificationStats = {
    total: notifications.length,
    urgent: notifications.filter(n => n.type === 'urgent').length,
    warning: notifications.filter(n => n.type === 'warning').length,
    info: notifications.filter(n => n.type === 'info').length,
    unread: notifications.filter(n => !n.isRead).length,
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return '#F44336';
      case 'warning': return '#FF9800';
      case 'info': return '#2196F3';
      default: return Colors.primary;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const formatTime = (createdAt: string) => {
    const now = new Date();
    const notificationTime = new Date(createdAt);
    const diffMs = now.getTime() - notificationTime.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}일 전`;
    } else if (diffHours > 0) {
      return `${diffHours}시간 전`;
    } else if (diffMins > 0) {
      return `${diffMins}분 전`;
    } else {
      return '방금 전';
    }
  };

  const handleNotificationPress = (notification: GuardianNotification) => {
    console.log('알림 선택:', notification.title);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      setIsMarkingRead(notificationId);
      console.log('알림 읽음 처리 시작:', notificationId);
      
      const result = await markNotificationAsRead(notificationId);
      console.log('알림 읽음 처리 성공:', result);
      
      // 로컬 상태 업데이트
      if (notificationData) {
        const updatedNotifications = notificationData.notifications.map(notification =>
          notification.alertId === notificationId 
            ? { ...notification, isRead: true }
            : notification
        );
        setNotificationData({ notifications: updatedNotifications });
      }
      
      Alert.alert('성공', '알림이 읽음 처리되었습니다.');
      
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error);
      const errorMessage = error instanceof Error ? error.message : '알림 읽음 처리에 실패했습니다.';
      Alert.alert('오류', errorMessage);
    } finally {
      setIsMarkingRead(null);
    }
  };

  const handleMarkAllAsRead = () => {
    console.log('모든 알림 읽음 처리');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>알림 관리</Text>
          <Text style={styles.subtitle}>환자의 알림을 관리하세요</Text>
        </View>

        {/* Patient Info */}
        <View style={styles.patientSection}>
          <Card style={styles.patientCard}>
            <View style={styles.patientHeader}>
              <View style={styles.patientAvatar}>
                <Text style={styles.patientAvatarText}>👴</Text>
              </View>
              <View style={styles.patientInfo}>
                <Text style={styles.patientName}>
                  연동된 환자
                </Text>
                <Text style={styles.patientCondition}>환자 정보</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Notification Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>알림 요약</Text>
          <View style={styles.summaryCards}>
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>📢</Text>
              <Text style={styles.summaryValue}>{notificationStats.total}</Text>
              <Text style={styles.summaryLabel}>전체</Text>
            </Card>
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>🚨</Text>
              <Text style={[styles.summaryValue, { color: '#F44336' }]}>
                {notificationStats.urgent}
              </Text>
              <Text style={styles.summaryLabel}>긴급</Text>
            </Card>
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>⚠️</Text>
              <Text style={[styles.summaryValue, { color: '#FF9800' }]}>
                {notificationStats.warning}
              </Text>
              <Text style={styles.summaryLabel}>경고</Text>
            </Card>
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>📬</Text>
              <Text style={[styles.summaryValue, { color: Colors.primary }]}>
                {notificationStats.unread}
              </Text>
              <Text style={styles.summaryLabel}>읽지 않음</Text>
            </Card>
          </View>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}
          >
            <TouchableOpacity 
              style={[styles.filterButton, filterType === 'all' && styles.activeFilter]}
              onPress={() => setFilterType('all')}
            >
              <Text style={[styles.filterText, filterType === 'all' && styles.activeFilterText]}>
                전체 ({notificationStats.total})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, filterType === 'urgent' && styles.activeFilter]}
              onPress={() => setFilterType('urgent')}
            >
              <Text style={[styles.filterText, filterType === 'urgent' && styles.activeFilterText]}>
                긴급 ({notificationStats.urgent})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, filterType === 'warning' && styles.activeFilter]}
              onPress={() => setFilterType('warning')}
            >
              <Text style={[styles.filterText, filterType === 'warning' && styles.activeFilterText]}>
                경고 ({notificationStats.warning})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, filterType === 'info' && styles.activeFilter]}
              onPress={() => setFilterType('info')}
            >
              <Text style={[styles.filterText, filterType === 'info' && styles.activeFilterText]}>
                정보 ({notificationStats.info})
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleMarkAllAsRead}
          >
            <Text style={styles.actionButtonText}>모든 알림 읽음 처리</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        <View style={styles.notificationsSection}>
          {filteredNotifications.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyTitle}>알림이 없습니다</Text>
              <Text style={styles.emptySubtitle}>
                {filterType === 'all' 
                  ? '현재 표시할 알림이 없습니다' 
                  : `${filterType === 'urgent' ? '긴급' : filterType === 'warning' ? '경고' : '정보'} 알림이 없습니다`
                }
              </Text>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <TouchableOpacity 
                key={notification.alertId} 
                style={styles.notificationCard}
                onPress={() => handleNotificationPress(notification)}
              >
                <Card style={{
                  ...styles.notificationContent,
                  ...(notification.isRead ? {} : styles.unreadNotification),
                }}>
                  <View style={styles.notificationHeader}>
                    <View style={styles.notificationIcon}>
                      <Text style={styles.notificationIconText}>
                        {getTypeIcon(notification.type)}
                      </Text>
                    </View>
                    <View style={styles.notificationInfo}>
                      <Text style={styles.notificationTitle}>
                        {notification.title}
                      </Text>
                      <Text style={styles.notificationTime}>
                        {formatTime(notification.createdAt)}
                      </Text>
                    </View>
                    <View style={styles.notificationActions}>
                      {!notification.isRead && (
                        <View style={styles.unreadBadge}>
                          <Text style={styles.unreadBadgeText}>NEW</Text>
                        </View>
                      )}
                      <View style={[
                        styles.priorityIndicator, 
                        { backgroundColor: getTypeColor(notification.type) }
                      ]} />
                    </View>
                  </View>
                  
                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>
                  
                  {!notification.isRead && (
                    <TouchableOpacity 
                      style={[styles.markAsReadButton, isMarkingRead === notification.alertId && { opacity: 0.5 }]}
                      onPress={() => handleMarkAsRead(notification.alertId)}
                      disabled={isMarkingRead === notification.alertId}
                    >
                      {isMarkingRead === notification.alertId ? (
                        <ActivityIndicator color="#666" size="small" />
                      ) : (
                        <Text style={styles.markAsReadText}>읽음 처리</Text>
                      )}
                    </TouchableOpacity>
                  )}
                </Card>
              </TouchableOpacity>
            ))
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
  patientSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  patientCard: {
    padding: Spacing.padding,
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  patientAvatarText: {
    fontSize: 28,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  patientCondition: {
    ...Typography.body,
    color: Colors.textLight,
  },
  summarySection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
    fontWeight: '600',
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
    padding: Spacing.padding,
    alignItems: 'center',
  },
  summaryIcon: {
    fontSize: 20,
    marginBottom: Spacing.sm,
  },
  summaryValue: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  summaryLabel: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  filterSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  filterContainer: {
    paddingRight: Spacing.paddingLarge,
  },
  filterButton: {
    paddingHorizontal: Spacing.padding,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
    borderRadius: Spacing.cardRadius,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  activeFilter: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  activeFilterText: {
    color: Colors.background,
  },
  actionSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  actionButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.padding,
    borderRadius: Spacing.cardRadius,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  actionButtonText: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  notificationsSection: {
    paddingHorizontal: Spacing.paddingLarge,
  },
  emptyCard: {
    padding: Spacing.sectionSpacing,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.componentSpacing,
  },
  emptyTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
  },
  notificationCard: {
    marginBottom: Spacing.componentSpacing,
  },
  notificationContent: {
    padding: Spacing.padding,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  notificationIconText: {
    fontSize: 18,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  notificationTime: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  notificationActions: {
    alignItems: 'flex-end',
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.cardRadius,
    marginBottom: Spacing.xs,
  },
  unreadBadgeText: {
    ...Typography.caption,
    color: Colors.background,
    fontWeight: '600',
    fontSize: 10,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  notificationMessage: {
    ...Typography.body,
    color: Colors.textPrimary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  markAsReadButton: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: Spacing.cardRadius,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  markAsReadText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
});

export default NotificationsScreen; 