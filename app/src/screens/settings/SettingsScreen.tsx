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
import { CommonActions } from '@react-navigation/native';
import Card from '../../components/common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/slices/authSlice';
import { AppDispatch } from '../../store';
import { RootStackParamList } from '../../navigation/types';
import { Feather } from '@expo/vector-icons';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const SettingsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [autoSync, setAutoSync] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const settingsSections = [
    {
      title: '계정',
      items: [
        {
          id: 'profile',
          title: '프로필 정보',
          subtitle: '개인정보 수정',
          icon: '👤',
          type: 'navigate',
        },
        {
          id: 'password',
          title: '비밀번호 변경',
          subtitle: '보안을 위한 비밀번호 변경',
          icon: '🔒',
          type: 'navigate',
        },
        // {
        //   id: 'role',
        //   title: '역할 설정',
        //   subtitle: '환자 / 보호자 역할 변경',
        //   icon: '🔄',
        //   type: 'navigate',
        // },
        {
          id: 'caregiver',
          title: '보호자 연동',
          subtitle: '보호자와 연동하기',
          icon: '🤝',
          type: 'navigate',
        },
      ],
    },
    {
      title: '알림',
      items: [
        {
          id: 'notifications',
          title: '푸시 알림',
          subtitle: '운동 알림 및 상태 업데이트',
          icon: '🔔',
          type: 'switch',
          value: notifications,
          onValueChange: setNotifications,
        },
        // {
        //   id: 'reminders',
        //   title: '운동 알림',
        //   subtitle: '정기적인 운동 알림',
        //   icon: '⏰',
        //   type: 'navigate',
        // },
        {
          id: 'emergency',
          title: '긴급 알림',
          subtitle: '긴급 상황 시 알림',
          icon: '🚨',
          type: 'navigate',
        },
      ],
    },
    {
      title: '개인정보',
      items: [
        // {
        //   id: 'location',
        //   title: '위치 서비스',
        //   subtitle: '실외 운동 시 위치 추적',
        //   icon: '📍',
        //   type: 'switch',
        //   value: locationServices,
        //   onValueChange: setLocationServices,
        // },
        {
          id: 'health',
          title: '건강 데이터',
          subtitle: '건강 정보 공유 설정',
          icon: '❤️',
          type: 'navigate',
        },
        // {
        //   id: 'privacy',
        //   title: '개인정보 보호',
        //   subtitle: '데이터 수집 및 사용',
        //   icon: '🛡️',
        //   type: 'navigate',
        // },
      ],
    },
    // {
    //   title: '앱 설정',
    //   items: [ ... ],
    // },
    // {
    //   title: '지원',
    //   items: [ ... ],
    // },
  ];

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
      '계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 정말 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '삭제', style: 'destructive', onPress: () => {
          // 계정 삭제 로직
          console.log('계정 삭제');
        }},
      ]
    );
  };

  const renderSettingItem = (item: any) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={() => {
          if (item.type === 'navigate') {
            // 네비게이션 로직
            console.log('Navigate to:', item.id);
          }
        }}
      >
        <View style={styles.settingIcon}>
          <Text style={styles.settingIconText}>{item.icon}</Text>
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
        {item.type === 'switch' ? (
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: Colors.borderLight, true: Colors.primary + '40' }}
            thumbColor={item.value ? Colors.primary : Colors.textLight}
          />
        ) : (
          <Text style={styles.settingArrow}>›</Text>
        )}
      </TouchableOpacity>
    );
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
          <Text style={styles.headerSubtitle}>앱 설정을 관리하세요</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Card style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <View key={item.id}>
                  {renderSettingItem(item)}
                  {itemIndex < section.items.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </Card>
          </View>
        ))}

        {/* Logout and Delete Account */}
        <View style={styles.dangerSection}>
          <Card style={styles.dangerCard}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>로그아웃</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
              <Text style={styles.deleteButtonText}>계정 삭제</Text>
            </TouchableOpacity>
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
  section: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
    fontWeight: '600',
  },
  sectionCard: {
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.componentSpacing,
    paddingHorizontal: Spacing.padding,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  settingIconText: {
    fontSize: 18,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  settingSubtitle: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  settingArrow: {
    ...Typography.h3,
    color: Colors.textLight,
    fontWeight: '300',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginLeft: 56 + Spacing.componentSpacing,
  },
  dangerSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  dangerCard: {
    padding: 0,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.componentSpacing,
    paddingHorizontal: Spacing.padding,
  },
  logoutButtonText: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '500',
    flex: 1,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.componentSpacing,
    paddingHorizontal: Spacing.padding,
  },
  deleteButtonText: {
    ...Typography.body,
    color: '#F44336',
    fontWeight: '500',
    flex: 1,
  },
});

export default SettingsScreen;