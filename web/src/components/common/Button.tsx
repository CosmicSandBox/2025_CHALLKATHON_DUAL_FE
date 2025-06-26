import styled from 'styled-components'
import { theme } from '../../styles/theme'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'kakao'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.button1.fontWeight};
  transition: all ${theme.animation.duration.fast} ${theme.animation.easing.easeOut};
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          height: 36px;
          padding: 0 ${theme.spacing.lg};
          font-size: ${theme.typography.button2.fontSize};
        `
      case 'large':
        return `
          height: 56px;
          padding: 0 ${theme.spacing.xxl};
          font-size: ${theme.typography.button1.fontSize};
        `
      default:
        return `
          height: 48px;
          padding: 0 ${theme.spacing.xl};
          font-size: ${theme.typography.button1.fontSize};
        `
    }
  }}
  
  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.gray100};
          color: ${theme.colors.textPrimary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.gray200};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.gray300};
          }
        `
      case 'tertiary':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryLight};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.gray100};
          }
        `
      case 'kakao':
        return `
          background-color: ${theme.colors.kakao};
          color: ${theme.colors.black};
          
          &:hover:not(:disabled) {
            background-color: #FDD835;
          }
          
          &:active:not(:disabled) {
            background-color: #F9A825;
          }
        `
      default:
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryDark};
          }
          
          &:active:not(:disabled) {
            background-color: #1B5BC7;
          }
        `
    }
  }}
  
  ${({ fullWidth }) => fullWidth && `
    width: 100%;
  `}
  
  &:disabled {
    background-color: ${theme.colors.gray200};
    color: ${theme.colors.gray500};
    cursor: not-allowed;
  }
  
  /* 토스 스타일 리플 이펙트 */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:active:not(:disabled)::before {
    width: 300px;
    height: 300px;
  }
`

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  )
}
