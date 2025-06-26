import { useState, useEffect } from 'react';
import { Exercise, getExerciseList } from '../api';

export const useExerciseList = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadExercises = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getExerciseList();
      setExercises(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '운동 목록을 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('운동 목록 로딩 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshExercises = () => {
    loadExercises();
  };

  useEffect(() => {
    loadExercises();
  }, []);

  return {
    exercises,
    loading,
    error,
    refreshExercises,
  };
};
