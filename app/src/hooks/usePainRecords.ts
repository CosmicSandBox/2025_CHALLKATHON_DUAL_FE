import { useState, useEffect } from 'react';
import { PainHistory, getPainHistory } from '../api';

export const usePainRecords = (params?: {
  startDate?: string;
  endDate?: string;
}) => {
  const [painHistory, setPainHistory] = useState<PainHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPainHistory(params || {});
      setPainHistory(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '통증 기록을 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('통증 기록 로딩 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshRecords = () => {
    loadRecords();
  };

  useEffect(() => {
    loadRecords();
  }, [params?.startDate, params?.endDate]);

  return {
    painHistory,
    loading,
    error,
    refreshRecords,
  };
};
