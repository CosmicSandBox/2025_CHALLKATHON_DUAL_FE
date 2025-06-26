import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Card from '../../../components/common/Card';
import { styles } from './HealthCheckScreen.styled';
import { 
  HealthCheckScreenNavigationProp, 
  HealthCheckParams, 
  SymptomState, 
  BodyPart, 
  SymptomLevel 
} from './types';
import { bodyParts, symptomLevels } from './mock';

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

export default HealthCheckScreen;
