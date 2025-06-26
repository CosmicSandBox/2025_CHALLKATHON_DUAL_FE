import { useState, useEffect } from 'react';
import { 
  User, 
  UserProfileStatus, 
  PatientProfile,
  PatientLinkCodeResponse,
  getUserInfo, 
  getUserProfileStatus, 
  setPatientProfile,
  updateUserInfo,
  updatePatientInfo,
  generatePatientLinkCode
} from '../api';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profileStatus, setProfileStatus] = useState<UserProfileStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUserInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await getUserInfo();
      setUser(userData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '사용자 정보를 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('사용자 정보 로딩 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadProfileStatus = async () => {
    try {
      const statusData = await getUserProfileStatus();
      setProfileStatus(statusData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '프로필 상태를 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('프로필 상태 로딩 오류:', err);
    }
  };

  const createPatientProfile = async (profile: PatientProfile) => {
    try {
      setLoading(true);
      const result = await setPatientProfile(profile);
      await loadProfileStatus(); // 프로필 상태 새로고침
      return { success: true, message: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '환자 프로필 설정에 실패했습니다.';
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userInfo: { nickname?: string; profileImage?: string }) => {
    try {
      setLoading(true);
      const result = await updateUserInfo(userInfo);
      await loadUserInfo(); // 사용자 정보 새로고침
      return { success: true, message: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '사용자 정보 수정에 실패했습니다.';
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updatePatient = async (patientInfo: PatientProfile) => {
    try {
      setLoading(true);
      const result = await updatePatientInfo(patientInfo);
      await loadProfileStatus(); // 프로필 상태 새로고침
      return { success: true, message: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '환자 정보 수정에 실패했습니다.';
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const createLinkCode = async (): Promise<{ success: boolean; data?: PatientLinkCodeResponse; error?: string }> => {
    try {
      setLoading(true);
      const linkCode = await generatePatientLinkCode();
      return { success: true, data: linkCode };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '연동 코드 생성에 실패했습니다.';
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    await loadUserInfo();
    await loadProfileStatus();
  };

  useEffect(() => {
    const loadData = async () => {
      await loadUserInfo();
      await loadProfileStatus();
    };
    loadData();
  }, []);

  return {
    user,
    profileStatus,
    loading,
    error,
    createPatientProfile,
    updateUser,
    updatePatient,
    createLinkCode,
    refreshUser,
  };
};
