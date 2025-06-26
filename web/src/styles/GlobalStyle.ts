import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyle = createGlobalStyle`
  /* 폰트 import */
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.background};
    color: ${theme.colors.textPrimary};
    line-height: 1.5;
    
    /* 모바일 전용 스타일 */
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }

  #root {
    width: 100%;
    max-width: ${theme.layout.maxWidth};
    min-height: 100vh;
    background-color: ${theme.colors.white};
    position: relative;
    box-shadow: ${theme.shadow.xl};
    
    /* 모바일에서는 전체 화면 */
    @media (max-width: 768px) {
      max-width: 100%;
      box-shadow: none;
    }
  }

  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.gray100};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray300};
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.gray400};
  }

  /* 기본 링크 스타일 */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* 기본 버튼 스타일 */
  button {
    font-family: inherit;
    border: none;
    cursor: pointer;
    outline: none;
    background: none;
  }

  /* 기본 입력 스타일 */
  input, textarea {
    font-family: inherit;
    border: none;
    outline: none;
    background: none;
  }

  /* 기본 리스트 스타일 */
  ul, ol {
    list-style: none;
  }

  /* 이미지 기본 스타일 */
  img {
    max-width: 100%;
    height: auto;
  }

  /* 텍스트 선택 스타일 */
  ::selection {
    background-color: ${theme.colors.primaryLight};
    color: ${theme.colors.primaryDark};
  }

  /* 포커스 스타일 */
  *:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  /* 애니메이션 기본 설정 */
  * {
    transition: color ${theme.animation.duration.fast} ${theme.animation.easing.easeOut},
                background-color ${theme.animation.duration.fast} ${theme.animation.easing.easeOut},
                border-color ${theme.animation.duration.fast} ${theme.animation.easing.easeOut},
                transform ${theme.animation.duration.normal} ${theme.animation.easing.easeInOut},
                opacity ${theme.animation.duration.normal} ${theme.animation.easing.easeInOut};
  }

  /* 터치 디바이스 최적화 */
  @media (pointer: coarse) {
    button, 
    [role="button"],
    input[type="submit"],
    input[type="button"] {
      min-height: 44px;
      min-width: 44px;
    }
  }

  /* 다크모드 지원 준비 */
  @media (prefers-color-scheme: dark) {
    /* 향후 다크모드 스타일 추가 */
  }

  /* 접근성 개선 */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`
