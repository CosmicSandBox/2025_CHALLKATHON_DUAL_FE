import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { type ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  padding?: boolean
  background?: 'white' | 'gray'
}

const Container = styled.div<{ padding: boolean; background: string }>`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ background }) => 
    background === 'gray' ? theme.colors.backgroundSecondary : theme.colors.background
  };
  
  ${({ padding }) => padding && `
    padding: ${theme.spacing.xl};
  `}
  
  /* 안전 영역 고려 */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
`

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  padding = true,
  background = 'white'
}) => {
  return (
    <Container padding={padding} background={background}>
      {children}
    </Container>
  )
}
