import { get, post, put } from './client';
import { 
  API_ENDPOINTS, 
  LinkPatientRequest, 
  GuardianDashboard, 
  GuardianPatientDetail,
  GuardianNotificationList
} from './config';

// 환자 연동
export const linkPatient = async (linkRequest: LinkPatientRequest): Promise<string> => {
  try {
    const response = await post<string>(API_ENDPOINTS.GUARDIAN.LINK_PATIENT, linkRequest);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to link patient');
    }
  } catch (error) {
    console.error('Error linking patient:', error);
    throw error;
  }
};

// 보호자 메인페이지 조회
export const getGuardianDashboard = async (): Promise<GuardianDashboard> => {
  try {
    const response = await get<GuardianDashboard>(API_ENDPOINTS.GUARDIAN.DASHBOARD);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to get guardian dashboard');
    }
  } catch (error) {
    console.error('Error getting guardian dashboard:', error);
    throw error;
  }
};

// 환자 정보 페이지 조회
export const getGuardianPatientDetail = async (): Promise<GuardianPatientDetail> => {
  try {
    const response = await get<GuardianPatientDetail>(API_ENDPOINTS.GUARDIAN.PATIENT_DETAIL);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to get guardian patient detail');
    }
  } catch (error) {
    console.error('Error getting guardian patient detail:', error);
    throw error;
  }
};

// 알림 읽음 처리
export const markAlertAsRead = async (alertId: string): Promise<string> => {
  try {
    const endpoint = API_ENDPOINTS.GUARDIAN.ALERT_READ.replace('{alertId}', alertId);
    const response = await put<string>(endpoint);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to mark alert as read');
    }
  } catch (error) {
    console.error('Error marking alert as read:', error);
    throw error;
  }
};

// 보호자 알림 목록 조회
export const getGuardianNotifications = async (): Promise<GuardianNotificationList> => {
  try {
    const response = await get<GuardianNotificationList>(API_ENDPOINTS.GUARDIAN.NOTIFICATIONS);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to get guardian notifications');
    }
  } catch (error) {
    console.error('Error getting guardian notifications:', error);
    throw error;
  }
};

// 알림 읽음 표시
export const markNotificationAsRead = async (alertId: string): Promise<string> => {
  try {
    const endpoint = API_ENDPOINTS.GUARDIAN.ALERT_READ.replace('{alertId}', alertId);
    const response = await put<string>(endpoint, {});
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to mark notification as read');
    }
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};
