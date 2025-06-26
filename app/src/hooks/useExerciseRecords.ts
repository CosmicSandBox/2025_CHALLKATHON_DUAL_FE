import { useState, useEffect } from 'react';
import { ExerciseHistory, getExerciseHistory } from '../api';

export const useExerciseRecords = (params?: {
  exerciseType?: 'INDOOR' | 'OUTDOOR';
  startDate?: string;
  endDate?: string;
}) => {
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getExerciseHistory(params || {});
      setExerciseHistory(data);
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
  }, [params?.exerciseType, params?.startDate, params?.endDate]);

  return {
    exerciseHistory,
    loading,
    error,
    refreshRecords,
  };
};
