import { motion } from 'framer-motion'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 3px solid ${theme.colors.gray200};
  border-top: 3px solid ${theme.colors.primary};
  border-radius: 50%;
  margin-bottom: ${theme.spacing.lg};
`

const LoadingText = styled(motion.div)`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.body2.fontSize};
  font-weight: ${theme.typography.body2.fontWeight};
`

const spinAnimation = {
  rotate: 360,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
}

interface LoadingScreenProps {
  text?: string
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  text = '로딩 중...' 
}) => {
  return (
    <LoadingContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <LoadingSpinner
        animate={spinAnimation}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  )
}
