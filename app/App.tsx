import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Updates from 'expo-updates';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { Colors } from './src/constants/colors';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  useEffect(() => {
    // 앱 초기화 로직
    const initializeApp = async () => {
      try {
        // 개발 환경이 아니고 Updates가 활성화된 경우에만 업데이트 확인
        if (!__DEV__ && Updates.isEnabled) {
          console.log('Checking for updates...');
          setUpdateStatus('업데이트를 확인하는 중...');
          
          const update = await Updates.checkForUpdateAsync();
          
          if (update.isAvailable) {
            console.log('Update available, downloading...');
            setUpdateStatus('업데이트를 다운로드하는 중...');
            
            await Updates.fetchUpdateAsync();
            
            console.log('Update downloaded, reloading...');
            setUpdateStatus('업데이트를 적용하는 중...');
            
            // 잠깐 기다린 후 앱 재시작
            setTimeout(() => {
              Updates.reloadAsync();
            }, 1000);
            return;
          } else {
            console.log('No updates available');
            setUpdateStatus(null);
          }
        }

        // 앱 준비 완료
        setIsReady(true);
        setUpdateStatus(null);
      } catch (error) {
        console.log('App initialization or update error:', error);
        // 오류가 발생해도 앱을 계속 실행
        setIsReady(true);
        setUpdateStatus(null);
      }
    };

    initializeApp();
  }, []);

  // 업데이트 중이거나 앱이 준비되지 않았으면 로딩 화면 표시
  if (!isReady || updateStatus) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>
          {updateStatus || '앱을 시작하는 중...'}
        </Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
});
