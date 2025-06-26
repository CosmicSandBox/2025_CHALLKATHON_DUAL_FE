import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Button } from '../common/Button'
import { Typography } from '../common/Typography'
import { theme } from '../../styles/theme'
import { useRef } from 'react'
import { 
  Footprints, 
  Heart, 
  Users, 
  Smartphone,
  Star,
  Download,
  ArrowDown
} from 'lucide-react'

const LandingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.primaryLight} 0%, ${theme.colors.white} 50%, ${theme.colors.gray50} 100%);
`

const HeroSection = styled(motion.section)`
  padding: ${theme.spacing['6xl']} ${theme.spacing.xl} ${theme.spacing['5xl']};
  text-align: center;
  position: relative;
  overflow: hidden;
`

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing['4xl']};
`

const Logo = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  border-radius: ${theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: ${theme.shadow.xl};
`

const Title = styled(motion.div)`
  margin-bottom: ${theme.spacing.xl};
`

const Subtitle = styled(motion.div)`
  margin-bottom: ${theme.spacing['4xl']};
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
`

const CTAButton = styled(Button)`
  margin-bottom: ${theme.spacing['4xl']};
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover::after {
    left: 100%;
  }
`

const FeatureSection = styled(motion.section)`
  padding: ${theme.spacing['5xl']} ${theme.spacing.xl};
  background: ${theme.colors.white};
`

const FeatureGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing['5xl']};
`

const FeatureCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  text-align: center;
  box-shadow: ${theme.shadow.lg};
  border: 1px solid ${theme.colors.gray100};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  }
`

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, ${theme.colors.primaryLight}, ${theme.colors.primary}20);
  border-radius: ${theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  margin: 0 auto ${theme.spacing.lg};
`

const StatsSection = styled(motion.section)`
  padding: ${theme.spacing['4xl']} ${theme.spacing.xl};
  background: linear-gradient(135deg, ${theme.colors.gray50}, ${theme.colors.white});
  text-align: center;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['3xl']};
`

const StatCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadow.md};
  border: 1px solid ${theme.colors.gray100};
`

const TestimonialSection = styled(motion.section)`
  padding: ${theme.spacing['5xl']} ${theme.spacing.xl};
  background: ${theme.colors.white};
`

const TestimonialCard = styled(motion.div)`
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
  position: relative;
`

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.lg};
`

const DownloadSection = styled(motion.section)`
  padding: ${theme.spacing['5xl']} ${theme.spacing.xl};
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  color: ${theme.colors.white};
  text-align: center;
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
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6 }
  }
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

interface LandingPageProps {
  onGetStarted: () => void
  onDownloadApp?: () => void  // optional로 변경
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted: _onGetStarted, onDownloadApp: _onDownloadApp }) => {
  // onGetStarted는 나중에 실제 웹앱으로 연결할 때 사용 예정
  // onDownloadApp도 나중에 필요할 수 있어서 보존
  // 현재는 사용하지 않으므로 _를 붙여서 lint 경고 방지
  
  const downloadSectionRef = useRef<HTMLElement>(null)
  
  const handleScrollToDownload = () => {
    downloadSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  const handleDownloadApp = () => {
    // 외부 링크로 이동
    window.open('http://download.walkmate.klr.kr', '_blank')
  }
  return (
    <LandingContainer>
      <HeroSection
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <LogoContainer variants={itemVariants}>
          <Logo
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Footprints size={40} />
          </Logo>
          <div>
            <Typography variant="h2" weight="700" color="primary">
              워크 메이트
            </Typography>
            <Typography variant="caption" color="secondary">
              Walk Mate
            </Typography>
          </div>
        </LogoContainer>

        <Title variants={itemVariants}>
          <Typography variant="h1" weight="700" align="center">
            AI와 함께하는<br />
            스마트 재활치료
          </Typography>
        </Title>

        <Subtitle variants={itemVariants}>
          <Typography variant="body1" color="secondary" align="center">
            개인 맞춤형 재활 프로그램으로<br />
            건강한 보행을 되찾아보세요
          </Typography>
        </Subtitle>

        <motion.div variants={itemVariants}>
          <CTAButton
            variant="primary"
            size="large"
            fullWidth
            onClick={handleScrollToDownload}
          >
            지금 시작하기
            <ArrowDown size={20} style={{ marginLeft: '8px' }} />
          </CTAButton>
        </motion.div>
      </HeroSection>

      <FeatureSection
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={itemVariants}>
          <Typography variant="h2" weight="700" align="center" style={{ marginBottom: theme.spacing.lg }}>
            왜 워크 메이트일까요?
          </Typography>
          <Typography variant="body1" color="secondary" align="center" style={{ marginBottom: theme.spacing['4xl'] }}>
            재활치료의 새로운 패러다임을 제시합니다
          </Typography>
        </motion.div>

        <FeatureGrid>
          <FeatureCard
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: theme.shadow.xl }}
          >
            <FeatureIcon>
              <Smartphone size={32} />
            </FeatureIcon>
            <Typography variant="h4" weight="600" style={{ marginBottom: theme.spacing.md }}>
              스마트 모니터링
            </Typography>
            <Typography variant="body2" color="secondary">
              실시간으로 운동량과 통증 수준을 추적하여<br />
              정확한 재활 진행 상황을 확인할 수 있습니다
            </Typography>
          </FeatureCard>

          <FeatureCard
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: theme.shadow.xl }}
          >
            <FeatureIcon>
              <Heart size={32} />
            </FeatureIcon>
            <Typography variant="h4" weight="600" style={{ marginBottom: theme.spacing.md }}>
              맞춤형 프로그램
            </Typography>
            <Typography variant="body2" color="secondary">
              AI 기반 분석으로 개인의 상태에 맞는<br />
              최적화된 재활 운동을 제공합니다
            </Typography>
          </FeatureCard>

          <FeatureCard
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: theme.shadow.xl }}
          >
            <FeatureIcon>
              <Users size={32} />
            </FeatureIcon>
            <Typography variant="h4" weight="600" style={{ marginBottom: theme.spacing.md }}>
              가족과 함께
            </Typography>
            <Typography variant="body2" color="secondary">
              보호자가 실시간으로 환자 상태를 확인하고<br />
              응급 상황에 즉시 대응할 수 있습니다
            </Typography>
          </FeatureCard>
        </FeatureGrid>
      </FeatureSection>

      <StatsSection
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={itemVariants}>
          <Typography variant="h3" weight="700" align="center" style={{ marginBottom: theme.spacing.lg }}>
            신뢰할 수 있는 결과
          </Typography>
          <Typography variant="body1" color="secondary" align="center">
            많은 분들이 워크 메이트와 함께 건강을 되찾고 있습니다
          </Typography>
        </motion.div>

        <StatsGrid>
          <StatCard
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
          >
            <Typography variant="h2" weight="700" color="primary" style={{ marginBottom: theme.spacing.sm }}>
              95%
            </Typography>
            <Typography variant="body3" color="secondary">
              재활 만족도
            </Typography>
          </StatCard>

          <StatCard
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
          >
            <Typography variant="h2" weight="700" color="primary" style={{ marginBottom: theme.spacing.sm }}>
              30일
            </Typography>
            <Typography variant="body3" color="secondary">
              평균 회복 단축
            </Typography>
          </StatCard>

          <StatCard
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
          >
            <Typography variant="h2" weight="700" color="primary" style={{ marginBottom: theme.spacing.sm }}>
              24/7
            </Typography>
            <Typography variant="body3" color="secondary">
              실시간 모니터링
            </Typography>
          </StatCard>

          <StatCard
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
          >
            <Typography variant="h2" weight="700" color="primary" style={{ marginBottom: theme.spacing.sm }}>
              1000+
            </Typography>
            <Typography variant="body3" color="secondary">
              성공 사례
            </Typography>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <TestimonialSection
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={itemVariants}>
          <Typography variant="h3" weight="700" align="center" style={{ marginBottom: theme.spacing['4xl'] }}>
            사용자 후기
          </Typography>
        </motion.div>

        <TestimonialCard variants={cardVariants}>
          <StarRating>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill={theme.colors.warning} color={theme.colors.warning} />
            ))}
          </StarRating>
          <Typography variant="body1" style={{ marginBottom: theme.spacing.lg }}>
            "수술 후 재활이 막막했는데, 워크 메이트 덕분에 체계적으로 운동할 수 있었어요. 
            가족들도 제 상태를 실시간으로 확인할 수 있어서 안심됩니다."
          </Typography>
          <Typography variant="body3" color="secondary">
            김○○님 (67세, 고관절 수술 환자)
          </Typography>
        </TestimonialCard>

        <TestimonialCard variants={cardVariants}>
          <StarRating>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill={theme.colors.warning} color={theme.colors.warning} />
            ))}
          </StarRating>
          <Typography variant="body1" style={{ marginBottom: theme.spacing.lg }}>
            "부모님의 재활 상황을 멀리서도 확인할 수 있어 정말 좋습니다. 
            응급 상황 알림 기능 덕분에 빠르게 대응할 수 있었어요."
          </Typography>
          <Typography variant="body3" color="secondary">
            이○○님 (보호자)
          </Typography>
        </TestimonialCard>
      </TestimonialSection>

      <DownloadSection
        ref={downloadSectionRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={itemVariants}>
          <Typography variant="h2" weight="700" align="center" style={{ marginBottom: theme.spacing.lg, color: 'white' }}>
            지금 바로 시작하세요
          </Typography>
          <Typography variant="body1" align="center" style={{ marginBottom: theme.spacing['3xl'], color: 'rgba(255,255,255,0.9)' }}>
            건강한 내일을 위한 첫 걸음을 내딛어보세요
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            variant="secondary"
            size="large"
            fullWidth
            onClick={handleDownloadApp}
          >
            <Download size={20} style={{ marginRight: '8px' }} />
            워크 메이트 체험하기
          </Button>
        </motion.div>
      </DownloadSection>
    </LandingContainer>
  )
}
