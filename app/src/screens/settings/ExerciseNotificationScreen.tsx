import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
    Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {Colors} from '../../constants/colors';

// 메인페이지에서 사용하는 실제 초록 색상에 맞춤
const AppColors = {
    primary: '#4CAF50',      // 메인 초록색 (실내운동 카드 테두리색)
    primaryLight: '#E8F5E8', // 연한 초록색 배경 (실내운동 카드 배경색)
    success: '#10B981',      // 상태 표시용 초록색 (상태 점 색상)
    background: '#F8F9FA',   // 배경색
    cardBg: '#FFFFFF',       // 카드 배경색
    text: '#1F2937',         // 기본 텍스트
    textSecondary: '#6B7280', // 보조 텍스트
    textLight: '#9CA3AF',    // 연한 텍스트
    border: '#E5E7EB',       // 테두리
    borderLight: '#F3F4F6',  // 연한 테두리
};

interface NotificationTime {
    id: string;
    time: string;
    enabled: boolean;
}

interface ExerciseNotificationScreenProps {
    navigation: any;
}

export default function ExerciseNotificationScreen({navigation}: ExerciseNotificationScreenProps) {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [reminderTimes, setReminderTimes] = useState<NotificationTime[]>([
        {id: '1', time: '08:00', enabled: true},
        {id: '2', time: '14:00', enabled: true},
        {id: '3', time: '19:00', enabled: false},
    ]);
    const [reminderFrequency, setReminderFrequency] = useState('daily');
    const [motivationalMessages, setMotivationalMessages] = useState(true);
    const [weekendNotifications, setWeekendNotifications] = useState(false);

    const handleAddReminderTime = () => {
        Alert.alert(
            '알림 시간 추가',
            '새로운 운동 알림 시간을 추가하시겠습니까?',
            [
                {text: '취소', style: 'cancel'},
                {
                    text: '추가',
                    onPress: () => {
                        const newTime: NotificationTime = {
                            id: Date.now().toString(),
                            time: '12:00',
                            enabled: true,
                        };
                        setReminderTimes([...reminderTimes, newTime]);
                    }
                },
            ]
        );
    };

    const toggleReminderTime = (id: string) => {
        setReminderTimes(reminderTimes.map(time =>
            time.id === id ? {...time, enabled: !time.enabled} : time
        ));
    };

    const deleteReminderTime = (id: string) => {
        Alert.alert(
            '알림 삭제',
            '이 알림 시간을 삭제하시겠습니까?',
            [
                {text: '취소', style: 'cancel'},
                {
                    text: '삭제',
                    style: 'destructive',
                    onPress: () => {
                        setReminderTimes(reminderTimes.filter(time => time.id !== id));
                    }
                },
            ]
        );
    };

    const frequencyOptions = [
        {key: 'daily', label: '매일', icon: 'calendar'},
        {key: 'weekdays', label: '평일만', icon: 'business'},
        {key: 'custom', label: '사용자 정의', icon: 'settings'},
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={AppColors.text}/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>운동 알림 설정</Text>
                <View style={styles.placeholder}/>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Main Toggle */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="notifications" size={24} color={AppColors.primary}/>
                        </View>
                        <View style={styles.sectionTitleContainer}>
                            <Text style={styles.sectionTitle}>운동 알림</Text>
                            <Text style={styles.sectionSubtitle}>규칙적인 운동을 위한 알림을 받아보세요</Text>
                        </View>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{false: '#E5E7EB', true: AppColors.primaryLight}}
                            thumbColor={notificationsEnabled ? AppColors.primary : '#9CA3AF'}
                        />
                    </View>
                </View>

                {notificationsEnabled && (
                    <>
                        {/* Reminder Times */}
                        <View style={styles.section}>
                            <View style={styles.sectionTitleRow}>
                                <Text style={styles.sectionTitle}>알림 시간</Text>
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={handleAddReminderTime}
                                >
                                    <Ionicons name="add" size={20} color="#FFFFFF"/>
                                </TouchableOpacity>
                            </View>

                            {reminderTimes.map((time, index) => (
                                <View key={time.id} style={styles.timeItem}>
                                    <View style={styles.timeInfo}>
                                        <View style={styles.timeIconContainer}>
                                            <Ionicons name="time" size={20} color={AppColors.primary}/>
                                        </View>
                                        <View style={styles.timeTextContainer}>
                                            <Text style={styles.timeText}>{time.time}</Text>
                                            <Text style={styles.timeSubtext}>
                                                {index === 0 ? '아침 운동' : index === 1 ? '점심 운동' : '저녁 운동'}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.timeControls}>
                                        <Switch
                                            value={time.enabled}
                                            onValueChange={() => toggleReminderTime(time.id)}
                                            trackColor={{false: '#E5E7EB', true: AppColors.primaryLight}}
                                            thumbColor={time.enabled ? AppColors.primary : '#9CA3AF'}
                                            style={styles.timeSwitch}
                                        />
                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={() => deleteReminderTime(time.id)}
                                        >
                                            <Ionicons name="trash-outline" size={18} color="#F44336"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Frequency Settings */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>알림 빈도</Text>
                            {frequencyOptions.map((option) => (
                                <TouchableOpacity
                                    key={option.key}
                                    style={[
                                        styles.frequencyOption,
                                        reminderFrequency === option.key && styles.frequencyOptionSelected
                                    ]}
                                    onPress={() => setReminderFrequency(option.key)}
                                >
                                    <View style={styles.frequencyIconContainer}>
                                        <Ionicons
                                            name={option.icon as any}
                                            size={22}
                                            color={reminderFrequency === option.key ? "#FFFFFF" : AppColors.primary}
                                        />
                                    </View>
                                    <Text style={[
                                        styles.frequencyText,
                                        reminderFrequency === option.key && styles.frequencyTextSelected
                                    ]}>
                                        {option.label}
                                    </Text>
                                    {reminderFrequency === option.key && (
                                        <Ionicons name="checkmark" size={20} color="#FFFFFF"/>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Additional Settings */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>추가 설정</Text>

                            <View style={styles.settingItem}>
                                <View style={styles.settingInfo}>
                                    <Ionicons name="heart" size={22} color={AppColors.primary}/>
                                    <View style={styles.settingTextContainer}>
                                        <Text style={styles.settingText}>동기부여 메시지</Text>
                                        <Text style={styles.settingSubtext}>알림과 함께 격려 메시지를 받아보세요</Text>
                                    </View>
                                </View>
                                <Switch
                                    value={motivationalMessages}
                                    onValueChange={setMotivationalMessages}
                                    trackColor={{false: '#E5E7EB', true: AppColors.primaryLight}}
                                    thumbColor={motivationalMessages ? AppColors.primary : '#9CA3AF'}
                                />
                            </View>

                            <View style={styles.settingItem}>
                                <View style={styles.settingInfo}>
                                    <Ionicons name="calendar-outline" size={22} color={AppColors.primary}/>
                                    <View style={styles.settingTextContainer}>
                                        <Text style={styles.settingText}>주말 알림</Text>
                                        <Text style={styles.settingSubtext}>주말에도 운동 알림을 받아보세요</Text>
                                    </View>
                                </View>
                                <Switch
                                    value={weekendNotifications}
                                    onValueChange={setWeekendNotifications}
                                    trackColor={{false: '#E5E7EB', true: AppColors.primaryLight}}
                                    thumbColor={weekendNotifications ? AppColors.primary : '#9CA3AF'}
                                />
                            </View>
                        </View>

                        {/* Preview Card */}
                        <View style={styles.previewSection}>
                            <Text style={styles.sectionTitle}>알림 미리보기</Text>
                            <View style={styles.previewCard}>
                                <View style={styles.previewHeader}>
                                    <Ionicons name="fitness" size={28} color={AppColors.primary}/>
                                    <Text style={styles.previewTitle}>운동 시간이에요! 💪</Text>
                                </View>
                                <Text style={styles.previewMessage}>
                                    {motivationalMessages
                                        ? "건강한 하루를 위해 운동을 시작해보세요! 당신은 할 수 있어요!"
                                        : "운동할 시간입니다."
                                    }
                                </Text>
                                <View style={styles.previewActions}>
                                    <TouchableOpacity style={styles.previewButton}>
                                        <Text style={styles.previewButtonText}>지금 시작</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.previewButtonSecondary}>
                                        <Text style={styles.previewButtonSecondaryText}>나중에</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>

            {/* Save Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>설정 저장</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.border,
        backgroundColor: AppColors.background,
    },
    backButton: {
        padding: 8,
        borderRadius: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: AppColors.text,
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    section: {
        marginTop: 24,
        backgroundColor: AppColors.cardBg,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: AppColors.border,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: AppColors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    sectionTitleContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: AppColors.text,
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 13,
        color: AppColors.textLight,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    addButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: AppColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: AppColors.primary,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    timeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.border,
    },
    timeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    timeIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: AppColors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    timeTextContainer: {
        flex: 1,
    },
    timeText: {
        fontSize: 16,
        fontWeight: '500',
        color: AppColors.text,
    },
    timeSubtext: {
        fontSize: 13,
        color: AppColors.textLight,
        marginTop: 2,
    },
    timeControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeSwitch: {
        marginRight: 8,
    },
    deleteButton: {
        padding: 8,
    },
    frequencyOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: AppColors.border,
        backgroundColor: AppColors.cardBg,
    },
    frequencyOptionSelected: {
        backgroundColor: AppColors.primary,
        borderColor: AppColors.primary,
    },
    frequencyIconContainer: {
        marginRight: 12,
    },
    frequencyText: {
        flex: 1,
        fontSize: 15,
        color: AppColors.text,
    },
    frequencyTextSelected: {
        color: "#FFFFFF",
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.border,
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingTextContainer: {
        marginLeft: 12,
        flex: 1,
    },
    settingText: {
        fontSize: 15,
        fontWeight: '500',
        color: AppColors.text,
    },
    settingSubtext: {
        fontSize: 13,
        color: AppColors.textLight,
        marginTop: 2,
    },
    previewSection: {
        marginTop: 24,
        marginBottom: 20,
    },
    previewCard: {
        backgroundColor: AppColors.primaryLight,
        borderRadius: 16,
        padding: 20,
        borderWidth: 2,
        borderColor: AppColors.primary,
        marginTop: 12,
    },
    previewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    previewTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: AppColors.text,
        marginLeft: 8,
    },
    previewMessage: {
        fontSize: 14,
        color: AppColors.textSecondary,
        lineHeight: 20,
        marginBottom: 16,
    },
    previewActions: {
        flexDirection: 'row',
        gap: 8,
    },
    previewButton: {
        backgroundColor: AppColors.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    previewButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: '500',
    },
    previewButtonSecondary: {
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: AppColors.border,
        flex: 1,
        alignItems: 'center',
    },
    previewButtonSecondaryText: {
        color: AppColors.textSecondary,
        fontSize: 14,
        fontWeight: '500',
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: AppColors.borderLight,
        backgroundColor: AppColors.background,
    },
    saveButton: {
        backgroundColor: AppColors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: AppColors.primary,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: '600',
    },
});
