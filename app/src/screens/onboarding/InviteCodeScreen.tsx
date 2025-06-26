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
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { linkPatient } from '../../api';
import { completeOnboarding, logout } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import { OnboardingStackParamList } from '../../navigation/types';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

type InviteCodeScreenNavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'InviteCode'>;

const InviteCodeScreen: React.FC = () => {
  const navigation = useNavigation<InviteCodeScreenNavigationProp>();
  const dispatch = useDispatch();
  const { userRole } = useSelector((state: RootState) => state.auth);
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigateToMainApp = () => {
    // Mark onboarding as completed
    dispatch(completeOnboarding());
  };

  const handleVerifyCode = async () => {
    if (!inviteCode.trim()) {
      Alert.alert('알림', '초대 코드를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      console.log('초대 코드 검증 시작:', inviteCode);
      
      // 실제 API 호출
      const result = await linkPatient({ patientLinkCode: inviteCode });
      console.log('초대 코드 검증 성공:', result);

      Alert.alert(
        '초대 코드 확인 완료',
        result || '초대 코드가 확인되었습니다. 서비스를 시작합니다.',
        [
          {
            text: '확인',
            onPress: navigateToMainApp,
          },
        ]
      );
    } catch (error) {
      console.error('초대 코드 검증 실패:', error);
      const errorMessage = error instanceof Error ? error.message : '초대 코드 확인에 실패했습니다.';
      Alert.alert('오류', errorMessage + '\n\n다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      '초대 코드 건너뛰기',
      '초대 코드 없이도 서비스를 사용할 수 있지만, 일부 기능이 제한됩니다. 계속하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '계속',
          onPress: navigateToMainApp,
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
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>🎫</Text>
            </View>
            <Text style={styles.title}>초대 코드 입력</Text>
            <Text style={styles.subtitle}>
              {userRole === 'patient' ? '환자' : '보호자'} 계정 설정을 완료하세요{'\n'}
              보호자로부터 받은 초대 코드를 입력하세요
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="초대 코드"
              placeholder="초대 코드를 입력하세요"
              value={inviteCode}
              onChangeText={setInviteCode}
              autoCapitalize="characters"
              autoCorrect={false}
              maxLength={8}
            />

            <Button
              title="확인"
              onPress={handleVerifyCode}
              loading={isLoading}
              fullWidth
              style={styles.verifyButton}
            />
          </View>

          {/* Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>초대 코드란?</Text>
            <Text style={styles.infoText}>
              • 보호자가 환자를 초대할 때 생성되는 코드입니다{'\n'}
              • 초대 코드를 통해 보호자와 연결됩니다{'\n'}
              • 초대 코드 없이도 개인 운동 기록이 가능합니다
            </Text>
          </View>

          {/* Skip Button */}
          <View style={styles.skipContainer}>
            <Button
              title="초대 코드 없이 시작"
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
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  iconText: {
    fontSize: 32,
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
  form: {
    marginBottom: Spacing.sectionSpacingLarge,
  },
  verifyButton: {
    marginTop: Spacing.componentSpacing,
  },
  infoContainer: {
    backgroundColor: Colors.secondary,
    padding: Spacing.padding,
    borderRadius: Spacing.cardRadius,
    marginBottom: Spacing.sectionSpacingLarge,
  },
  infoTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  infoText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  skipContainer: {
    marginBottom: Spacing.sectionSpacing,
  },
  skipButton: {
    marginBottom: Spacing.componentSpacing,
  },
  changeRoleContainer: {
    marginBottom: Spacing.sectionSpacing,
  },
  changeRoleText: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default InviteCodeScreen; 