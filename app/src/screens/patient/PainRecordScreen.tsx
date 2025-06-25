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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import Card from '../../components/common/Card';
import { Colors } from '../../constants/colors';

type MainStackParamList = {
  MainTabs: undefined;
  PainRecord: undefined;
  ExerciseHistory: undefined;
};

type PainRecordScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;
type SymptomLevel = 'good' | 'mild' | 'moderate' | 'severe';
type BodyPart = 'leg' | 'knee' | 'ankle' | 'heel' | 'back';

interface SymptomState {
  [key: string]: SymptomLevel | null;
}

interface PainHistoryItem {
  id: string;
  date: string;
  time: string;
  overallPain: number;
  symptoms: SymptomState;
  notes?: string;
  isPostExercise: boolean;
}

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
  
  const [painHistory] = useState<PainHistoryItem[]>([
    {
      id: '1',
      date: '2024-01-15',
      time: '09:30',
      overallPain: 3,
      symptoms: { knee: 'moderate', back: 'mild', leg: 'good', ankle: 'good', heel: 'good' },
      notes: '실내 운동 후 무릎이 조금 뻣뻣함',
      isPostExercise: true,
    },
    {
      id: '2',
      date: '2024-01-14',
      time: '20:15',
      overallPain: 2,
      symptoms: { back: 'mild', knee: 'mild', leg: 'good', ankle: 'good', heel: 'good' },
      notes: '전반적으로 컨디션 양호',
      isPostExercise: false,
    },
  ]);

  const bodyParts = [
    { id: 'leg', name: '다리', icon: '🦵', description: '허벅지, 종아리 근육' },
    { id: 'knee', name: '무릎', icon: '🦴', description: '무릎 관절 및 주변' },
    { id: 'ankle', name: '발목', icon: '🦶', description: '발목 관절 및 인대' },
    { id: 'heel', name: '뒷꿈치', icon: '👠', description: '뒷꿈치 및 발바닥' },
    { id: 'back', name: '허리', icon: '🏃‍♂️', description: '허리 및 등 부위' },
  ];

  const symptomLevels = [
    { id: 'good', name: '양호', color: '#10B981', bgColor: '#E8F5E8', description: '통증이나 불편함이 없음' },
    { id: 'mild', name: '경미', color: '#F59E0B', bgColor: '#FEF7E6', description: '약간의 불편함 있음' },
    { id: 'moderate', name: '보통', color: '#F97316', bgColor: '#FFF7ED', description: '중간 정도의 통증' },
    { id: 'severe', name: '심함', color: '#EF4444', bgColor: '#FEE2E2', description: '심한 통증이나 불편함' },
  ];

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

  const saveAndExit = () => {
    Alert.alert(
      '기록 완료',
      '통증 기록이 저장되었습니다.',
      [{
        text: '확인',
        onPress: () => {
          setSymptoms({ leg: null, knee: null, ankle: null, heel: null, back: null });
          setDetailNotes('');
          setSelectedTab('history');
        }
      }]
    );
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
          disabled={getSelectedCount() < bodyParts.length}
        >
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
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderPainHistoryTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>통증 기록 히스토리</Text>
        <View style={styles.historyList}>
          {painHistory.map((item) => (
            <Card key={item.id} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <View style={styles.historyDate}>
                  <Text style={styles.historyDateText}>{item.date}</Text>
                  <Text style={styles.historyTimeText}>{item.time}</Text>
                </View>
                <View style={styles.historyBadges}>
                  {item.isPostExercise && (
                    <View style={styles.postExerciseBadge}>
                      <Text style={styles.postExerciseBadgeText}>운동 후</Text>
                    </View>
                  )}
                  <View style={[
                    styles.overallPainBadge,
                    { backgroundColor: item.overallPain <= 3 ? '#10B981' : item.overallPain <= 6 ? '#F59E0B' : '#EF4444' }
                  ]}>
                    <Text style={styles.overallPainBadgeText}>{item.overallPain}/10</Text>
                  </View>
                </View>
              </View>

              <View style={styles.historyRecords}>
                {Object.entries(item.symptoms).map(([partId, symptom]) => {
                  if (!symptom) return null;
                  const bodyPart = bodyParts.find(bp => bp.id === partId);
                  const symptomLevel = symptomLevels.find(sl => sl.id === symptom);
                  
                  return (
                    <View key={partId} style={styles.historyRecord}>
                      <Text style={styles.historyRecordIcon}>{bodyPart?.icon}</Text>
                      <View style={styles.historyRecordInfo}>
                        <Text style={styles.historyRecordName}>
                          {bodyPart?.name}: {symptomLevel?.name}
                        </Text>
                      </View>
                      <View style={[
                        styles.historyRecordBadge,
                        { backgroundColor: symptomLevel?.color }
                      ]}>
                        <Text style={styles.historyRecordBadgeText}>●</Text>
                      </View>
                    </View>
                  );
                })}
              </View>

              {item.notes && (
                <View style={styles.historyNotes}>
                  <Text style={styles.historyNotesLabel}>메모:</Text>
                  <Text style={styles.historyNotesText}>{item.notes}</Text>
                </View>
              )}
            </Card>
          ))}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 24, paddingBottom: 16, backgroundColor: '#F8F9FA' },
  backButton: { marginRight: 8 },
  headerTextContainer: { flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#222', marginBottom: 2 },
  headerSubtitle: { fontSize: 14, color: '#A3A8AF', fontWeight: '400' },
  progressContainer: { backgroundColor: '#3182F6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  progressText: { fontSize: 12, fontWeight: '600', color: '#FFFFFF' },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: Colors.primary },
  tabText: { fontSize: 16, fontWeight: '500', color: '#A3A8AF' },
  tabTextActive: { color: Colors.primary, fontWeight: '600' },
  content: { flex: 1, paddingHorizontal: 20 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  infoCard: { padding: 20 },
  infoHeader: { flexDirection: 'row', alignItems: 'center' },
  infoIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E8F4FD', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  infoContent: { flex: 1 },
  infoTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 4 },
  infoDescription: { fontSize: 14, color: '#6B7280', lineHeight: 20 },
  legendCard: { padding: 16 },
  legendContainer: { gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: 12, height: 12, borderRadius: 6, marginRight: 12 },
  legendName: { fontSize: 14, fontWeight: '600', color: '#1F2937', width: 50, marginRight: 12 },
  legendDescription: { fontSize: 13, color: '#6B7280', flex: 1 },
  bodyPartsContainer: { gap: 16 },
  bodyPartCard: { padding: 20 },
  bodyPartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  bodyPartInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  bodyPartIcon: { fontSize: 24, marginRight: 12 },
  bodyPartText: { flex: 1 },
  bodyPartName: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 2 },
  bodyPartDescription: { fontSize: 13, color: '#6B7280' },
  selectedIndicator: { backgroundColor: '#E8F5E8', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  selectedText: { fontSize: 12, fontWeight: '600', color: '#10B981' },
  symptomButtons: { flexDirection: 'row', gap: 8 },
  symptomButton: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, borderRadius: 12, alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },
  symptomButtonText: { fontSize: 12, fontWeight: '600' },
  detailCard: { padding: 20 },
  detailLabel: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 12 },
  detailInput: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16, fontSize: 14, color: '#1F2937', minHeight: 100, borderWidth: 1, borderColor: '#E5E7EB' },
  submitButton: { borderRadius: 12, paddingVertical: 16, paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  submitButtonActive: { backgroundColor: '#3182F6', shadowColor: '#3182F6' },
  submitButtonInactive: { backgroundColor: '#F3F4F6', shadowColor: '#000', shadowOpacity: 0.1 },
  submitButtonText: { fontSize: 16, fontWeight: '700', marginRight: 8 },
  submitButtonTextActive: { color: '#FFFFFF' },
  submitButtonTextInactive: { color: '#A3A8AF' },
  submitButtonIcon: { marginLeft: 4 },
  historyList: { gap: 16 },
  historyCard: { padding: 16 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  historyDate: { flex: 1 },
  historyDateText: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  historyTimeText: { fontSize: 14, color: '#6B7280' },
  historyBadges: { flexDirection: 'row', gap: 8 },
  postExerciseBadge: { backgroundColor: '#E8F5E8', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  postExerciseBadgeText: { fontSize: 12, fontWeight: '500', color: '#10B981' },
  overallPainBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  overallPainBadgeText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  historyRecords: { gap: 8, marginBottom: 12 },
  historyRecord: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  historyRecordIcon: { fontSize: 16, marginRight: 8 },
  historyRecordInfo: { flex: 1 },
  historyRecordName: { fontSize: 14, fontWeight: '500', color: '#1F2937' },
  historyRecordBadge: { width: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  historyRecordBadgeText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  historyNotes: { backgroundColor: '#F9FAFB', borderRadius: 8, padding: 12, marginTop: 8 },
  historyNotesLabel: { fontSize: 13, fontWeight: '500', color: '#6B7280', marginBottom: 4 },
  historyNotesText: { fontSize: 14, color: '#1F2937', lineHeight: 20 },
});

export default PainRecordScreen;