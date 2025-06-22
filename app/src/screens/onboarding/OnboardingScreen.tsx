import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { completeOnboarding } from '../../store/slices/authSlice';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Feather } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const panAnim = useRef(new Animated.Value(0)).current;

  const steps = [
    {
      title: '실시간으로\n진행 상황을 확인해요',
      subtitle: '걸음 수, 운동 기록을\n실시간으로 추적하고 분석합니다',
      color: Colors.primary,
      gradient: [Colors.primary, '#4CAF50'],
      icon: 'activity',
    },
    {
      title: '보호자와 함께\n안전하게 재활해요',
      subtitle: '보호자도 함께 참여하여\n더욱 안전하고 체계적인 재활을',
      color: Colors.success,
      gradient: [Colors.success, '#66BB6A'],
      icon: 'heart',
    },
    {
      title: '개인 맞춤형\n재활 프로그램',
      subtitle: '당신만을 위한 맞춤형\n재활 계획으로 효과적인 회복을',
      color: Colors.info,
      gradient: [Colors.info, '#42A5F5'],
      icon: 'award',
    },
  ];

  // 떠다니는 애니메이션
  useEffect(() => {
    const float = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );
    float.start();
    return () => float.stop();
  }, []);

  const goToNext = () => {
    if (currentStep < steps.length - 1) {
      animateTransition('next');
    } else {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
      ]).start(() => {
        dispatch(completeOnboarding());
      });
    }
  };

  const goToPrevious = () => {
    if (currentStep > 0) {
      animateTransition('prev');
    }
  };

  const animateTransition = (direction: 'next' | 'prev') => {
    const slideDistance = direction === 'next' ? -30 : 30;
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: slideDistance,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentStep(direction === 'next' ? currentStep + 1 : currentStep - 1);
      slideAnim.setValue(-slideDistance);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: panAnim } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      const threshold = screenWidth * 0.3;

      if (translationX > threshold && currentStep > 0) {
        goToPrevious();
      } else if (translationX < -threshold && currentStep < steps.length - 1) {
        goToNext();
      } else {
        Animated.spring(panAnim, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  const skipOnboarding = () => {
    dispatch(completeOnboarding());
  };

  const floatInterpolate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* 상단 건너뛰기 버튼 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={skipOnboarding} style={styles.skipButton}>
          <Text style={styles.skipText}>건너뛰기</Text>
        </TouchableOpacity>
      </View>

      {/* 메인 콘텐츠 */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={styles.content}>
          <Animated.View 
            style={[
              styles.slideContainer,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                ],
              }
            ]}
          >
            {/* 아이콘 */}
            <Animated.View style={[styles.iconContainer, { transform: [{ translateY: floatInterpolate }] }]}>
              <LinearGradient
                colors={steps[currentStep].gradient as [string, string]}
                style={styles.iconBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Feather 
                  name={steps[currentStep].icon as any} 
                  size={48} 
                  color="#fff" 
                />
              </LinearGradient>
            </Animated.View>

            {/* 제목 */}
            <Text style={[styles.title, { color: steps[currentStep].color }]}>
              {steps[currentStep].title}
            </Text>
            
            {/* 부제목 */}
            <Text style={styles.subtitle}>{steps[currentStep].subtitle}</Text>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>

      {/* 하단 네비게이션 */}
      <View style={styles.footer}>
        {/* 인디케이터 */}
        <View style={styles.indicators}>
          {steps.map((step, index) => (
            <Animated.View
              key={index}
              style={[
                styles.indicator,
                index === currentStep && [styles.activeIndicator, { backgroundColor: step.color }],
              ]}
            />
          ))}
        </View>

        {/* 이전/다음 버튼 */}
        <View style={styles.buttonContainer}>
          {currentStep > 0 && (
            <TouchableOpacity 
              style={styles.prevButton} 
              onPress={goToPrevious}
              activeOpacity={0.7}
            >
              <Feather name="chevron-left" size={20} color={Colors.textLight} />
            </TouchableOpacity>
          )}
          
          <Animated.View style={{ transform: [{ scale: scaleAnim }], flex: 1 }}>
            <LinearGradient
              colors={steps[currentStep].gradient as [string, string]}
              style={styles.nextButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <TouchableOpacity 
                style={styles.buttonContent}
                onPress={goToNext}
                activeOpacity={0.9}
              >
                <Text style={styles.nextButtonText}>
                  {currentStep === steps.length - 1 ? '시작하기' : '다음'}
                </Text>
                <Feather 
                  name={currentStep === steps.length - 1 ? 'arrow-right' : 'chevron-right'} 
                  size={20} 
                  color={Colors.background} 
                />
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.paddingLarge,
    paddingTop: Spacing.padding,
  },
  skipButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  skipText: {
    ...Typography.body,
    color: Colors.textLight,
    fontWeight: '500',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.paddingLarge,
  },
  slideContainer: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    marginBottom: Spacing.sectionSpacing,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    ...Typography.h1,
    textAlign: 'center',
    marginBottom: Spacing.componentSpacing,
    lineHeight: 48,
    fontWeight: '700',
    fontSize: 32,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 16,
    maxWidth: '85%',
  },
  footer: {
    paddingHorizontal: Spacing.paddingLarge,
    paddingBottom: Spacing.paddingLarge,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.sectionSpacing,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 3,
  },
  activeIndicator: {
    width: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.componentSpacing,
  },
  prevButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonContent: {
    paddingVertical: 18,
    paddingHorizontal: Spacing.paddingLarge,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    ...Typography.body,
    color: Colors.background,
    fontWeight: '600',
    marginRight: Spacing.sm,
    fontSize: 16,
  },
});

export default OnboardingScreen; 