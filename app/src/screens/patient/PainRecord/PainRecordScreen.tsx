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
import { bodyParts, symptomLevels, mockPainHistory } from './mock';
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
  const [painHistory] = useState<PainHistoryItem[]>(mockPainHistory);

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

export default PainRecordScreen;