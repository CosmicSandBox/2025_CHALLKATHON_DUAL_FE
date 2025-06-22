import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { loginStart, loginSuccess, loginFailure, logout } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import { AuthStackParamList } from '../../navigation/types';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();
  const { isLoading, error, userRole } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    let isValid = true;

    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('올바른 이메일 형식을 입력해주세요.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('비밀번호는 6자 이상이어야 합니다.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    dispatch(loginStart());

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful login
      const mockUser = {
        id: '1',
        email: email,
        name: '홍길동',
        role: userRole || 'patient',
      };

      dispatch(loginSuccess(mockUser));
    } catch (error) {
      dispatch(loginFailure('로그인에 실패했습니다. 다시 시도해주세요.'));
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert('알림', 'Google 로그인 기능은 준비 중입니다.');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ResetPassword');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
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
            <Text style={styles.title}>로그인</Text>
            <Text style={styles.subtitle}>
              {userRole === 'patient' ? '환자' : '보호자'} 계정으로 로그인하세요
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="이메일"
              placeholder="이메일을 입력하세요"
              value={email}
              onChangeText={setEmail}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Input
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChangeText={setPassword}
              error={passwordError}
              secureTextEntry
              autoCapitalize="none"
            />

            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <Button
              title="로그인"
              onPress={handleLogin}
              loading={isLoading}
              fullWidth
              style={styles.loginButton}
            />

            <Button
              title="Google로 로그인"
              onPress={handleGoogleLogin}
              variant="outline"
              fullWidth
              style={styles.googleButton}
            />
          </View>

          {/* Links */}
          <View style={styles.links}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.linkText}>비밀번호 찾기</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleSignup}>
              <Text style={styles.linkText}>회원가입</Text>
            </TouchableOpacity>
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
  },
  form: {
    marginBottom: Spacing.sectionSpacingLarge,
  },
  loginButton: {
    marginTop: Spacing.componentSpacing,
  },
  googleButton: {
    marginTop: Spacing.componentSpacing,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.error,
    textAlign: 'center',
    marginTop: Spacing.componentSpacing,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    ...Typography.body,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  changeRoleContainer: {
    marginTop: Spacing.componentSpacing,
    alignItems: 'center',
  },
  changeRoleText: {
    ...Typography.body,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen; 