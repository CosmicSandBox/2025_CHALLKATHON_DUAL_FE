import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthStackParamList } from '../../navigation/types';
import { setRole } from '../../store/slices/authSlice';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Feather } from '@expo/vector-icons';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();

  const handleRoleSelection = (role: 'patient' | 'caregiver') => {
    dispatch(setRole(role));
    // 역할 선택 후, 실제 로그인/회원가입을 진행할 별도의 화면으로 이동해야 합니다.
    // 지금은 임시로 Signup으로 이동시킵니다.
    navigation.navigate('LoginForm');
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
            style={styles.selectionButton} 
            onPress={() => handleRoleSelection('patient')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[Colors.primary, '#6366f1']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.buttonContent}>
                <View style={styles.iconContainer}>
                  <Feather name="user" size={28} color="#fff" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.selectionTitle}>환자</Text>
                  <Text style={styles.selectionDescription}>
                    AI코칭을 통해 재활을 진행합니다
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.selectionButton} 
            onPress={() => handleRoleSelection('caregiver')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#10b981', '#059669']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.buttonContent}>
                <View style={styles.iconContainer}>
                  <Feather name="users" size={28} color="#fff" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.selectionTitle}>보호자</Text>
                  <Text style={styles.selectionDescription}>
                    환자의 재활 과정을 돕습니다
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  textContainer: {
    flex: 1,
  },
  selectionTitle: {
    ...Typography.h3,
    color: '#fff',
    marginBottom: Spacing.xs,
    fontWeight: '600',
  },
  selectionDescription: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
});

export default LoginScreen; 