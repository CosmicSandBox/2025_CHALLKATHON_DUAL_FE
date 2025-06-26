import { useState, useEffect } from 'react';
import { PatientDashboard, getPatientDashboard } from '../api';

export const usePatientDashboard = () => {
  const [dashboardData, setDashboardData] = useState<PatientDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPatientDashboard();
      setDashboardData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '대시보드 데이터를 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('대시보드 로딩 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshDashboard = () => {
    loadDashboard();
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    dashboardData,
    loading,
    error,
    refreshDashboard,
  };
};
