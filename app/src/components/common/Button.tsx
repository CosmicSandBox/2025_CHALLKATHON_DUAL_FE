import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: Spacing.buttonRadius,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    switch (size) {
      case 'small':
        baseStyle.height = 36;
        baseStyle.paddingHorizontal = Spacing.paddingSmall;
        break;
      case 'large':
        baseStyle.height = 56;
        baseStyle.paddingHorizontal = Spacing.paddingLarge;
        break;
      default:
        baseStyle.height = Spacing.buttonHeight;
        baseStyle.paddingHorizontal = Spacing.padding;
    }

    switch (variant) {
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: Colors.secondary,
          borderWidth: 1,
          borderColor: Colors.primary,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: Colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: Colors.primary,
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...Typography.button,
    };

    switch (size) {
      case 'small':
        baseStyle.fontSize = Typography.buttonSmall.fontSize;
        baseStyle.lineHeight = Typography.buttonSmall.lineHeight;
        break;
      case 'large':
        baseStyle.fontSize = Typography.bodyLarge.fontSize;
        baseStyle.lineHeight = Typography.bodyLarge.lineHeight;
        break;
    }

    switch (variant) {
      case 'secondary':
      case 'outline':
        return {
          ...baseStyle,
          color: Colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          color: Colors.primary,
        };
      default:
        return {
          ...baseStyle,
          color: Colors.textWhite,
        };
    }
  };

  const getDisabledStyle = (): ViewStyle => {
    if (disabled) {
      return {
        opacity: 0.5,
      };
    }
    return {};
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), getDisabledStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.textWhite : Colors.primary}
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Button; 