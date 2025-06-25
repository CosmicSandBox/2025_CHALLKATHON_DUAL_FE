import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { setRole, signIn } from '../../store/slices/authSlice';
import { restoreAuthToken } from '../../api';
import { KakaoService } from '../../services/kakaoService';
import KakaoLoginWebView from '../../components/auth/KakaoLoginWebView';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Feather } from '@expo/vector-icons';

type UserRole = 'patient' | 'caregiver';

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [authUrl, setAuthUrl] = useState('');

  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role);
    dispatch(setRole(role));
  };

  const handleKakaoLogin = async () => {
    if (!selectedRole) {
      Alert.alert('역할 선택', '먼저 역할을 선택해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      console.log('🚀 카카오 로그인 시작...');
      
      // 카카오 로그인 URL 가져오기
      const url = await KakaoService.getAuthUrl();
      setAuthUrl(url);
      setShowWebView(true);
    } catch (error) {
      console.error('❌ 로그인 오류:', error);
      Alert.alert('로그인 실패', '카카오 로그인 URL을 가져오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebViewSuccess = async (code: string) => {
    setIsLoading(true);
    
    try {
      console.log('✅ 인가 코드 수신:', code.substring(0, 20) + '...');
      
      // 인가 코드로 토큰 받기
      const result = await KakaoService.exchangeCodeForToken(code);
      
      if (result.success && result.token && selectedRole) {
        // 토큰을 AsyncStorage에 저장
        await AsyncStorage.setItem('userToken', result.token);
        await AsyncStorage.setItem('userRole', selectedRole);

        // API 클라이언트에 토큰 설정
        restoreAuthToken(result.token);

        // Redux 상태 업데이트
        dispatch(signIn({
          token: result.token,
          role: selectedRole,
        }));

        console.log(`🎉 로그인 성공 - 역할: ${selectedRole}`);
      } else {
        console.error('❌ 토큰 교환 실패:', result.error);
        Alert.alert('로그인 실패', result.error || '토큰을 받아오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('❌ 토큰 교환 오류:', error);
      Alert.alert('로그인 실패', '카카오 로그인 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebViewError = (error: string) => {
    console.error('❌ WebView 오류:', error);
    // 404 에러는 정상적인 리다이렉트이므로 Alert를 표시하지 않음
    if (!error.includes('404') && !error.includes('HTTP error')) {
      Alert.alert('로그인 실패', error);
    }
    setShowWebView(false);
  };

  const handleWebViewClose = () => {
    setShowWebView(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>듀얼 시작하기</Text>
          <Text style={styles.subtitle}>
            어떤 역할로 서비스를 이용하시나요?
          </Text>
        </View>

        <View style={styles.selectionContainer}>
          <TouchableOpacity 
            style={[
              styles.selectionButton,
              selectedRole === 'patient' && styles.selectedButton
            ]} 
            onPress={() => handleRoleSelection('patient')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={selectedRole === 'patient' ? [Colors.primary, '#6366f1'] : [Colors.surface, Colors.surface]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.buttonContent}>
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: selectedRole === 'patient' ? 'rgba(255, 255, 255, 0.2)' : Colors.borderLight }
                ]}>
                  <Feather 
                    name="user" 
                    size={28} 
                    color={selectedRole === 'patient' ? '#fff' : Colors.textLight} 
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[
                    styles.selectionTitle,
                    { color: selectedRole === 'patient' ? '#fff' : Colors.textPrimary }
                  ]}>
                    환자
                  </Text>
                  <Text style={[
                    styles.selectionDescription,
                    { color: selectedRole === 'patient' ? 'rgba(255, 255, 255, 0.9)' : Colors.textLight }
                  ]}>
                    AI코칭을 통해 재활을 진행합니다
                  </Text>
                </View>
                {selectedRole === 'patient' && (
                  <Feather name="check-circle" size={20} color="#fff" />
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.selectionButton,
              selectedRole === 'caregiver' && styles.selectedButton
            ]} 
            onPress={() => handleRoleSelection('caregiver')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={selectedRole === 'caregiver' ? ['#10b981', '#059669'] : [Colors.surface, Colors.surface]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.buttonContent}>
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: selectedRole === 'caregiver' ? 'rgba(255, 255, 255, 0.2)' : Colors.borderLight }
                ]}>
                  <Feather 
                    name="users" 
                    size={28} 
                    color={selectedRole === 'caregiver' ? '#fff' : Colors.textLight} 
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[
                    styles.selectionTitle,
                    { color: selectedRole === 'caregiver' ? '#fff' : Colors.textPrimary }
                  ]}>
                    보호자
                  </Text>
                  <Text style={[
                    styles.selectionDescription,
                    { color: selectedRole === 'caregiver' ? 'rgba(255, 255, 255, 0.9)' : Colors.textLight }
                  ]}>
                    환자의 재활 과정을 돕습니다
                  </Text>
                </View>
                {selectedRole === 'caregiver' && (
                  <Feather name="check-circle" size={20} color="#fff" />
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {selectedRole && (
          <View style={styles.loginSection}>
            <TouchableOpacity 
              style={[styles.kakaoButton, isLoading && styles.kakaoButtonDisabled]}
              onPress={handleKakaoLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <View style={styles.kakaoButtonContent}>
                <View style={styles.kakaoIcon}>
                  <Text style={styles.kakaoIconText}>K</Text>
                </View>
                {isLoading ? (
                  <ActivityIndicator color="#3C1E1E" size="small" />
                ) : (
                  <Text style={styles.kakaoButtonText}>카카오로 로그인</Text>
                )}
              </View>
            </TouchableOpacity>
            
            <Text style={styles.loginHelpText}>
              선택한 역할로 카카오 계정을 통해 로그인합니다.
            </Text>
          </View>
        )}
      </View>

      {/* 카카오 로그인 WebView */}
      <KakaoLoginWebView
        visible={showWebView}
        authUrl={authUrl}
        onClose={handleWebViewClose}
        onSuccess={handleWebViewSuccess}
        onError={handleWebViewError}
      />
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
    padding: Spacing.paddingLarge,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.sectionSpacingLarge,
  },
  title: {
    ...Typography.h1,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    fontWeight: '700',
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 24,
  },
  selectionContainer: {
    gap: Spacing.componentSpacing,
    marginBottom: Spacing.sectionSpacing,
  },
  selectionButton: {
    borderRadius: Spacing.cardRadius,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedButton: {
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonGradient: {
    borderRadius: Spacing.cardRadius,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.paddingLarge,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  textContainer: {
    flex: 1,
  },
  selectionTitle: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
    fontWeight: '600',
  },
  selectionDescription: {
    ...Typography.body,
    fontSize: 14,
  },
  loginSection: {
    marginTop: Spacing.componentSpacing,
    alignItems: 'center',
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
    borderRadius: Spacing.cardRadius,
    padding: Spacing.paddingLarge,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  kakaoButtonDisabled: {
    opacity: 0.7,
  },
  kakaoButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kakaoIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3C1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  kakaoIconText: {
    color: '#FEE500',
    fontWeight: 'bold',
    fontSize: 12,
  },
  kakaoButtonText: {
    ...Typography.body,
    color: '#3C1E1E',
    fontWeight: '600',
    fontSize: 16,
  },
  loginHelpText: {
    ...Typography.caption,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: Spacing.sm,
    maxWidth: '80%',
  },
});

export default LoginScreen;