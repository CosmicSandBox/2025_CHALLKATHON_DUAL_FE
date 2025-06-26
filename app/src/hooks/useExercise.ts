import { useState } from 'react';
import { 
  WalkingExerciseRecord,
  SimpleExerciseRecord,
  recordWalkingExercise,
  recordSimpleExercise
} from '../api';

export const useExercise = () => {
  const [loading, setLoading] = useState(false);

  const recordWalking = async (record: WalkingExerciseRecord) => {
    try {
      setLoading(true);
      const result = await recordWalkingExercise(record);
      return { success: true, message: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '걷기 운동 기록에 실패했습니다.';
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const recordSimple = async (record: SimpleExerciseRecord) => {
    try {
      setLoading(true);
      const result = await recordSimpleExercise(record);
      return { success: true, message: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '운동 기록에 실패했습니다.';
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    recordWalking,
    recordSimple,
  };
};
