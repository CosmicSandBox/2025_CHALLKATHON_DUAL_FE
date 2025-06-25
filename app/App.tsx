import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { Colors } from './src/constants/colors';

// 딥링크 설정
const linking = {
  prefixes: [Linking.createURL('/'), 'dualapp://'],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
        },
      },
    },
  },
};

export default function App() {
  useEffect(() => {
    // 앱이 실행될 때 딥링크 처리
    const handleDeepLink = (url: string) => {
      console.log('Deep link received:', url);
    };

    // 초기 URL 확인
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    // URL 변경 리스너
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    return () => subscription?.remove();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          <NavigationContainer linking={linking}>
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
});