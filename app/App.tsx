import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { store, AppDispatch } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { Colors } from './src/constants/colors';
import { loadStoredAuthState } from './src/store/slices/authSlice';

function Bootstrapper() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadStoredAuthState());
  }, [dispatch]);
  return null;
}

export default function App() {
  return (
    <Provider store={store}>
      <Bootstrapper />
      <StatusBar style="dark" backgroundColor={Colors.background} />
      <RootNavigator />
    </Provider>
  );
}
