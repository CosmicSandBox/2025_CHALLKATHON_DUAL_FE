import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  helperStyle?: TextStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  helperStyle,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyle = (): ViewStyle => {
    return {
      marginBottom: Spacing.componentSpacing,
    };
  };

  const getInputContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: Spacing.inputRadius,
      paddingHorizontal: Spacing.padding,
      height: Spacing.buttonHeight,
      backgroundColor: Colors.background,
    };

    if (error) {
      baseStyle.borderColor = Colors.error;
    } else if (isFocused) {
      baseStyle.borderColor = Colors.primary;
    } else {
      baseStyle.borderColor = Colors.border;
    }

    return baseStyle;
  };

  const getInputStyle = (): TextStyle => {
    return {
      flex: 1,
      ...Typography.body,
      color: Colors.textPrimary,
      paddingVertical: 0,
    };
  };

  const getLabelStyle = (): TextStyle => {
    return {
      ...Typography.bodySmall,
      color: Colors.textSecondary,
      marginBottom: Spacing.xs,
    };
  };

  const getErrorStyle = (): TextStyle => {
    return {
      ...Typography.caption,
      color: Colors.error,
      marginTop: Spacing.xs,
    };
  };

  const getHelperStyle = (): TextStyle => {
    return {
      ...Typography.caption,
      color: Colors.textLight,
      marginTop: Spacing.xs,
    };
  };

  return (
    <View style={[getContainerStyle(), containerStyle]}>
      {label && (
        <Text style={[getLabelStyle(), labelStyle]}>{label}</Text>
      )}
      
      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <View style={styles.iconContainer}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={[getInputStyle(), inputStyle, style]}
          placeholderTextColor={Colors.textLight}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {rightIcon && (
          <View style={styles.iconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && (
        <Text style={[getErrorStyle(), errorStyle]}>{error}</Text>
      )}
      
      {helperText && !error && (
        <Text style={[getHelperStyle(), helperStyle]}>{helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginHorizontal: Spacing.xs,
  },
});

export default Input; 