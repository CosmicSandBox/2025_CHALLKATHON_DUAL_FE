import styled from 'styled-components'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { Typography } from '../common/Typography'
import { Button } from '../common/Button'
import { theme } from '../../styles/theme'
import { QrCode, Smartphone } from 'lucide-react'

const QRSection = styled(motion.section)`
  padding: ${theme.spacing['4xl']} ${theme.spacing.xl};
  background: linear-gradient(135deg, ${theme.colors.gray50}, ${theme.colors.white});
  text-align: center;
`

const QRContainer = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['3xl']};
  margin: ${theme.spacing.xxl} auto;
  box-shadow: ${theme.shadow.lg};
  border: 1px solid ${theme.colors.gray100};
  max-width: 280px;
`

const QRWrapper = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  margin: ${theme.spacing.xl} auto;
  box-shadow: ${theme.shadow.sm};
  display: inline-block;
`

const InstructionCard = styled(motion.div)`
  background: ${theme.colors.primaryLight};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
  border: 1px solid ${theme.colors.primary}30;
`

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  text-align: left;
`

const StepItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.sm};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.sm};
  box-shadow: ${theme.shadow.sm};
`

const StepNumber = styled.div`
  width: 24px;
  height: 24px;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.caption.fontSize};
  font-weight: 600;
  flex-shrink: 0;
`

const WarningCard = styled(motion.div)`
  background: ${theme.colors.warning}15;
  border: 1px solid ${theme.colors.warning}30;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
`

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
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

interface AppDownloadSectionProps {
  onWebAppStart: () => void
}

export const AppDownloadSection: React.FC<AppDownloadSectionProps> = ({ onWebAppStart }) => {
  // 데모용 QR코드 데이터 (실제 플레이스토어가 아닌 웹앱 링크)
  const qrData = "https://walkmate-demo.com/download"
  
  return (
    <QRSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={itemVariants}>
        <QrCode size={32} color={theme.colors.primary} style={{ marginBottom: theme.spacing.lg }} />
        <Typography variant="h3" weight="700" align="center" style={{ marginBottom: theme.spacing.md }}>
          워크 메이트 앱 다운로드
        </Typography>
        <Typography variant="body1" color="secondary" align="center">
          QR코드를 스캔하여 앱을 다운로드하세요
        </Typography>
      </motion.div>

      <QRContainer
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        <QRWrapper>
          <QRCodeSVG
            value={qrData}
            size={160}
            level="M"
            includeMargin={false}
            fgColor={theme.colors.gray900}
            bgColor={theme.colors.white}
          />
        </QRWrapper>
        
        <Typography variant="body2" color="secondary" style={{ marginTop: theme.spacing.md }}>
          스마트폰으로 QR코드를 스캔해주세요
        </Typography>

        <InstructionCard variants={itemVariants}>
          <Typography variant="h6" weight="600" color="primary" style={{ marginBottom: theme.spacing.sm }}>
            다운로드 방법
          </Typography>
          
          <StepList>
            <StepItem variants={itemVariants}>
              <StepNumber>1</StepNumber>
              <Typography variant="body3">
                스마트폰 카메라나 QR코드 스캐너 앱을 열어주세요
              </Typography>
            </StepItem>
            
            <StepItem variants={itemVariants}>
              <StepNumber>2</StepNumber>
              <Typography variant="body3">
                위 QR코드를 스캔해주세요
              </Typography>
            </StepItem>
            
            <StepItem variants={itemVariants}>
              <StepNumber>3</StepNumber>
              <Typography variant="body3">
                안내에 따라 앱을 설치하고 실행해주세요
              </Typography>
            </StepItem>
          </StepList>
        </InstructionCard>

        <WarningCard variants={itemVariants}>
          <Typography variant="body3" color="warning" weight="600" style={{ marginBottom: theme.spacing.xs }}>
            ⚠️ 안내사항
          </Typography>
          <Typography variant="caption" color="secondary">
            현재 안드로이드 기기만 지원됩니다.<br />
            iOS 버전은 추후 출시 예정입니다.
          </Typography>
        </WarningCard>
      </QRContainer>

      <motion.div variants={itemVariants}>
        <Typography variant="body2" color="secondary" style={{ marginBottom: theme.spacing.lg }}>
          QR코드 스캔이 어려우신가요?
        </Typography>
        
        <Button
          variant="tertiary"
          size="medium"
          fullWidth
          onClick={onWebAppStart}
        >
          <Smartphone size={20} style={{ marginRight: '8px' }} />
          웹에서 먼저 체험해보기
        </Button>
      </motion.div>
    </QRSection>
  )
}
