import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import Card from '../../../components/common/Card';
import { IndoorStackParamList } from '../../../navigation/types';
import { WalkingSupportMeasurementState } from './types';
import { 
  WALKING_SUPPORT_CONFIG,
  WALKING_SUPPORT_STEPS,
  SAFETY_TIPS,
  EXERCISE_BENEFITS,
  EXERCISE_INFO
} from './mock';
import { styles } from './WalkingSupportMeasurementScreen.styled';

const WalkingSupportMeasurementScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<IndoorStackParamList, 'WalkingSupportMeasurement'>>();
  const [state, setState] = useState<WalkingSupportMeasurementState>({
    started: false,
    currentStep: 0,
    distance: 0,
    isCompleted: false,
  });

  const handleStart = () => {
    Alert.alert(
      '운동 시작 안내',
      '보행보조 운동을 시작하기 전에 다음 사항을 확인해주세요:\n\n• 보호자가 함께 있는지 확인\n• 미끄럽지 않은 신발 착용\n• 장애물 없는 평평한 바닥\n• 보행보조기구가 준비되어 있는지 확인',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '시작하기',
          onPress: () => {
            setState(prev => ({ ...prev, started: true, currentStep: 1 }));
          },
        },
      ]
    );
  };

  const handleCompleteExercise = () => {
    Alert.alert(
      '운동 완료! 🎉',
      '보행보조 운동을 성공적으로 완료하셨습니다!\n\n안전한 보행 능력이 향상되었어요.',
      [
        {
          text: '확인',
          onPress: () => {
            setState({
              started: false,
              currentStep: 0,
              distance: 0,
              isCompleted: false,
            });
            navigation.navigate('HealthCheck', {
              exerciseName: '보행보조 운동',
              exerciseType: 'walking_support'
            });
          },
        },
      ]
    );
  };

  const handleGoBack = () => {
    if (state.started) {
      Alert.alert(
        '운동 중단',
        '운동을 중단하고 이전 화면으로 돌아가시겠습니까?',
        [
          { text: '계속하기', style: 'cancel' },
          {
            text: '나가기',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="chevron-left" size={28} color="#A3A8AF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{EXERCISE_INFO.title}</Text>
          <Text style={styles.headerSubtitle}>{EXERCISE_INFO.subtitle}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {!state.started ? (
          <>
            {/* 운동 소개 카드 */}
            <View style={styles.section}>
              <Card style={styles.introCard}>
                <View style={styles.introHeader}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.iconText}>{EXERCISE_INFO.emoji}</Text>
                  </View>
                  <View style={styles.introInfo}>
                    <Text style={styles.introTitle}>{EXERCISE_INFO.title}</Text>
                    <Text style={styles.introDescription}>{EXERCISE_INFO.description}</Text>
                  </View>
                </View>
                <View style={styles.exerciseStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{WALKING_SUPPORT_CONFIG.targetDistance}m</Text>
                    <Text style={styles.statLabel}>목표거리</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{WALKING_SUPPORT_CONFIG.stepCount}</Text>
                    <Text style={styles.statLabel}>단계</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{WALKING_SUPPORT_CONFIG.estimatedDuration}</Text>
                    <Text style={styles.statLabel}>소요시간</Text>
                  </View>
                </View>
              </Card>
            </View>

            {/* 운동 단계 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>운동 단계</Text>
              <Card style={styles.stepsCard}>
                <View style={styles.stepsList}>
                  {WALKING_SUPPORT_STEPS.map((step) => (
                    <View key={step.id} style={styles.stepItem}>
                      <View style={styles.stepIconContainer}>
                        <Text style={styles.stepEmoji}>{step.emoji}</Text>
                      </View>
                      <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>{step.title}</Text>
                        <Text style={styles.stepDescription}>{step.description}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </Card>
            </View>

            {/* 운동 효과 & 안전수칙 */}
            <View style={styles.twoColumnSection}>
              <View style={styles.halfWidth}>
                <Text style={styles.sectionTitle}>운동 효과</Text>
                <Card style={styles.benefitCard}>
                  {EXERCISE_BENEFITS.map((benefit, index) => (
                    <View key={index} style={styles.benefitItem}>
                      <Text style={styles.benefitIcon}>✓</Text>
                      <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                  ))}
                </Card>
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.sectionTitle}>안전수칙</Text>
                <Card style={styles.safetyCard}>
                  {SAFETY_TIPS.map((tip, index) => (
                    <View key={index} style={styles.safetyItem}>
                      <Text style={styles.safetyIcon}>{tip.icon}</Text>
                      <Text style={styles.safetyText}>{tip.text}</Text>
                    </View>
                  ))}
                </Card>
              </View>
            </View>

            {/* 주의사항 카드 */}
            <View style={styles.section}>
              <Card style={styles.preparationCard}>
                <Text style={styles.preparationTitle}>🚨 운동 시작 전 필수 확인사항</Text>
                <Text style={styles.preparationText}>
                  반드시 보호자와 함께 진행하시고, 안전한 환경에서 운동해주세요.
                  {'\n'}보행보조기구가 올바르게 준비되었는지 확인해주세요.
                </Text>
              </Card>
            </View>

            {/* 시작 버튼 */}
            <View style={styles.section}>
              <TouchableOpacity style={styles.startButton} onPress={handleStart}>
                <Text style={styles.startButtonText}>운동 시작하기</Text>
                <Feather name="play" size={20} color="#FFFFFF" style={styles.startButtonIcon} />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {/* 운동 진행 중 UI는 향후 구현 */}
            <View style={styles.section}>
              <Card style={styles.preparationCard}>
                <Text style={styles.preparationTitle}>🚶‍♂️ 보행보조 운동 진행 중</Text>
                <Text style={styles.preparationText}>
                  현재 단계: {state.currentStep}/{WALKING_SUPPORT_CONFIG.stepCount}
                  {'\n'}안전하게 보행보조기구를 사용하여 운동을 진행해주세요.
                </Text>
              </Card>
            </View>

            <View style={styles.section}>
              <TouchableOpacity style={styles.startButton} onPress={handleCompleteExercise}>
                <Text style={styles.startButtonText}>운동 완료</Text>
                <Feather name="check" size={20} color="#FFFFFF" style={styles.startButtonIcon} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalkingSupportMeasurementScreen;
