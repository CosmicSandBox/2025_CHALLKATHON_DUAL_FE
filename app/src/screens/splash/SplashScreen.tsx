import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';

const SplashScreen = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity }]}>
        <Text style={styles.logoText}>D</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  logoContainer: {
    padding: 20,
    backgroundColor: Colors.primary,
    borderRadius: 30,
  },
  logoText: {
    ...Typography.h1,
    fontSize: 80,
    fontWeight: 'bold',
    color: Colors.background,
  },
});

export default SplashScreen; 