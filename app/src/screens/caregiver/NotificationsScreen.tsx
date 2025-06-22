import React, { useState } from 'react';
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

const NotificationsScreen: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'urgent' | 'warning' | 'info'>('all');

  // 1명의 환자 정보
  const patient = {
    name: '홍길동',
    age: 65,
    condition: '뇌졸중 후유증',
  };

  // 해당 환자의 알림들
  const notifications = [
    {
      id: '1',
      type: 'urgent',
      title: '통증 수준 증가',
      message: '통증 수준이 7/10으로 증가했습니다. 즉시 확인이 필요합니다.',
      time: '5분 전',
      isRead: false,
      priority: 'high',
    },
    {
      id: '2',
      type: 'warning',
      title: '운동 중단',
      message: '실외 운동이 예상보다 일찍 종료되었습니다.',
      time: '15분 전',
      isRead: false,
      priority: 'medium',
    },
    {
      id: '3',
      type: 'info',
      title: '약물 복용 알림',
      message: '오후 3시 약물 복용 시간입니다.',
      time: '30분 전',
      isRead: true,
      priority: 'low',
    },
    {
      id: '4',
      type: 'urgent',
      title: '낙상 위험 감지',
      message: '환자의 균형 감각이 불안정합니다. 주의가 필요합니다.',
      time: '1시간 전',
      isRead: true,
      priority: 'high',
    },
    {
      id: '5',
      type: 'warning',
      title: '운동 목표 미달성',
      message: '오늘의 운동 목표를 달성하지 못했습니다.',
      time: '2시간 전',
      isRead: true,
      priority: 'medium',
    },
    {
      id: '6',
      type: 'info',
      title: '의료진 상담 예정',
      message: '내일 오전 10시 담당 의사와 상담이 예정되어 있습니다.',
      time: '3시간 전',
      isRead: true,
      priority: 'low',
    },
  ];

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return Colors.primary;
    }
  };

  const handleNotificationPress = (notification: any) => {
    console.log('알림 선택:', notification.title);
  };

  const handleMarkAsRead = (notificationId: string) => {
    console.log('읽음 처리:', notificationId);
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
          <Text style={styles.subtitle}>{patient.name} 환자의 알림을 관리하세요</Text>
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
                  {patient.name} ({patient.age}세)
                </Text>
                <Text style={styles.patientCondition}>{patient.condition}</Text>
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
                key={notification.id} 
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
                        {notification.time}
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
                        { backgroundColor: getPriorityColor(notification.priority) }
                      ]} />
                    </View>
                  </View>
                  
                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>
                  
                  {!notification.isRead && (
                    <TouchableOpacity 
                      style={styles.markAsReadButton}
                      onPress={() => handleMarkAsRead(notification.id)}
                    >
                      <Text style={styles.markAsReadText}>읽음 처리</Text>
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