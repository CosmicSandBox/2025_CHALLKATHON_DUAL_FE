import { get, post } from './client';
import { 
  API_ENDPOINTS, 
  Exercise, 
  IndoorExerciseStatus, 
  OutdoorExerciseStatus, 
  WalkingExerciseRecord, 
  SimpleExerciseRecord, 
  ExerciseHistory,
  ExerciseHistoryParams
} from './config';

// 운동 목록 조회
export const getExerciseList = async (): Promise<Exercise[]> => {
  try {
    const response = await get<Exercise[]>(API_ENDPOINTS.EXERCISE.LIST);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to get exercise list');
    }
  } catch (error) {
    console.error('Error getting exercise list:', error);
    throw error;
  }
};

// 실내운동 현황 조회
export const getIndoorExerciseStatus = async (): Promise<IndoorExerciseStatus> => {
  try {
    const response = await get<IndoorExerciseStatus>(API_ENDPOINTS.EXERCISE.INDOOR_STATUS);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to get indoor exercise status');
    }
  } catch (error) {
    console.error('Error getting indoor exercise status:', error);
    throw error;
  }
};

// 실외운동 현황 조회
export const getOutdoorExerciseStatus = async (): Promise<OutdoorExerciseStatus> => {
  try {
    const response = await get<OutdoorExerciseStatus>(API_ENDPOINTS.EXERCISE.OUTDOOR_STATUS);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to get outdoor exercise status');
    }
  } catch (error) {
    console.error('Error getting outdoor exercise status:', error);
    throw error;
  }
};

// 가벼운 걷기 운동 기록
export const recordWalkingExercise = async (record: WalkingExerciseRecord): Promise<string> => {
  try {
    const response = await post<string>(API_ENDPOINTS.EXERCISE.RECORD_WALKING, record);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to record walking exercise');
    }
  } catch (error) {
    console.error('Error recording walking exercise:', error);
    throw error;
  }
};

// 일반 운동 기록
export const recordSimpleExercise = async (record: SimpleExerciseRecord): Promise<string> => {
  try {
    const response = await post<string>(API_ENDPOINTS.EXERCISE.RECORD_SIMPLE, record);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to record simple exercise');
    }
  } catch (error) {
    console.error('Error recording simple exercise:', error);
    throw error;
  }
};

// 운동 기록 조회
export const getExerciseHistory = async (params: ExerciseHistoryParams = {}): Promise<ExerciseHistory> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.exerciseType) {
      queryParams.append('exerciseType', params.exerciseType);
    }
    if (params.startDate) {
      queryParams.append('startDate', params.startDate);
    }
    if (params.endDate) {
      queryParams.append('endDate', params.endDate);
    }
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `${API_ENDPOINTS.EXERCISE.HISTORY}?${queryString}` : API_ENDPOINTS.EXERCISE.HISTORY;
    
    const response = await get<ExerciseHistory>(endpoint);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to get exercise history');
    }
  } catch (error) {
    console.error('Error getting exercise history:', error);
    throw error;
  }
};
