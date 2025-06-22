import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setUserRole, completeOnboarding } from '../store/slices/authSlice';
import { UserRole } from '../store/slices/authSlice';
import { AppDispatch } from '../store';
import Button from '../components/common/Button';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoleSelectionScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRoleSelection = async (role: UserRole) => {
    try {
      // 동기적으로 상태 업데이트
      dispatch(setUserRole(role));
      dispatch(completeOnboarding());
      
      // AsyncStorage에 저장
      await AsyncStorage.setItem('userRole', role);
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      
      console.log('역할 선택 완료:', role);
    } catch (error) {
      console.error('역할 선택 중 오류:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>🏥</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>어떤 계정으로 시작하시나요?</Text>

        {/* Role Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="환자"
            onPress={() => handleRoleSelection('patient')}
            variant="primary"
            size="large"
            fullWidth
            style={styles.roleButton}
          />
          
          <Button
            title="보호자"
            onPress={() => handleRoleSelection('caregiver')}
            variant="outline"
            size="large"
            fullWidth
            style={styles.roleButton}
          />
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            환자: 재활 운동 기록 및 통증 관리{'\n'}
            보호자: 환자 모니터링 및 관리
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.paddingLarge,
  },
  logoContainer: {
    marginBottom: Spacing.sectionSpacingLarge,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontSize: 48,
  },
  title: {
    ...Typography.h2,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sectionSpacingLarge,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: Spacing.sectionSpacingLarge,
  },
  roleButton: {
    marginBottom: Spacing.componentSpacing,
  },
  descriptionContainer: {
    alignItems: 'center',
  },
  description: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default RoleSelectionScreen; 