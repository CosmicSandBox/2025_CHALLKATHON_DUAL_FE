import { useState, useEffect } from 'react';
import { OutdoorExerciseStatus, getOutdoorExerciseStatus } from '../api';

export const useOutdoorExercise = () => {
  const [outdoorStatus, setOutdoorStatus] = useState<OutdoorExerciseStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOutdoorStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOutdoorExerciseStatus();
      setOutdoorStatus(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '실외운동 현황을 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('실외운동 현황 로딩 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshOutdoorStatus = () => {
    loadOutdoorStatus();
  };

  useEffect(() => {
    loadOutdoorStatus();
  }, []);

  return {
    outdoorStatus,
    loading,
    error,
    refreshOutdoorStatus,
  };
};
