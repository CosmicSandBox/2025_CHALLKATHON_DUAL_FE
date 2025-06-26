import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Typography } from '../common/Typography'
import { Button } from '../common/Button'
import { theme } from '../../styles/theme'
import { ArrowLeft } from 'lucide-react'

const HeaderContainer = styled(motion.header)`
  position: sticky;
  top: 0;
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray200};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
`

const BackButton = styled(Button)`
  min-width: auto;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: ${theme.borderRadius.lg};
`

const HeaderTitle = styled.div`
  flex: 1;
`

interface NavigationHeaderProps {
  title?: string
  showBackButton?: boolean
  onBack?: () => void
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  showBackButton = false,
  onBack
}) => {
  return (
    <HeaderContainer
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {showBackButton && (
        <BackButton
          variant="tertiary"
          onClick={onBack}
        >
          <ArrowLeft size={20} />
        </BackButton>
      )}
      
      {title && (
        <HeaderTitle>
          <Typography variant="h5" weight="600">
            {title}
          </Typography>
        </HeaderTitle>
      )}
    </HeaderContainer>
  )
}
