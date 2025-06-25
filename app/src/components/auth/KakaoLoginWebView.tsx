import React, { useRef } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';

interface KakaoLoginWebViewProps {
  visible: boolean;
  authUrl: string;
  onClose: () => void;
  onSuccess: (code: string) => void;
  onError: (error: string) => void;
}

const KakaoLoginWebView: React.FC<KakaoLoginWebViewProps> = ({
  visible,
  authUrl,
  onClose,
  onSuccess,
  onError,
}) => {
  const webViewRef = useRef<WebView>(null);

  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;
    
    // 콜백 URL 로깅만 하고 다른 URL은 로깅하지 않음
    if (url.includes('api.walkmate.klr.kr')) {
      console.log('🔄 Callback URL:', url);
    }

    // 카카오 콜백 URL 체크
    if (url.includes('api.walkmate.klr.kr') && url.includes('code=')) {
      const code = extractCodeFromUrl(url);
      if (code) {
        onSuccess(code);
        onClose();
      } else {
        console.error('Authorization code not found in URL:', url);
        onError('Authorization code not found');
      }
    }

    // 에러 처리
    if (url.includes('error=')) {
      const errorMatch = url.match(/error=([^&]+)/);
      const error = errorMatch ? errorMatch[1] : 'Login failed';
      onError(decodeURIComponent(error));
    }
  };

  const extractCodeFromUrl = (url: string): string | null => {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get('code');
    } catch (error) {
      // URL 파싱 실패 시 정규식으로 시도
      const codeMatch = url.match(/[?&]code=([^&]+)/);
      return codeMatch ? codeMatch[1] : null;
    }
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    
    // 404 에러는 리다이렉트 URL이므로 무시 (정상적인 플로우)
    if (nativeEvent.description?.includes('404') || nativeEvent.statusCode === 404) {
      console.log('✅ Redirect to callback URL (expected 404)');
      return;
    }
    
    console.error('WebView error:', nativeEvent);
    onError('Failed to load login page');
  };

  const handleHttpError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    
    // 404 에러는 리다이렉트 URL이므로 무시 (정상적인 플로우)
    if (nativeEvent.statusCode === 404 && nativeEvent.url?.includes('api.walkmate.klr.kr')) {
      console.log('✅ Successfully redirected to callback URL');
      return;
    }
    
    console.error('WebView HTTP error:', nativeEvent);
    onError('HTTP error occurred');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>카카오 로그인</Text>
        </View>
        
        <WebView
          ref={webViewRef}
          source={{ uri: authUrl }}
          onNavigationStateChange={handleNavigationStateChange}
          style={styles.webView}
          startInLoadingState
          scalesPageToFit
          javaScriptEnabled
          domStorageEnabled
          onError={handleError}
          onHttpError={handleHttpError}
          // 불필요한 로깅 최소화
          originWhitelist={['*']}
          mixedContentMode="compatibility"
          allowsInlineMediaPlayback
          allowsProtectedMedia
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.paddingLarge,
    paddingVertical: Spacing.padding,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  closeButton: {
    marginRight: Spacing.componentSpacing,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  webView: {
    flex: 1,
  },
});

export default KakaoLoginWebView;