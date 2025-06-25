import { get, post, setAuthToken } from './client';
import { 
  API_ENDPOINTS, 
  KakaoAuthUrlResponse, 
  OAuthCallbackRequest, 
  OAuthCallbackResponse 
} from './config';

// 카카오 로그인 URL 가져오기
export const getKakaoAuthUrl = async (): Promise<string> => {
  try {
    const response = await get<KakaoAuthUrlResponse>(API_ENDPOINTS.AUTH.KAKAO_URL);
    
    if (response.status === 'SUCCESS' && response.data?.authUrl) {
      return response.data.authUrl;
    } else {
      throw new Error('Failed to get Kakao auth URL');
    }
  } catch (error) {
    console.error('Error getting Kakao auth URL:', error);
    throw error;
  }
};

// OAuth 콜백 처리 (인가 코드로 토큰 받기)
export const processOAuthCallback = async (
  provider: string,
  code: string
): Promise<string> => {
  try {
    const requestBody: OAuthCallbackRequest = {
      provider,
      code,
    };

    const response = await post<OAuthCallbackResponse>(
      API_ENDPOINTS.AUTH.OAUTH_CALLBACK,
      requestBody
    );

    if (response.status === 'SUCCESS' && response.data?.token) {
      const token = response.data.token;
      // 전역 API 클라이언트에 토큰 설정
      setAuthToken(token);
      return token;
    } else {
      throw new Error('Failed to process OAuth callback');
    }
  } catch (error) {
    console.error('Error processing OAuth callback:', error);
    throw error;
  }
};

// 로그아웃 (토큰 제거)
export const logout = () => {
  setAuthToken(null);
};

// 토큰 복원 (앱 재시작 시 등)
export const restoreAuthToken = (token: string) => {
  setAuthToken(token);
};
