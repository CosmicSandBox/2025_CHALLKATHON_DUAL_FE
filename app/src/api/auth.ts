import { get, post, setAuthToken } from './client';
import { 
  API_ENDPOINTS, 
  KakaoAuthUrlResponse, 
  OAuthCallbackRequest, 
  OAuthCallbackResponse,
  OAuthProvidersResponse
} from './config';

// OAuth2 로그인 URL 조회
export const getOAuthUrl = async (provider: string): Promise<string> => {
  try {
    const endpoint = API_ENDPOINTS.AUTH.OAUTH_URL.replace('{provider}', provider);
    const response = await get<KakaoAuthUrlResponse>(endpoint);
    
    if (response.status === 'SUCCESS' && response.data?.authUrl) {
      return response.data.authUrl;
    } else {
      throw new Error(`Failed to get ${provider} auth URL`);
    }
  } catch (error) {
    console.error(`Error getting ${provider} auth URL:`, error);
    throw error;
  }
};

// 카카오 로그인 URL 가져오기 (호환성을 위한 기존 함수)
export const getKakaoAuthUrl = async (): Promise<string> => {
  return getOAuthUrl('kakao');
};

// OAuth2 콜백 처리
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

// 카카오 콜백 처리 (호환성을 위한 기존 함수)
export const processKakaoCallback = async (code: string): Promise<string> => {
  return processOAuthCallback('kakao', code);
};

// 지원 OAuth 제공자 목록 조회
export const getOAuthProviders = async (): Promise<string[]> => {
  try {
    const response = await get<OAuthProvidersResponse>(API_ENDPOINTS.AUTH.OAUTH_PROVIDERS);
    
    if (response.status === 'SUCCESS' && response.data?.providers) {
      return response.data.providers;
    } else {
      throw new Error('Failed to get OAuth providers');
    }
  } catch (error) {
    console.error('Error getting OAuth providers:', error);
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
