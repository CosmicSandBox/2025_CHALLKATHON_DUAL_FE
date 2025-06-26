import { useState, useEffect } from 'react';
import { 
  GuardianDashboard, 
  GuardianPatientDetail,
  LinkPatientRequest,
  linkPatient,
  getGuardianDashboard,
  getGuardianPatientDetail,
  markAlertAsRead
} from '../api';

export const useGuardian = () => {
  const [dashboard, setDashboard] = useState<GuardianDashboard | null>(null);
  const [patientDetail, setPatientDetail] = useState<GuardianPatientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getGuardianDashboard();
      setDashboard(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '보호자 대시보드를 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('보호자 대시보드 로딩 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadPatientDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getGuardianPatientDetail();
      setPatientDetail(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '환자 상세 정보를 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('환자 상세 정보 로딩 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const connectPatient = async (linkCode: string) => {
    try {
      setLoading(true);
      const linkRequest: LinkPatientRequest = { patientLinkCode: linkCode };
      const result = await linkPatient(linkRequest);
      await loadDashboard(); // 연동 후 대시보드 새로고침
      return { success: true, message: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '환자 연동에 실패했습니다.';
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const readAlert = async (alertId: string) => {
    try {
      const result = await markAlertAsRead(alertId);
      await loadDashboard(); // 알림 읽음 후 대시보드 새로고침
      return { success: true, message: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알림 읽기에 실패했습니다.';
      return { success: false, error: errorMessage };
    }
  };

  const refreshDashboard = () => {
    loadDashboard();
  };

  const refreshPatientDetail = () => {
    loadPatientDetail();
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    dashboard,
    patientDetail,
    loading,
    error,
    connectPatient,
    readAlert,
    loadPatientDetail,
    refreshDashboard,
    refreshPatientDetail,
  };
};
