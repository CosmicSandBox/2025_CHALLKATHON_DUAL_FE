import { useState, useEffect } from 'react';
import { ExerciseRecord, getExerciseRecords } from '../api/exercise';

export const useExerciseRecords = (startDate?: string, endDate?: string) => {
  const [records, setRecords] = useState<ExerciseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getExerciseRecords(startDate, endDate);
      
      if (response.status === 'SUCCESS' && response.data) {
        setRecords(response.data);
      } else {
        throw new Error(response.message || '운동 기록을 불러오는데 실패했습니다.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '운동 기록을 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('운동 기록 로딩 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshRecords = () => {
    loadRecords();
  };

  useEffect(() => {
    loadRecords();
  }, [startDate, endDate]);

  return {
    records,
    loading,
    error,
    refreshRecords,
  };
};
