import { getKakaoAuthUrl, processOAuthCallback } from '../api';

export interface KakaoLoginResult {
  success: boolean;
  token?: string;
  error?: string;
}

export class KakaoService {
  // 카카오 로그인 URL 가져오기
  static async getAuthUrl(): Promise<string> {
    try {
      const authUrl = await getKakaoAuthUrl();
      console.log('🔗 카카오 인증 URL 생성 완료');
      return authUrl;
    } catch (error) {
      console.error('❌ 카카오 인증 URL 생성 실패:', error);
      throw error;
    }
  }

  // 인가 코드로 토큰 받기
  static async exchangeCodeForToken(code: string): Promise<KakaoLoginResult> {
    try {
      console.log('🔄 인가 코드를 토큰으로 교환 중...');
      const token = await processOAuthCallback('kakao', code);
      console.log('✅ 토큰 획득 성공');
      
      return {
        success: true,
        token,
      };
    } catch (error) {
      console.error('❌ 토큰 교환 실패:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get token',
      };
    }
  }

  // 테스트용 메소드 - 카카오 인증 URL 생성 확인
  static async testGetAuthUrl(): Promise<string> {
    try {
      const authUrl = await getKakaoAuthUrl();
      console.log('🧪 테스트 - 카카오 인증 URL:', authUrl);
      return authUrl;
    } catch (error) {
      console.error('🧪 테스트 실패:', error);
      throw error;
    }
  }
}