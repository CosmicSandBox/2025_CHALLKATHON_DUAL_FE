import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Button } from '../common/Button'
import { Typography } from '../common/Typography'
import { theme } from '../../styles/theme'
import { Footprints, Heart, Users } from 'lucide-react'

const HeroContainer = styled(motion.section)`
  padding: ${theme.spacing['6xl']} ${theme.spacing.xl} ${theme.spacing['5xl']};
  text-align: center;
  background: linear-gradient(135deg, ${theme.colors.primaryLight} 0%, ${theme.colors.white} 100%);
  position: relative;
  overflow: hidden;
`

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing['3xl']};
`

const Logo = styled(motion.div)`
  width: 64px;
  height: 64px;
  background: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: ${theme.shadow.lg};
`

const Title = styled(motion.div)`
  margin-bottom: ${theme.spacing.lg};
`

const Subtitle = styled(motion.div)`
  margin-bottom: ${theme.spacing['4xl']};
  max-width: 280px;
  margin-left: auto;
  margin-right: auto;
`

const ButtonContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing['4xl']};
`

const FeatureList = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  margin-top: ${theme.spacing['3xl']};
`

const FeatureItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex: 1;
`

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  box-shadow: ${theme.shadow.md};
`

const BackgroundDecoration = styled(motion.div)`
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, ${theme.colors.primary}20, ${theme.colors.primaryLight});
  border-radius: 50%;
  z-index: 0;
`

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

interface HeroProps {
  onSelectUserType: (type: 'patient' | 'guardian') => void
}

export const Hero: React.FC<HeroProps> = ({ onSelectUserType }) => {
  return (
    <HeroContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BackgroundDecoration
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <LogoContainer variants={itemVariants}>
        <Logo
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Footprints size={32} />
        </Logo>
        <Typography variant="h3" weight="700" color="primary">
          워크 메이트
        </Typography>
      </LogoContainer>

      <Title variants={itemVariants}>
        <Typography variant="h1" weight="700" align="center">
          다시 걷는 기쁨을<br />
          함께 찾아가요
        </Typography>
      </Title>

      <Subtitle variants={itemVariants}>
        <Typography variant="body1" color="secondary" align="center">
          AI 기반 맞춤형 재활치료로<br />
          건강한 보행을 되찾으세요
        </Typography>
      </Subtitle>

      <ButtonContainer variants={itemVariants}>
        <Button 
          variant="primary" 
          size="large" 
          fullWidth
          onClick={() => onSelectUserType('patient')}
        >
          환자로 시작하기
        </Button>
        <Button 
          variant="secondary" 
          size="large" 
          fullWidth
          onClick={() => onSelectUserType('guardian')}
        >
          보호자로 시작하기
        </Button>
      </ButtonContainer>

      <FeatureList variants={itemVariants}>
        <FeatureItem
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <FeatureIcon>
            <Footprints size={24} />
          </FeatureIcon>
          <Typography variant="caption" color="secondary" align="center">
            맞춤형<br />재활운동
          </Typography>
        </FeatureItem>
        
        <FeatureItem
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <FeatureIcon>
            <Heart size={24} />
          </FeatureIcon>
          <Typography variant="caption" color="secondary" align="center">
            실시간<br />건강관리
          </Typography>
        </FeatureItem>
        
        <FeatureItem
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <FeatureIcon>
            <Users size={24} />
          </FeatureIcon>
          <Typography variant="caption" color="secondary" align="center">
            가족과<br />함께
          </Typography>
        </FeatureItem>
      </FeatureList>
    </HeroContainer>
  )
}
