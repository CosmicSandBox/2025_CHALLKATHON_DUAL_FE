import { get, post } from './client';
import { API_ENDPOINTS, PainRecord, PainHistory, PainHistoryParams } from './config';

// 수동 통증 기록
export const recordPainManual = async (painRecord: PainRecord): Promise<string> => {
  try {
    const response = await post<string>(API_ENDPOINTS.HEALTH.PAIN_RECORD, painRecord);
    
    if (response.status === 'SUCCESS') {
      // data가 null일 수 있으므로 기본 성공 메시지 반환
      return response.data || '통증 기록이 성공적으로 저장되었습니다.';
    } else {
      throw new Error('Failed to record manual pain');
    }
  } catch (error) {
    console.error('Error recording manual pain:', error);
    throw error;
  }
};

// 운동 후 통증 기록
export const recordPainAfterExercise = async (painRecord: PainRecord): Promise<string> => {
  try {
    const response = await post<string>(API_ENDPOINTS.HEALTH.PAIN_RECORD_AFTER_EXERCISE, painRecord);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to record pain after exercise');
    }
  } catch (error) {
    console.error('Error recording pain after exercise:', error);
    throw error;
  }
};

// 통증 기록 히스토리
export const getPainHistory = async (params: PainHistoryParams = {}): Promise<PainHistory> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.startDate) {
      queryParams.append('startDate', params.startDate);
    }
    if (params.endDate) {
      queryParams.append('endDate', params.endDate);
    }
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `${API_ENDPOINTS.HEALTH.PAIN_HISTORY}?${queryString}` : API_ENDPOINTS.HEALTH.PAIN_HISTORY;
    
    const response = await get<PainHistory>(endpoint);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to get pain history');
    }
  } catch (error) {
    console.error('Error getting pain history:', error);
    throw error;
  }
};
