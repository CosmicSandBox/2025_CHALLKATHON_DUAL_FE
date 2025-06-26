import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import Card from '../../../components/common/Card';
import { 
  MainStackParamList,
  SymptomState,
  SymptomLevel,
  BodyPart,
  PainHistoryItem 
} from './types';
import { bodyParts, symptomLevels } from './mock';
import { usePainRecords } from '../../../hooks/usePainRecords';
import { recordPainManual } from '../../../api';
import { styles } from './PainRecordScreen.styled';

type PainRecordScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const PainRecordScreen: React.FC = () => {
  const navigation = useNavigation<PainRecordScreenNavigationProp>();
  const [selectedTab, setSelectedTab] = useState<'record' | 'history'>('record');
  const [symptoms, setSymptoms] = useState<SymptomState>({
    leg: null,
    knee: null,
    ankle: null,
    heel: null,
    back: null,
  });
  const [detailNotes, setDetailNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 통증 기록 조회용 날짜 범위 (최근 30일)
  const getDateRange = () => {
    const today = new Date();
    const endDate = today.toISOString().split('T')[0];
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const startDate = monthAgo.toISOString().split('T')[0];
    return { startDate, endDate };
  };

  const { startDate, endDate } = getDateRange();
  const { painHistory: painData, loading, error, refreshRecords } = usePainRecords({ startDate, endDate });

  if (loading && selectedTab === 'history') {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#666' }}>통증 기록을 불러오는 중...</Text>
      </SafeAreaView>
    );
  }

  const painHistory = painData?.painRecords || [];

  const handleSymptomSelect = (bodyPart: BodyPart, level: SymptomLevel) => {
    setSymptoms(prev => ({
      ...prev,
      [bodyPart]: prev[bodyPart] === level ? null : level
    }));
  };

  const getSelectedCount = () => {
    return Object.values(symptoms).filter(symptom => symptom !== null).length;
  };

  const handleSubmit = () => {
    const uncheckedParts = bodyParts.filter(part => !symptoms[part.id]);
    
    if (uncheckedParts.length > 0) {
      Alert.alert(
        '체크 미완료',
        `다음 부위의 상태를 체크해주세요:\n${uncheckedParts.map(part => part.name).join(', ')}`,
        [{ text: '확인' }]
      );
      return;
    }

    const severeSymptoms = bodyParts.filter(part => symptoms[part.id] === 'severe');
    
    if (severeSymptoms.length > 0) {
      Alert.alert(
        '주의 필요',
        `다음 부위에 심한 증상이 있습니다:\n${severeSymptoms.map(part => part.name).join(', ')}\n\n의료진과 상담을 권장합니다.`,
        [{ text: '확인', onPress: saveAndExit }]
      );
    } else {
      saveAndExit();
    }
  };

  const saveAndExit = async () => {
    try {
      setIsSubmitting(true);

      // 증상 레벨을 점수로 변환 (good: 0, mild: 1, moderate: 2, severe: 3)
      const levelToScore = (level: SymptomLevel | null): number => {
        if (!level) return 0;
        switch (level) {
          case 'good': return 0;
          case 'mild': return 1;
          case 'moderate': return 2;
          case 'severe': return 3;
          default: return 0;
        }
      };

      const painRecord = {
        legPainScore: levelToScore(symptoms.leg),
        kneePainScore: levelToScore(symptoms.knee),
        anklePainScore: levelToScore(symptoms.ankle),
        heelPainScore: levelToScore(symptoms.heel),
        backPainScore: levelToScore(symptoms.back),
        notes: detailNotes || undefined,
      };

      console.log('통증 기록 전송:', painRecord);
      
      const result = await recordPainManual(painRecord);
      console.log('통증 기록 성공:', result);

      Alert.alert(
        '기록 완료',
        result || '통증 기록이 저장되었습니다.',
        [{
          text: '확인',
          onPress: () => {
            setSymptoms({ leg: null, knee: null, ankle: null, heel: null, back: null });
            setDetailNotes('');
            setSelectedTab('history');
            // 히스토리 새로고침
            refreshRecords();
          }
        }]
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '통증 기록 저장에 실패했습니다.';
      console.error('통증 기록 저장 오류:', err);
      Alert.alert('저장 실패', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPainRecordTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <View style={styles.infoIcon}>
              <Feather name="heart" size={24} color="#3182F6" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>일일 통증 상태 기록</Text>
              <Text style={styles.infoDescription}>
                현재 느끼는 각 부위별 통증이나 불편함을 정확히 체크해주세요
              </Text>
            </View>
          </View>
        </Card>
      </View>

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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>상세 기록</Text>
        <Card style={styles.detailCard}>
          <Text style={styles.detailLabel}>그 밖에 느낀 점이나 특이사항</Text>
          <TextInput
            style={styles.detailInput}
            placeholder="예: 아침에 일어날 때 허리가 뻣뻣했거나, 특정 자세에서 불편함을 느꼈다면 자세히 적어주세요..."
            placeholderTextColor="#A3A8AF"
            value={detailNotes}
            onChangeText={setDetailNotes}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </Card>
      </View>

      <View style={styles.section}>
        <TouchableOpacity 
          style={[
            styles.submitButton,
            getSelectedCount() === bodyParts.length ? styles.submitButtonActive : styles.submitButtonInactive
          ]} 
          onPress={handleSubmit}
          disabled={getSelectedCount() < bodyParts.length || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              <Text style={[
                styles.submitButtonText,
                getSelectedCount() === bodyParts.length ? styles.submitButtonTextActive : styles.submitButtonTextInactive
              ]}>
                통증 상태 기록 완료
              </Text>
              <Feather 
                name="check" 
                size={20} 
                color={getSelectedCount() === bodyParts.length ? "#FFFFFF" : "#A3A8AF"} 
                style={styles.submitButtonIcon} 
              />
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderPainHistoryTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>통증 기록 히스토리</Text>
        <View style={styles.historyList}>
          {error ? (
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Text style={{ fontSize: 16, color: '#f44336', textAlign: 'center', marginBottom: 16 }}>
                통증 기록을 불러오는데 실패했습니다.
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#2196F3',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
                onPress={refreshRecords}
              >
                <Text style={{ color: 'white', fontSize: 16 }}>다시 시도</Text>
              </TouchableOpacity>
            </View>
          ) : painHistory.length === 0 ? (
            <View style={{ alignItems: 'center', padding: 40 }}>
              <Text style={{ fontSize: 48, marginBottom: 16 }}>📝</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>아직 기록된 통증이 없습니다</Text>
              <Text style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>
                '기록하기' 탭에서 첫 번째 통증을 기록해보세요
              </Text>
            </View>
          ) : (
            painHistory.map((item: any, index: number) => (
              <Card key={item.recordId || index} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <View style={styles.historyDate}>
                    <Text style={styles.historyDateText}>{item.recordDate}</Text>
                    <Text style={styles.historyTimeText}>{item.recordTime}</Text>
                  </View>
                  <View style={styles.historyBadges}>
                    {item.recordType === 'POST_EXERCISE' && (
                      <View style={styles.postExerciseBadge}>
                        <Text style={styles.postExerciseBadgeText}>운동 후</Text>
                      </View>
                    )}
                    <View style={[
                      styles.overallPainBadge,
                      { backgroundColor: item.totalPainScore <= 5 ? '#10B981' : item.totalPainScore <= 10 ? '#F59E0B' : '#EF4444' }
                    ]}>
                      <Text style={styles.overallPainBadgeText}>{item.totalPainScore}/15</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.historyRecords}>
                  <View style={styles.historyRecord}>
                    <Text style={styles.historyRecordIcon}>📝</Text>
                    <View style={styles.historyRecordInfo}>
                      <Text style={styles.historyRecordName}>
                        {item.notes || '상세 기록 없음'}
                      </Text>
                    </View>
                  </View>
                  
                  {/* 부위별 통증 점수 표시 */}
                  {item.painScores && (
                    <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F1F3F4' }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 }}>부위별 통증 점수</Text>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                        {[
                          { key: 'legPainScore', name: '다리', icon: '🦵' },
                          { key: 'kneePainScore', name: '무릎', icon: '🦴' },
                          { key: 'anklePainScore', name: '발목', icon: '🦶' },
                          { key: 'heelPainScore', name: '발뒤꿈치', icon: '👠' },
                          { key: 'backPainScore', name: '허리', icon: '🔴' },
                        ].map(part => (
                          <View 
                            key={part.key}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              backgroundColor: item.painScores[part.key] === 0 ? '#E8F5E8' : 
                                             item.painScores[part.key] <= 1 ? '#FEF3E2' : 
                                             item.painScores[part.key] <= 2 ? '#FEE8D5' : '#FEE8E8',
                              paddingHorizontal: 8,
                              paddingVertical: 4,
                              borderRadius: 6,
                              minWidth: 80,
                            }}
                          >
                            <Text style={{ fontSize: 12, marginRight: 4 }}>{part.icon}</Text>
                            <Text style={{ fontSize: 12, color: '#666', marginRight: 4 }}>{part.name}</Text>
                            <Text style={{ 
                              fontSize: 12, 
                              fontWeight: '600',
                              color: item.painScores[part.key] === 0 ? '#10B981' : 
                                     item.painScores[part.key] <= 1 ? '#F59E0B' : 
                                     item.painScores[part.key] <= 2 ? '#F97316' : '#EF4444'
                            }}>
                              {item.painScores[part.key]}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              </Card>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={28} color="#A3A8AF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>통증 기록</Text>
          <Text style={styles.headerSubtitle}>일일 통증 상태를 기록하고 관리하세요</Text>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {getSelectedCount()}/{bodyParts.length}
          </Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'record' && styles.tabActive]}
          onPress={() => setSelectedTab('record')}
        >
          <Text style={[styles.tabText, selectedTab === 'record' && styles.tabTextActive]}>
            기록하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'history' && styles.tabActive]}
          onPress={() => setSelectedTab('history')}
        >
          <Text style={[styles.tabText, selectedTab === 'history' && styles.tabTextActive]}>
            히스토리
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {selectedTab === 'record' ? renderPainRecordTab() : renderPainHistoryTab()}
      </View>
    </SafeAreaView>
  );
};

export default PainRecordScreen;