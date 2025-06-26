import { useState, useEffect } from 'react';
import { Exercise, ExerciseListResponse, getIndoorExercises } from '../api/exercise';
import { Alert } from 'react-native';

export const useIndoorExercises = () => {
  const [exerciseData, setExerciseData] = useState<ExerciseListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadExercises = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getIndoorExercises();
      
      if (response.status === 'SUCCESS' && response.data) {
        setExerciseData(response.data);
      } else {
        throw new Error(response.message || '운동 목록을 불러오는데 실패했습니다.');
      }
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
    exerciseData,
    loading,
    error,
    refreshExercises,
  };
};
