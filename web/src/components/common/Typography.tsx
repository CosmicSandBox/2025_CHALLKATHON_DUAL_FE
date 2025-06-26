import styled from 'styled-components'
import { theme } from '../../styles/theme'

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'body3' | 'caption'
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning'
  align?: 'left' | 'center' | 'right'
  weight?: '400' | '500' | '600' | '700'
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const StyledTypography = styled.div<TypographyProps>`
  ${({ variant = 'body1' }) => theme.typography[variant]}
  
  color: ${({ color }) => {
    switch (color) {
      case 'secondary':
        return theme.colors.textSecondary
      case 'tertiary':
        return theme.colors.textTertiary
      case 'error':
        return theme.colors.error
      case 'success':
        return theme.colors.success
      case 'warning':
        return theme.colors.warning
      default:
        return theme.colors.textPrimary
    }
  }};
  
  text-align: ${({ align = 'left' }) => align};
  
  ${({ weight }) => weight && `font-weight: ${weight};`}
  
  /* 반응형 텍스트 크기 */
  @media (max-width: 480px) {
    ${({ variant }) => {
      if (variant === 'h1') {
        return `font-size: 28px;`
      }
      if (variant === 'h2') {
        return `font-size: 24px;`
      }
      if (variant === 'h3') {
        return `font-size: 20px;`
      }
      return ''
    }}
  }
`

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color = 'primary',
  align = 'left',
  weight,
  children,
  className,
  style,
  ...props
}) => {
  const getHtmlTag = () => {
    if (variant.startsWith('h')) return variant
    return 'div'
  }

  return (
    <StyledTypography
      as={getHtmlTag()}
      variant={variant}
      color={color}
      align={align}
      weight={weight}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </StyledTypography>
  )
}
