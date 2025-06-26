export const theme = {
  colors: {
    // 토스 블루 계열
    primary: '#3182F6',
    primaryLight: '#E8F3FF',
    primaryDark: '#1B64DA',
    
    // 토스 그레이 시스템
    gray900: '#191F28',
    gray800: '#333D4B',
    gray700: '#4E5968',
    gray600: '#6B7684',
    gray500: '#8B95A1',
    gray400: '#B0B8C1',
    gray300: '#D1D6DB',
    gray200: '#E5E8EB',
    gray100: '#F2F4F6',
    gray50: '#F9FAFB',
    
    // 기본 색상
    white: '#FFFFFF',
    black: '#000000',
    
    // 상태 색상
    success: '#10C878',
    warning: '#FF8F00',
    error: '#E92C2C',
    
    // 배경
    background: '#FFFFFF',
    backgroundSecondary: '#F9FAFB',
    
    // 텍스트
    textPrimary: '#191F28',
    textSecondary: '#4E5968',
    textTertiary: '#8B95A1',
    
    // 카카오 브랜드 컬러
    kakao: '#FEE500',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '48px',
    '6xl': '64px',
  },
  
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '20px',
    full: '9999px',
  },
  
  shadow: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  typography: {
    // 헤딩
    h1: {
      fontSize: '32px',
      fontWeight: '700',
      lineHeight: '1.25',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '28px',
      fontWeight: '700',
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '1.33',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: '1.4',
    },
    h5: {
      fontSize: '18px',
      fontWeight: '600',
      lineHeight: '1.44',
    },
    h6: {
      fontSize: '16px',
      fontWeight: '600',
      lineHeight: '1.5',
    },
    
    // 본문
    body1: {
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '1.5',
    },
    body2: {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '1.43',
    },
    body3: {
      fontSize: '13px',
      fontWeight: '400',
      lineHeight: '1.46',
    },
    
    // 캡션
    caption: {
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '1.33',
    },
    
    // 버튼
    button1: {
      fontSize: '16px',
      fontWeight: '600',
      lineHeight: '1.5',
    },
    button2: {
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '1.43',
    },
  },
  
  // 모바일 전용 레이아웃
  layout: {
    maxWidth: '375px',
    minHeight: '100vh',
    padding: '20px',
  },
  
  // 애니메이션
  animation: {
    duration: {
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
}

export type Theme = typeof theme
