import { get } from './client';
import { API_ENDPOINTS, PatientDashboard } from './config';

// 환자 메인페이지 조회
export const getPatientDashboard = async (): Promise<PatientDashboard> => {
  try {
    const response = await get<PatientDashboard>(API_ENDPOINTS.DASHBOARD.PATIENT);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to get patient dashboard');
    }
  } catch (error) {
    console.error('Error getting patient dashboard:', error);
    throw error;
  }
};
