import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import Card from '../../components/common/Card';
import { IndoorStackParamList } from '../../navigation/types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

const { width: screenWidth } = Dimensions.get('window');

type HealthCheckScreenNavigationProp = NativeStackNavigationProp<IndoorStackParamList, 'HealthCheck'>;

interface HealthCheckParams {
  exerciseName: string;
  exerciseType: string;
}

type SymptomLevel = 'good' | 'mild' | 'moderate' | 'severe';
type BodyPart = 'leg' | 'knee' | 'ankle' | 'heel' | 'back';

interface SymptomState {
  [key: string]: SymptomLevel | null;
}

const HealthCheckScreen: React.FC = () => {
  const navigation = useNavigation<HealthCheckScreenNavigationProp>();
  const route = useRoute();
  const params = route.params as HealthCheckParams;
  
  const [symptoms, setSymptoms] = useState<SymptomState>({
    leg: null,
    knee: null,
    ankle: null,
    heel: null,
    back: null,
  });
  
  const [detailNotes, setDetailNotes] = useState('');

  const bodyParts = [
    { id: 'leg', name: '다리', icon: '🦵', description: '허벅지, 종아리 근육' },
    { id: 'knee', name: '무릎', icon: '🦴', description: '무릎 관절 및 주변' },
    { id: 'ankle', name: '발목', icon: '🦶', description: '발목 관절 및 인대' },
    { id: 'heel', name: '뒷꿈치', icon: '👠', description: '뒷꿈치 및 발바닥' },
    { id: 'back', name: '허리', icon: '🏃‍♂️', description: '허리 및 등 부위' },
  ];

  const symptomLevels = [
    { 
      id: 'good', 
      name: '양호', 
      color: '#10B981', 
      bgColor: '#E8F5E8',
      icon: '●',
      description: '통증이나 불편함이 없음'
    },
    { 
      id: 'mild', 
      name: '경미', 
      color: '#F59E0B', 
      bgColor: '#FEF7E6',
      icon: '●',
      description: '약간의 불편함 있음'
    },
    { 
      id: 'moderate', 
      name: '보통', 
      color: '#F97316', 
      bgColor: '#FFF7ED',
      icon: '●',
      description: '중간 정도의 통증'
    },
    { 
      id: 'severe', 
      name: '심함', 
      color: '#EF4444', 
      bgColor: '#FEE2E2',
      icon: '●',
      description: '심한 통증이나 불편함'
    },
  ];

  const handleSymptomSelect = (bodyPart: BodyPart, level: SymptomLevel) => {
    setSymptoms(prev => ({
      ...prev,
      [bodyPart]: prev[bodyPart] === level ? null : level
    }));
  };

  const handleSubmit = () => {
    // 모든 부위에 대해 체크했는지 확인
    const uncheckedParts = bodyParts.filter(part => !symptoms[part.id]);
    
    if (uncheckedParts.length > 0) {
      Alert.alert(
        '체크 미완료',
        `다음 부위의 상태를 체크해주세요:\n${uncheckedParts.map(part => part.name).join(', ')}`,
        [{ text: '확인' }]
      );
      return;
    }

    // 심한 증상이 있는지 확인
    const severeSymptoms = bodyParts.filter(part => symptoms[part.id] === 'severe');
    
    if (severeSymptoms.length > 0) {
      Alert.alert(
        '주의 필요',
        `다음 부위에 심한 증상이 있습니다:\n${severeSymptoms.map(part => part.name).join(', ')}\n\n의료진과 상담을 권장합니다.`,
        [
          { text: '확인', onPress: saveAndExit }
        ]
      );
    } else {
      saveAndExit();
    }
  };

  const saveAndExit = () => {
    // 여기에 건강 상태 데이터 저장 로직 추가
    const healthCheckData = {
      exerciseName: params?.exerciseName,
      exerciseType: params?.exerciseType,
      symptoms,
      detailNotes,
      timestamp: new Date().toISOString(),
    };
    
    console.log('Health Check Data:', healthCheckData);

    // 운동 기록에 저장할 데이터 생성
    const exerciseRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      type: 'indoor' as const,
      subType: params?.exerciseType || 'walking',
      name: params?.exerciseName || '실내 운동',
      duration: 15, // 기본값, 실제로는 운동 시간을 전달받아야 함
      painAfter: Object.values(symptoms).filter(s => s !== null).length > 0 
        ? Math.round(Object.values(symptoms).reduce((sum, s) => sum + (s === 'good' ? 1 : s === 'mild' ? 3 : s === 'moderate' ? 6 : 8), 0) / Object.values(symptoms).filter(s => s !== null).length)
        : 0,
      notes: detailNotes,
      completionRate: 100,
      difficulty: 'normal' as const,
    };

    console.log('Exercise Record Data:', exerciseRecord);

    Alert.alert(
      '건강 상태 기록 완료',
      '운동 후 건강 상태가 기록되었습니다.',
      [
        {
          text: '확인',
          onPress: () => {
            // 실내 운동 메인으로 돌아가기
            navigation.navigate('IndoorToday' as never);
          }
        }
      ]
    );
  };

  const handleGoBack = () => {
    Alert.alert(
      '기록 중단',
      '건강 상태 기록을 중단하시겠습니까?\n기록하지 않고 나가시겠습니까?',
      [
        { text: '계속 기록', style: 'cancel' },
        {
          text: '나가기',
          style: 'destructive',
          onPress: () => navigation.navigate('IndoorToday' as never)
        }
      ]
    );
  };

  const getSelectedCount = () => {
    return Object.values(symptoms).filter(symptom => symptom !== null).length;
  };

  const getSeverityColor = (level: SymptomLevel | null) => {
    if (!level) return '#E5E7EB';
    const symptomLevel = symptomLevels.find(l => l.id === level);
    return symptomLevel?.color || '#E5E7EB';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="chevron-left" size={28} color="#A3A8AF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>건강 상태 체크</Text>
          <Text style={styles.headerSubtitle}>
            {params?.exerciseName || '운동'} 후 몸의 상태를 확인해주세요
          </Text>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {getSelectedCount()}/{bodyParts.length}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 안내 카드 */}
        <View style={styles.section}>
          <Card style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <View style={styles.infoIcon}>
                <Feather name="heart" size={24} color="#3182F6" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>운동 후 건강 상태</Text>
                <Text style={styles.infoDescription}>
                  각 부위별로 운동 후 느끼는 상태를 정확히 체크해주세요
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* 증상 레벨 범례 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>상태 구분</Text>
          <Card style={styles.legendCard}>
            <View style={styles.legendContainer}>
              {symptomLevels.map((level) => (
                <View key={level.id} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: level.color }]} />
                  <Text style={styles.legendName}>{level.name}</Text>
                  <Text style={styles.legendDescription}>{level.description}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* 신체 부위별 체크 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>부위별 상태</Text>
          <View style={styles.bodyPartsContainer}>
            {bodyParts.map((bodyPart) => (
              <Card key={bodyPart.id} style={styles.bodyPartCard}>
                <View style={styles.bodyPartHeader}>
                  <View style={styles.bodyPartInfo}>
                    <Text style={styles.bodyPartIcon}>{bodyPart.icon}</Text>
                    <View style={styles.bodyPartText}>
                      <Text style={styles.bodyPartName}>{bodyPart.name}</Text>
                      <Text style={styles.bodyPartDescription}>{bodyPart.description}</Text>
                    </View>
                  </View>
                  {symptoms[bodyPart.id] && (
                    <View style={styles.selectedIndicator}>
                      <Text style={styles.selectedText}>
                        {symptomLevels.find(l => l.id === symptoms[bodyPart.id])?.name}
                      </Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.symptomButtons}>
                  {symptomLevels.map((level) => (
                    <TouchableOpacity
                      key={level.id}
                      style={[
                        styles.symptomButton,
                        { backgroundColor: level.bgColor },
                        symptoms[bodyPart.id] === level.id && {
                          backgroundColor: level.color,
                          transform: [{ scale: 1.1 }],
                        }
                      ]}
                      onPress={() => handleSymptomSelect(bodyPart.id as BodyPart, level.id as SymptomLevel)}
                      activeOpacity={0.7}
                    >
                      <Text style={[
                        styles.symptomButtonIcon,
                        { color: level.color },
                        symptoms[bodyPart.id] === level.id && { color: '#FFFFFF' }
                      ]}>
                        {level.icon}
                      </Text>
                      <Text style={[
                        styles.symptomButtonText,
                        { color: level.color },
                        symptoms[bodyPart.id] === level.id && { color: '#FFFFFF' }
                      ]}>
                        {level.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* 상세 기록 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>상세 기록</Text>
          <Card style={styles.detailCard}>
            <Text style={styles.detailLabel}>그 밖에 느낀 점이나 특이사항</Text>
            <TextInput
              style={styles.detailInput}
              placeholder="예: 운동 중 특정 동작에서 불편함을 느꼈거나, 평소와 다른 점이 있다면 자세히 적어주세요..."
              placeholderTextColor="#A3A8AF"
              value={detailNotes}
              onChangeText={setDetailNotes}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <Text style={styles.detailHint}>
              💡 정확한 기록은 더 나은 운동 계획 수립에 도움이 됩니다
            </Text>
          </Card>
        </View>

        {/* 완료 버튼 */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={[
              styles.submitButton,
              getSelectedCount() === bodyParts.length ? styles.submitButtonActive : styles.submitButtonInactive
            ]} 
            onPress={handleSubmit}
            disabled={getSelectedCount() < bodyParts.length}
          >
            <Text style={[
              styles.submitButtonText,
              getSelectedCount() === bodyParts.length ? styles.submitButtonTextActive : styles.submitButtonTextInactive
            ]}>
              건강 상태 기록 완료
            </Text>
            <Feather 
              name="check" 
              size={20} 
              color={getSelectedCount() === bodyParts.length ? "#FFFFFF" : "#A3A8AF"} 
              style={styles.submitButtonIcon} 
            />
          </TouchableOpacity>
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
  progressContainer: {
    backgroundColor: '#3182F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  infoCard: {
    padding: 20,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  legendCard: {
    padding: 16,
  },
  legendContainer: {
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  legendName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    width: 50,
    marginRight: 12,
  },
  legendDescription: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
  },
  bodyPartsContainer: {
    gap: 16,
  },
  bodyPartCard: {
    padding: 20,
  },
  bodyPartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bodyPartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bodyPartIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  bodyPartText: {
    flex: 1,
  },
  bodyPartName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  bodyPartDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  selectedIndicator: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  selectedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  symptomButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  symptomButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  symptomButtonIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  symptomButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailCard: {
    padding: 20,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  detailInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#1F2937',
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  detailHint: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonActive: {
    backgroundColor: '#3182F6',
    shadowColor: '#3182F6',
  },
  submitButtonInactive: {
    backgroundColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  submitButtonTextActive: {
    color: '#FFFFFF',
  },
  submitButtonTextInactive: {
    color: '#A3A8AF',
  },
  submitButtonIcon: {
    marginLeft: 4,
  },
});

export default HealthCheckScreen;