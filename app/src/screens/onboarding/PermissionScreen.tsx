import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import { OnboardingStackParamList } from '../../navigation/types';
import Button from '../../components/common/Button';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

type PermissionScreenNavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Permission'>;

interface PermissionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  granted: boolean;
}

const PermissionScreen: React.FC = () => {
  const navigation = useNavigation<PermissionScreenNavigationProp>();
  const dispatch = useDispatch();
  const { userRole } = useSelector((state: RootState) => state.auth);
  const [permissions, setPermissions] = useState<PermissionItem[]>([
    {
      id: 'location',
      title: '위치 정보',
      description: '실외 운동 시 경로 추적 및 안전 모니터링',
      icon: '📍',
      granted: false,
    },
    {
      id: 'pedometer',
      title: '걸음 센서',
      description: '걸음 수 측정 및 운동량 추적',
      icon: '👟',
      granted: false,
    },
    {
      id: 'camera',
      title: '카메라',
      description: '운동 사진 촬영 및 기록',
      icon: '📷',
      granted: false,
    },
  ]);

  const requestPermissions = async () => {
    try {
      // Mock permission requests
      const updatedPermissions = permissions.map(permission => ({
        ...permission,
        granted: true,
      }));
      
      setPermissions(updatedPermissions);
      
      // Simulate permission request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        '권한 설정 완료',
        '모든 권한이 허용되었습니다.',
        [
          {
            text: '확인',
            onPress: () => navigation.navigate('InviteCode'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('오류', '권한 요청에 실패했습니다. 설정에서 권한을 확인해주세요.');
    }
  };

  const handleSkip = () => {
    Alert.alert(
      '권한 건너뛰기',
      '권한 없이도 기본 기능을 사용할 수 있지만, 일부 기능이 제한됩니다. 계속하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '계속',
          onPress: () => navigation.navigate('InviteCode'),
        },
      ]
    );
  };

  const handleChangeRole = () => {
    Alert.alert(
      '역할 변경',
      '다른 역할로 변경하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '변경', onPress: () => {
          dispatch(logout());
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>권한 설정</Text>
            <Text style={styles.subtitle}>
              {userRole === 'patient' ? '환자' : '보호자'} 계정 설정을 완료하세요{'\n'}
              서비스 이용을 위해 다음 권한들이 필요합니다
            </Text>
          </View>

          {/* Permission List */}
          <View style={styles.permissionList}>
            {permissions.map((permission) => (
              <View key={permission.id} style={styles.permissionItem}>
                <View style={styles.permissionIcon}>
                  <Text style={styles.iconText}>{permission.icon}</Text>
                </View>
                <View style={styles.permissionContent}>
                  <Text style={styles.permissionTitle}>{permission.title}</Text>
                  <Text style={styles.permissionDescription}>
                    {permission.description}
                  </Text>
                </View>
                <View style={styles.permissionStatus}>
                  <Text style={[
                    styles.statusText,
                    permission.granted ? styles.statusGranted : styles.statusDenied
                  ]}>
                    {permission.granted ? '허용됨' : '필요'}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              • 권한은 언제든지 설정에서 변경할 수 있습니다{'\n'}
              • 권한 없이도 기본 기능을 사용할 수 있습니다
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              title="모든 권한 허용"
              onPress={requestPermissions}
              fullWidth
              style={styles.allowButton}
            />
            
            <Button
              title="나중에 설정"
              onPress={handleSkip}
              variant="ghost"
              fullWidth
              style={styles.skipButton}
            />
          </View>

          {/* Change Role Button */}
          <View style={styles.changeRoleContainer}>
            <TouchableOpacity onPress={handleChangeRole}>
              <Text style={styles.changeRoleText}>
                다른 역할로 시작하기
              </Text>
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
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.paddingLarge,
    paddingTop: Spacing.sectionSpacing,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.sectionSpacingLarge,
  },
  title: {
    ...Typography.h1,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  permissionList: {
    marginBottom: Spacing.sectionSpacingLarge,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.componentSpacing,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  permissionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  iconText: {
    fontSize: 24,
  },
  permissionContent: {
    flex: 1,
  },
  permissionTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  permissionDescription: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    lineHeight: 18,
  },
  permissionStatus: {
    marginLeft: Spacing.componentSpacing,
  },
  statusText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  statusGranted: {
    color: Colors.success,
  },
  statusDenied: {
    color: Colors.textLight,
  },
  infoContainer: {
    backgroundColor: Colors.secondary,
    padding: Spacing.padding,
    borderRadius: Spacing.cardRadius,
    marginBottom: Spacing.sectionSpacingLarge,
  },
  infoText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  buttonContainer: {
    marginBottom: Spacing.sectionSpacing,
  },
  allowButton: {
    marginBottom: Spacing.componentSpacing,
  },
  skipButton: {
    marginBottom: Spacing.componentSpacing,
  },
  changeRoleContainer: {
    alignItems: 'center',
    marginTop: Spacing.sectionSpacing,
  },
  changeRoleText: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
});

export default PermissionScreen; 