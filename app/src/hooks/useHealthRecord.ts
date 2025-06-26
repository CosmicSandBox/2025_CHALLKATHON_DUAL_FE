import { useState } from 'react';
import { HealthRecordRequest, saveHealthRecord } from '../api/health';
import { ExerciseRecordRequest, saveExerciseRecord } from '../api/exercise';
import { Alert } from 'react-native';

export const useHealthRecord = () => {
  const [loading, setLoading] = useState(false);

  const submitHealthRecord = async (
    healthData: HealthRecordRequest,
    exerciseData?: ExerciseRecordRequest
  ) => {
    try {
      setLoading(true);

      // 먼저 운동 기록 저장 (있는 경우)
      if (exerciseData) {
        const exerciseResponse = await saveExerciseRecord(exerciseData);
        if (exerciseResponse.status !== 'SUCCESS') {
          throw new Error('운동 기록 저장에 실패했습니다.');
        }
      }

      // 건강 기록 저장
      const healthResponse = await saveHealthRecord(healthData);
      if (healthResponse.status !== 'SUCCESS') {
        throw new Error('건강 기록 저장에 실패했습니다.');
      }

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '기록 저장에 실패했습니다.';
      console.error('기록 저장 오류:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    submitHealthRecord,
  };
};
