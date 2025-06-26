import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Button } from '../common/Button'
import { Typography } from '../common/Typography'
import { theme } from '../../styles/theme'
import { MessageCircle } from 'lucide-react'

const LoginContainer = styled(motion.section)`
  padding: ${theme.spacing['3xl']} ${theme.spacing.xl};
  background: ${theme.colors.white};
  border-top: 1px solid ${theme.colors.gray200};
`

const LoginContent = styled.div`
  text-align: center;
`

const KakaoLoginButton = styled(Button)`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: ${theme.spacing.lg};
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000'%3E%3Cpath d='M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3Z'/%3E%3C/svg%3E");
    background-size: contain;
  }
`

const TermsText = styled(motion.div)`
  margin-top: ${theme.spacing.lg};
`

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
}

interface LoginSectionProps {
  selectedUserType: 'patient' | 'guardian' | null
  onKakaoLogin: () => void
}

export const LoginSection: React.FC<LoginSectionProps> = ({ 
  selectedUserType, 
  onKakaoLogin 
}) => {
  if (!selectedUserType) return null

  const getUserTypeText = () => {
    return selectedUserType === 'patient' ? '환자' : '보호자'
  }

  return (
    <LoginContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <LoginContent>
        <motion.div variants={itemVariants}>
          <Typography variant="h4" weight="600" align="center">
            {getUserTypeText()}로 로그인
          </Typography>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          style={{ marginTop: theme.spacing.lg, marginBottom: theme.spacing['3xl'] }}
        >
          <Typography variant="body2" color="secondary" align="center">
            카카오 계정으로 간편하게 시작하세요
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <KakaoLoginButton
            variant="kakao"
            size="large"
            fullWidth
            onClick={onKakaoLogin}
          >
            <MessageCircle size={20} style={{ marginRight: '8px' }} />
            카카오로 시작하기
          </KakaoLoginButton>
        </motion.div>

        <TermsText variants={itemVariants}>
          <Typography variant="caption" color="tertiary" align="center">
            로그인 시 이용약관 및 개인정보처리방침에<br />
            동의하는 것으로 간주됩니다.
          </Typography>
        </TermsText>
      </LoginContent>
    </LoginContainer>
  )
}
