import { API_BASE_URL, ApiResponse } from './config';

// 전역 토큰 저장소
let authToken: string | null = null;

// 토큰 설정 함수
export const setAuthToken = (token: string | null) => {
  authToken = token;
};

// 토큰 가져오기 함수
export const getAuthToken = (): string | null => {
  return authToken;
};

// 기본 fetch 래퍼
export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // 인증 토큰이 있으면 Authorization 헤더 추가
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
    console.log('🔑 API 요청에 토큰 포함:', endpoint, '- 토큰:', authToken.substring(0, 20) + '...');
  } else {
    console.log('⚠️ API 요청에 토큰 없음:', endpoint);
  }

  try {
    console.log('📡 API 요청:', options.method || 'GET', url);
    
    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log('📊 API 응답 상태:', response.status, endpoint);
    // API 응답 본문 로그
    if (response.status >= 200 && response.status < 300) {
      const responseBody = await response.text();
      console.log('📄 API 응답 본문:', responseBody);
      // JSON 파싱 시도
      try {
        return JSON.parse(responseBody) as ApiResponse<T>;
      } catch (jsonError) {
        console.error('❗️ JSON 파싱 오류:', jsonError);
        throw new Error('응답 본문이 JSON 형식이 아닙니다.');
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ API request failed:', error);
    throw error;
  }
};

// GET 요청
export const get = <T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> => {
  return apiClient<T>(endpoint, { method: 'GET', ...options });
};

// POST 요청
export const post = <T>(
  endpoint: string,
  body?: any,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  return apiClient<T>(endpoint, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });
};

// PUT 요청
export const put = <T>(
  endpoint: string,
  body?: any,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  return apiClient<T>(endpoint, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });
};

// DELETE 요청
export const del = <T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> => {
  return apiClient<T>(endpoint, { method: 'DELETE', ...options });
};
