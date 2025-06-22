import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import Card from '../components/common/Card';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: () => dispatch(logout()),
        },
      ]
    );
  };

  const settingsSections = [
    {
      title: '프로필',
      items: [
        { title: '이름 변경', subtitle: '홍길동', icon: '👤' },
        { title: '프로필 사진', subtitle: '변경', icon: '📷' },
        { title: '연락처', subtitle: '010-1234-5678', icon: '📞' },
      ],
    },
    {
      title: '알림',
      items: [
        { title: '운동 미시작 알림', subtitle: '켜짐', icon: '🔔' },
        { title: '알림 시간', subtitle: '오전 9시', icon: '⏰' },
      ],
    },
    {
      title: '동기화',
      items: [
        { title: '자동 동기화', subtitle: '켜짐', icon: '🔄' },
        { title: '마지막 동기화', subtitle: '방금 전', icon: '📱' },
      ],
    },
    {
      title: '기타',
      items: [
        { title: '언어', subtitle: '한국어', icon: '🌐' },
        { title: '비밀번호 변경', subtitle: '', icon: '🔒' },
        { title: '로그아웃', subtitle: '', icon: '🚪', onPress: handleLogout },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>설정</Text>
          </View>

          {/* Settings Sections */}
          {settingsSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Card style={styles.sectionCard}>
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.settingItem,
                      itemIndex < section.items.length - 1 && styles.settingItemBorder
                    ]}
                    onPress={item.onPress}
                    disabled={!item.onPress}
                  >
                    <View style={styles.settingItemLeft}>
                      <Text style={styles.settingIcon}>{item.icon}</Text>
                      <View style={styles.settingContent}>
                        <Text style={styles.settingTitle}>{item.title}</Text>
                        {item.subtitle && (
                          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                        )}
                      </View>
                    </View>
                    {item.onPress && (
                      <Text style={styles.settingArrow}>›</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </Card>
            </View>
          ))}

          {/* App Info */}
          <View style={styles.appInfo}>
            <Text style={styles.appVersion}>앱 버전 1.0.0</Text>
            <Text style={styles.appDescription}>
              재활 치료 환자를 위한 운동 관리 앱
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: Spacing.paddingLarge,
    paddingTop: Spacing.sectionSpacing,
  },
  header: {
    marginBottom: Spacing.sectionSpacingLarge,
  },
  title: {
    ...Typography.h1,
    color: Colors.textPrimary,
  },
  section: {
    marginBottom: Spacing.sectionSpacing,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
  },
  sectionCard: {
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.componentSpacing,
    paddingHorizontal: Spacing.padding,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: Spacing.componentSpacing,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  settingSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    marginTop: Spacing.xs,
  },
  settingArrow: {
    ...Typography.h2,
    color: Colors.textLight,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: Spacing.sectionSpacingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  appVersion: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  appDescription: {
    ...Typography.caption,
    color: Colors.textLight,
    textAlign: 'center',
  },
});

export default SettingsScreen; 