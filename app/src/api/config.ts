// API 기본 설정
export const API_BASE_URL = 'https://api.walkmate.klr.kr/api/v1';

export const API_ENDPOINTS = {
  AUTH: {
    KAKAO_URL: '/auth/oauth/kakao/url',
    OAUTH_CALLBACK: '/auth/oauth/callback',
  },
} as const;

// API 응답 타입 정의
export interface ApiResponse<T> {
  data: T;
  message: string | null;
  status: 'SUCCESS' | 'ERROR';
  action: string | null;
}

// 카카오 로그인 URL 응답 타입
export interface KakaoAuthUrlResponse {
  authUrl: string;
  provider: string;
}

// OAuth 콜백 요청 타입
export interface OAuthCallbackRequest {
  provider: string;
  code: string;
}

// OAuth 콜백 응답 타입
export interface OAuthCallbackResponse {
  message: string;
  token: string;
}

// 카카오 리다이렉트 URI (실제 API에서 설정된 것과 일치해야 함)
export const KAKAO_REDIRECT_URI = 'https://api.walkmate.klr.kr/login/oauth2/code/kakao';
