import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Typography } from '../common/Typography'
import { Button } from '../common/Button'
import { theme } from '../../styles/theme'
import { 
  User, 
  Phone, 
  MapPin, 
  Footprints, 
  Clock, 
  Activity,
  AlertTriangle
} from 'lucide-react'

const DashboardContainer = styled(motion.div)`
  padding: ${theme.spacing.xl};
`

const Header = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
`

const ProfileCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing.xxl};
  box-shadow: ${theme.shadow.md};
  border: 1px solid ${theme.colors.gray100};
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`

const ProfileAvatar = styled.div`
  width: 60px;
  height: 60px;
  background: ${theme.colors.primaryLight};
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
`

const PatientInfo = styled.div`
  padding: ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.lg};
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`

const LocationButton = styled(Button)`
  margin-bottom: ${theme.spacing.xxl};
`

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xxl};
`

const StatusCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  text-align: center;
  box-shadow: ${theme.shadow.sm};
  border: 1px solid ${theme.colors.gray100};
`

const StatusIcon = styled.div`
  width: 32px;
  height: 32px;
  margin: 0 auto ${theme.spacing.sm};
  background: ${theme.colors.primaryLight};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
`

const AlertCard = styled(motion.div)`
  background: ${theme.colors.error}15;
  border: 1px solid ${theme.colors.error}30;
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
`

const AlertHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`

const AlertIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${theme.colors.error};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
`

const AlertContent = styled.div`
  margin-bottom: ${theme.spacing.lg};
`

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
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

// 목업 데이터
const guardianData = {
  name: '김보호자',
  patient: {
    name: '김환자',
    age: 67,
    condition: '고관절 수술 후 재활',
    phone: '010-1234-5678',
    emergencyContact: '119'
  },
  todayStatus: {
    steps: 3247,
    exerciseTime: 45,
    painLevel: 3
  },
  alert: {
    hasAlert: true,
    timeAgo: '15분 전',
    painIncrease: '2 → 3',
    message: '통증 수준이 증가했습니다'
  }
}

export const GuardianDashboard: React.FC = () => {
  const handleLocationCheck = () => {
    // 환자 위치 확인 로직
    console.log('환자 위치 확인')
  }

  const handleEmergencyCall = () => {
    // 긴급 연락 로직
    window.location.href = `tel:${guardianData.patient.phone}`
  }

  return (
    <DashboardContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Header>
        <Typography variant="h2" weight="700">
          안녕하세요, {guardianData.name}님
        </Typography>
        <Typography variant="body2" color="secondary" style={{ marginTop: theme.spacing.sm }}>
          환자 상태를 확인하세요
        </Typography>
      </Header>

      <ProfileCard variants={itemVariants}>
        <ProfileHeader>
          <ProfileAvatar>
            <User size={32} />
          </ProfileAvatar>
          <div>
            <Typography variant="h4" weight="600">
              담당 환자
            </Typography>
            <Typography variant="body2" color="secondary">
              {guardianData.patient.name}님의 상태
            </Typography>
          </div>
        </ProfileHeader>

        <PatientInfo>
          <InfoRow>
            <Typography variant="body3" color="secondary">이름</Typography>
            <Typography variant="body2" weight="600">{guardianData.patient.name}</Typography>
          </InfoRow>
          <InfoRow>
            <Typography variant="body3" color="secondary">나이</Typography>
            <Typography variant="body2" weight="600">{guardianData.patient.age}세</Typography>
          </InfoRow>
          <InfoRow>
            <Typography variant="body3" color="secondary">질환</Typography>
            <Typography variant="body2" weight="600">{guardianData.patient.condition}</Typography>
          </InfoRow>
          <InfoRow>
            <Typography variant="body3" color="secondary">연락처</Typography>
            <Typography variant="body2" weight="600">{guardianData.patient.phone}</Typography>
          </InfoRow>
        </PatientInfo>

        <LocationButton
          variant="secondary"
          size="medium"
          fullWidth
          onClick={handleLocationCheck}
        >
          <MapPin size={20} style={{ marginRight: '8px' }} />
          환자 위치 보기
        </LocationButton>
      </ProfileCard>

      <motion.div variants={itemVariants}>
        <Typography variant="h4" weight="600" style={{ marginBottom: theme.spacing.lg }}>
          오늘의 현황
        </Typography>
        
        <StatusGrid>
          <StatusCard
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <StatusIcon>
              <Footprints size={16} />
            </StatusIcon>
            <Typography variant="h6" weight="700" color="primary">
              {guardianData.todayStatus.steps.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="secondary">
              걸음수
            </Typography>
          </StatusCard>

          <StatusCard
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <StatusIcon>
              <Clock size={16} />
            </StatusIcon>
            <Typography variant="h6" weight="700" color="primary">
              {guardianData.todayStatus.exerciseTime}분
            </Typography>
            <Typography variant="caption" color="secondary">
              운동시간
            </Typography>
          </StatusCard>

          <StatusCard
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <StatusIcon>
              <Activity size={16} />
            </StatusIcon>
            <Typography 
              variant="h6" 
              weight="700" 
              color={guardianData.todayStatus.painLevel <= 1 ? "success" : 
                    guardianData.todayStatus.painLevel <= 2 ? "warning" : "error"}
            >
              {guardianData.todayStatus.painLevel}/3
            </Typography>
            <Typography variant="caption" color="secondary">
              통증정도
            </Typography>
          </StatusCard>
        </StatusGrid>
      </motion.div>

      {guardianData.alert.hasAlert && (
        <AlertCard variants={itemVariants}>
          <AlertHeader>
            <AlertIcon>
              <AlertTriangle size={20} />
            </AlertIcon>
            <Typography variant="h5" weight="600" color="error">
              긴급 알림
            </Typography>
          </AlertHeader>

          <AlertContent>
            <Typography variant="body2" style={{ marginBottom: theme.spacing.sm }}>
              <strong>통증 증가</strong>
            </Typography>
            <Typography variant="body3" color="secondary" style={{ marginBottom: theme.spacing.sm }}>
              {guardianData.alert.timeAgo} • 통증이 {guardianData.alert.painIncrease}로 증가했습니다
            </Typography>
            <Typography variant="body3" color="secondary">
              {guardianData.alert.message}
            </Typography>
          </AlertContent>

          <Button
            variant="primary"
            size="medium"
            fullWidth
            onClick={handleEmergencyCall}
          >
            <Phone size={20} style={{ marginRight: '8px' }} />
            환자에게 연락하기
          </Button>
        </AlertCard>
      )}
    </DashboardContainer>
  )
}
