import { get, post, put, del } from './client';
import { 
  API_ENDPOINTS, 
  User, 
  UserProfileStatus, 
  PatientProfile,
  PatientLinkCodeResponse,
  UpdateUserInfoRequest,
  UpdatePatientInfoRequest
} from './config';

// 사용자 정보 조회
export const getUserInfo = async (): Promise<User> => {
  try {
    const response = await get<User>(API_ENDPOINTS.USER.INFO);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to get user info');
    }
  } catch (error) {
    console.error('Error getting user info:', error);
    throw error;
  }
};

// 사용자 프로필 상태 조회
export const getUserProfileStatus = async (): Promise<UserProfileStatus> => {
  try {
    const response = await get<UserProfileStatus>(API_ENDPOINTS.USER.PROFILE_STATUS);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to get user profile status');
    }
  } catch (error) {
    console.error('Error getting user profile status:', error);
    throw error;
  }
};

// 환자 프로필 설정
export const setPatientProfile = async (profile: PatientProfile): Promise<string> => {
  try {
    const response = await post<string>(API_ENDPOINTS.USER.PATIENT_PROFILE, profile);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to set patient profile');
    }
  } catch (error) {
    console.error('Error setting patient profile:', error);
    throw error;
  }
};

// 사용자 기본 정보 수정
export const updateUserInfo = async (updateData: UpdateUserInfoRequest): Promise<string> => {
  try {
    const response = await put<string>(API_ENDPOINTS.USER.INFO, updateData);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to update user info');
    }
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
};

// 환자 정보 수정
export const updatePatientInfo = async (updateData: UpdatePatientInfoRequest): Promise<string> => {
  try {
    const response = await put<string>(API_ENDPOINTS.USER.PATIENT_INFO, updateData);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to update patient info');
    }
  } catch (error) {
    console.error('Error updating patient info:', error);
    throw error;
  }
};

// 환자 연동 코드 생성
export const generatePatientLinkCode = async (): Promise<PatientLinkCodeResponse> => {
  try {
    const response = await post<PatientLinkCodeResponse>(API_ENDPOINTS.USER.PATIENT_LINK_CODE);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to generate patient link code');
    }
  } catch (error) {
    console.error('Error generating patient link code:', error);
    throw error;
  }
};

// 사용자 계정 삭제
export const deleteUser = async (): Promise<string> => {
  try {
    const response = await del<string>(API_ENDPOINTS.USER.DELETE);
    
    if (response.status === 'SUCCESS' && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


