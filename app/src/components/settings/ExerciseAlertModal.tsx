import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Card from '../common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ExerciseAlertModalProps {
  visible: boolean;
  onClose: () => void;
}

type TimeSlot = {
  id: string;
  hour: number;
  minute: number;
  label: string;
  enabled: boolean;
};

type DayOfWeek = {
  id: string;
  name: string;
  shortName: string;
  enabled: boolean;
};

const ExerciseAlertModal: React.FC<ExerciseAlertModalProps> = ({ visible, onClose }) => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [reminderFrequency, setReminderFrequency] = useState<'daily' | 'weekly' | 'custom'>('daily');
  
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: 'morning', hour: 9, minute: 0, label: '아침', enabled: true },
    { id: 'afternoon', hour: 14, minute: 0, label: '오후', enabled: false },
    { id: 'evening', hour: 19, minute: 0, label: '저녁', enabled: true },
  ]);

  const [daysOfWeek, setDaysOfWeek] = useState<DayOfWeek[]>([
    { id: 'monday', name: '월요일', shortName: '월', enabled: true },
    { id: 'tuesday', name: '화요일', shortName: '화', enabled: true },
    { id: 'wednesday', name: '수요일', shortName: '수', enabled: true },
    { id: 'thursday', name: '목요일', shortName: '목', enabled: true },
    { id: 'friday', name: '금요일', shortName: '금', enabled: true },
    { id: 'saturday', name: '토요일', shortName: '토', enabled: false },
    { id: 'sunday', name: '일요일', shortName: '일', enabled: false },
  ]);

  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? '오후' : '오전';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${period} ${displayHour}:${minute.toString().padStart(2, '0')}`;
  };

  const handleTimeSlotToggle = (id: string) => {
    setTimeSlots(prev => 
      prev.map(slot => 
        slot.id === id ? { ...slot, enabled: !slot.enabled } : slot
      )
    );
  };

  const handleDayToggle = (id: string) => {
    setDaysOfWeek(prev => 
      prev.map(day => 
        day.id === id ? { ...day, enabled: !day.enabled } : day
      )
    );
  };

  const handleTimeEdit = (id: string) => {
    Alert.alert(
      '시간 설정',
      '알림 시간을 변경하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '변경',
          onPress: () => {
            // 시간 선택 피커 로직 (추후 구현)
            console.log('시간 선택 피커 열기:', id);
          }
        }
      ]
    );
  };

  const handleSave = () => {
    const enabledTimes = timeSlots.filter(slot => slot.enabled);
    const enabledDays = daysOfWeek.filter(day => day.enabled);

    if (alertsEnabled && enabledTimes.length === 0) {
      Alert.alert('알림 시간 필요', '최소 한 개의 알림 시간을 설정해주세요.');
      return;
    }

    if (alertsEnabled && reminderFrequency !== 'daily' && enabledDays.length === 0) {
      Alert.alert('요일 선택 필요', '알림을 받을 요일을 선택해주세요.');
      return;
    }

    // 설정 저장 로직
    console.log('운동 알림 설정 저장:', {
      alertsEnabled,
      reminderFrequency,
      timeSlots: enabledTimes,
      daysOfWeek: enabledDays,
    });

    Alert.alert(
      '설정 완료',
      '운동 알림이 설정되었습니다.',
      [{ text: '확인', onPress: onClose }]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>운동 알림 설정</Text>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>저장</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* 알림 활성화 */}
          <View style={styles.section}>
            <Card style={styles.card}>
              <View style={styles.mainToggle}>
                <View style={styles.toggleContent}>
                  <View style={styles.toggleIcon}>
                    <Feather name="bell" size={24} color={alertsEnabled ? '#3182F6' : '#9CA3AF'} />
                  </View>
                  <View style={styles.toggleText}>
                    <Text style={styles.toggleTitle}>운동 알림</Text>
                    <Text style={styles.toggleSubtitle}>
                      {alertsEnabled ? '알림이 활성화되어 있습니다' : '알림이 비활성화되어 있습니다'}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={alertsEnabled}
                  onValueChange={setAlertsEnabled}
                  trackColor={{ false: '#E5E7EB', true: '#3182F6' + '40' }}
                  thumbColor={alertsEnabled ? '#3182F6' : '#9CA3AF'}
                />
              </View>
            </Card>
          </View>

          {alertsEnabled && (
            <>
              {/* 알림 빈도 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>알림 빈도</Text>
                <Card style={styles.card}>
                  <View style={styles.frequencyOptions}>
                    {[
                      { id: 'daily', label: '매일', description: '매일 정해진 시간에 알림' },
                      { id: 'weekly', label: '주간', description: '선택한 요일에만 알림' },
                      { id: 'custom', label: '사용자 설정', description: '요일과 시간을 자유롭게 설정' },
                    ].map((option) => (
                      <TouchableOpacity
                        key={option.id}
                        style={[
                          styles.frequencyOption,
                          reminderFrequency === option.id && styles.selectedOption
                        ]}
                        onPress={() => setReminderFrequency(option.id as any)}
                      >
                        <View style={styles.frequencyContent}>
                          <Text style={[
                            styles.frequencyLabel,
                            reminderFrequency === option.id && styles.selectedText
                          ]}>
                            {option.label}
                          </Text>
                          <Text style={[
                            styles.frequencyDescription,
                            reminderFrequency === option.id && styles.selectedDescription
                          ]}>
                            {option.description}
                          </Text>
                        </View>
                        <View style={[
                          styles.radioButton,
                          reminderFrequency === option.id && styles.selectedRadio
                        ]}>
                          {reminderFrequency === option.id && (
                            <View style={styles.radioButtonInner} />
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </Card>
              </View>

              {/* 알림 시간 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>알림 시간</Text>
                <Card style={styles.card}>
                  <View style={styles.timeSlotsList}>
                    {timeSlots.map((slot, index) => (
                      <View key={slot.id}>
                        <View style={styles.timeSlot}>
                          <View style={styles.timeSlotContent}>
                            <View style={styles.timeSlotInfo}>
                              <Text style={styles.timeSlotLabel}>{slot.label}</Text>
                              <TouchableOpacity onPress={() => handleTimeEdit(slot.id)}>
                                <Text style={styles.timeSlotTime}>
                                  {formatTime(slot.hour, slot.minute)}
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <Switch
                              value={slot.enabled}
                              onValueChange={() => handleTimeSlotToggle(slot.id)}
                              trackColor={{ false: '#E5E7EB', true: '#3182F6' + '40' }}
                              thumbColor={slot.enabled ? '#3182F6' : '#9CA3AF'}
                            />
                          </View>
                        </View>
                        {index < timeSlots.length - 1 && <View style={styles.divider} />}
                      </View>
                    ))}
                  </View>
                </Card>
              </View>

              {/* 요일 설정 (주간 또는 사용자 설정일 때만) */}
              {(reminderFrequency === 'weekly' || reminderFrequency === 'custom') && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>알림 요일</Text>
                  <Card style={styles.card}>
                    <View style={styles.daysGrid}>
                      {daysOfWeek.map((day) => (
                        <TouchableOpacity
                          key={day.id}
                          style={[
                            styles.dayButton,
                            day.enabled && styles.selectedDayButton
                          ]}
                          onPress={() => handleDayToggle(day.id)}
                        >
                          <Text style={[
                            styles.dayButtonText,
                            day.enabled && styles.selectedDayText
                          ]}>
                            {day.shortName}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </Card>
                </View>
              )}

              {/* 알림 미리보기 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>알림 미리보기</Text>
                <Card style={styles.previewCard}>
                  <View style={styles.previewNotification}>
                    <View style={styles.previewIcon}>
                      <Feather name="activity" size={20} color="#3182F6" />
                    </View>
                    <View style={styles.previewContent}>
                      <Text style={styles.previewTitle}>운동 시간이에요! 💪</Text>
                      <Text style={styles.previewMessage}>
                        오늘의 재활 운동을 시작해보세요. 건강한 하루를 만들어가요!
                      </Text>
                    </View>
                  </View>
                </Card>
              </View>

              {/* 추가 설정 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>추가 설정</Text>
                <Card style={styles.card}>
                  <TouchableOpacity style={styles.additionalOption}>
                    <View style={styles.additionalOptionContent}>
                      <Text style={styles.additionalOptionTitle}>알림음 설정</Text>
                      <Text style={styles.additionalOptionSubtitle}>기본음</Text>
                    </View>
                    <Text style={styles.settingArrow}>›</Text>
                  </TouchableOpacity>
                  
                  <View style={styles.divider} />
                  
                  <TouchableOpacity style={styles.additionalOption}>
                    <View style={styles.additionalOptionContent}>
                      <Text style={styles.additionalOptionTitle}>진동 설정</Text>
                      <Text style={styles.additionalOptionSubtitle}>사용함</Text>
                    </View>
                    <Text style={styles.settingArrow}>›</Text>
                  </TouchableOpacity>
                </Card>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#3182F6',
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingVertical: 20,
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  card: {
    padding: 20,
  },
  mainToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  toggleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  toggleText: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  toggleSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  frequencyOptions: {
    gap: 12,
  },
  frequencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#EBF4FF',
    borderColor: '#3182F6',
  },
  frequencyContent: {
    flex: 1,
  },
  frequencyLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  frequencyDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectedText: {
    color: '#1F2937',
  },
  selectedDescription: {
    color: '#3182F6',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    borderColor: '#3182F6',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3182F6',
  },
  timeSlotsList: {
    gap: 0,
  },
  timeSlot: {
    paddingVertical: 4,
  },
  timeSlotContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeSlotInfo: {
    flex: 1,
  },
  timeSlotLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  timeSlotTime: {
    fontSize: 14,
    color: '#3182F6',
    fontWeight: '500',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  dayButton: {
    width: (screenWidth - 80) / 7 - 4,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedDayButton: {
    backgroundColor: '#3182F6',
    borderColor: '#3182F6',
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  previewCard: {
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  previewNotification: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  previewIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  previewContent: {
    flex: 1,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  previewMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  additionalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  additionalOptionContent: {
    flex: 1,
  },
  additionalOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  additionalOptionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingArrow: {
    fontSize: 20,
    color: '#9CA3AF',
    fontWeight: '300',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
});

export default ExerciseAlertModal;