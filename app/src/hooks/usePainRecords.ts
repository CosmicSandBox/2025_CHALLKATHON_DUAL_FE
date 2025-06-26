import { useState, useEffect } from 'react';
import { HealthRecord, getRecentHealthRecords, HealthRecordRequest, saveHealthRecord } from '../api/health';

export const usePainRecords = () => {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getRecentHealthRecords();
      
      if (response.status === 'SUCCESS' && response.data) {
        setRecords(response.data);
      } else {
        throw new Error(response.message || '통증 기록을 불러오는데 실패했습니다.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '통증 기록을 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('통증 기록 로딩 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const savePainRecord = async (data: HealthRecordRequest) => {
    try {
      const response = await saveHealthRecord(data);
      
      if (response.status === 'SUCCESS') {
        // 새로운 기록 저장 후 목록 새로고침
        await loadRecords();
        return { success: true };
      } else {
        throw new Error(response.message || '통증 기록 저장에 실패했습니다.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '통증 기록 저장에 실패했습니다.';
      console.error('통증 기록 저장 오류:', err);
      return { success: false, error: errorMessage };
    }
  };

  const refreshRecords = () => {
    loadRecords();
  };

  useEffect(() => {
    loadRecords();
  }, []);

  return {
    records,
    loading,
    error,
    savePainRecord,
    refreshRecords,
  };
};
