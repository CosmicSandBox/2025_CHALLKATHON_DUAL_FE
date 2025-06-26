import { useState } from 'react';
import { PainRecord, recordPainManual, recordPainAfterExercise } from '../api';

export const useHealthRecord = () => {
  const [loading, setLoading] = useState(false);

  const submitPainRecord = async (
    painData: PainRecord,
    recordType: 'manual' | 'after-exercise' = 'manual'
  ) => {
    try {
      setLoading(true);

      let result: string;
      if (recordType === 'after-exercise') {
        result = await recordPainAfterExercise(painData);
      } else {
        result = await recordPainManual(painData);
      }

      return { success: true, message: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '통증 기록 저장에 실패했습니다.';
      console.error('통증 기록 저장 오류:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const submitManualPainRecord = async (painData: PainRecord) => {
    return submitPainRecord(painData, 'manual');
  };

  const submitPainRecordAfterExercise = async (painData: PainRecord) => {
    return submitPainRecord(painData, 'after-exercise');
  };

  return {
    loading,
    submitPainRecord,
    submitManualPainRecord,
    submitPainRecordAfterExercise,
  };
};
