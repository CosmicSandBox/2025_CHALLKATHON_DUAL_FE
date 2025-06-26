import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Typography } from '../common/Typography'
import { theme } from '../../styles/theme'
import { 
  Footprints, 
  Clock, 
  MapPin, 
  Activity,
  TrendingUp
} from 'lucide-react'

const DashboardContainer = styled(motion.div)`
  padding: ${theme.spacing.xl};
`

const Header = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
`

const WelcomeText = styled.div`
  margin-bottom: ${theme.spacing.lg};
`

const TodaySummary = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing.xxl};
  box-shadow: ${theme.shadow.md};
  border: 1px solid ${theme.colors.gray100};
`

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
`

const SummaryItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.lg};
`

const SummaryIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${theme.colors.primaryLight};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`

const SummaryValue = styled.div`
  margin-bottom: ${theme.spacing.xs};
`

const WeeklySteps = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadow.md};
  border: 1px solid ${theme.colors.gray100};
`

const WeeklyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xl};
`

const WeeklyChart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  height: 120px;
  margin-bottom: ${theme.spacing.lg};
  padding: 0 ${theme.spacing.sm};
`

const ChartBar = styled(motion.div)<{ height: number; isToday?: boolean }>`
  width: 24px;
  background: ${({ isToday }) => 
    isToday ? theme.colors.primary : theme.colors.gray300
  };
  border-radius: ${theme.borderRadius.sm} ${theme.borderRadius.sm} 0 0;
  height: ${({ height }) => height}%;
  min-height: 4px;
  position: relative;
`

const WeeklyLabels = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 ${theme.spacing.sm};
`

const WeeklyTotal = styled.div`
  text-align: center;
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray200};
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
const todayData = {
  name: '김환자',
  steps: 3247,
  exerciseTime: 45,
  distance: 2.3,
  painLevel: 2
}

const weeklyData = [
  { day: '월', steps: 2850 },
  { day: '화', steps: 3200 },
  { day: '수', steps: 2950 },
  { day: '목', steps: 3450 },
  { day: '금', steps: 3100 },
  { day: '토', steps: 2800 },
  { day: '일', steps: 3247 }, // 오늘
]

const maxSteps = Math.max(...weeklyData.map(d => d.steps))
const totalWeeklySteps = weeklyData.reduce((sum, d) => sum + d.steps, 0)

export const PatientDashboard: React.FC = () => {
  return (
    <DashboardContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Header>
        <WelcomeText>
          <Typography variant="h2" weight="700">
            안녕하세요, {todayData.name}님!
          </Typography>
          <Typography variant="body2" color="secondary" style={{ marginTop: theme.spacing.sm }}>
            오늘도 건강한 하루 보내세요
          </Typography>
        </WelcomeText>
      </Header>

      <TodaySummary variants={itemVariants}>
        <Typography variant="h4" weight="600">
          오늘의 요약
        </Typography>
        
        <SummaryGrid>
          <SummaryItem
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SummaryIcon>
              <Footprints size={20} />
            </SummaryIcon>
            <SummaryValue>
              <Typography variant="h5" weight="700" color="primary">
                {todayData.steps.toLocaleString()}
              </Typography>
            </SummaryValue>
            <Typography variant="caption" color="secondary">
              걸음 수
            </Typography>
          </SummaryItem>

          <SummaryItem
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SummaryIcon>
              <Clock size={20} />
            </SummaryIcon>
            <SummaryValue>
              <Typography variant="h5" weight="700" color="primary">
                {todayData.exerciseTime}분
              </Typography>
            </SummaryValue>
            <Typography variant="caption" color="secondary">
              운동 시간
            </Typography>
          </SummaryItem>

          <SummaryItem
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SummaryIcon>
              <MapPin size={20} />
            </SummaryIcon>
            <SummaryValue>
              <Typography variant="h5" weight="700" color="primary">
                {todayData.distance}km
              </Typography>
            </SummaryValue>
            <Typography variant="caption" color="secondary">
              이동 거리
            </Typography>
          </SummaryItem>

          <SummaryItem
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SummaryIcon>
              <Activity size={20} />
            </SummaryIcon>
            <SummaryValue>
              <Typography 
                variant="h5" 
                weight="700" 
                color={todayData.painLevel <= 1 ? "success" : todayData.painLevel <= 2 ? "warning" : "error"}
              >
                {todayData.painLevel}/3
              </Typography>
            </SummaryValue>
            <Typography variant="caption" color="secondary">
              통증 수준
            </Typography>
          </SummaryItem>
        </SummaryGrid>
      </TodaySummary>

      <WeeklySteps variants={itemVariants}>
        <WeeklyHeader>
          <div>
            <Typography variant="h4" weight="600">
              주간 걸음 수
            </Typography>
            <Typography variant="body3" color="secondary" style={{ marginTop: theme.spacing.xs }}>
              지난 7일간의 활동량
            </Typography>
          </div>
          <TrendingUp size={24} color={theme.colors.success} />
        </WeeklyHeader>

        <WeeklyChart>
          {weeklyData.map((data, index) => (
            <ChartBar
              key={data.day}
              height={(data.steps / maxSteps) * 100}
              isToday={index === weeklyData.length - 1}
              initial={{ height: 0 }}
              animate={{ height: (data.steps / maxSteps) * 100 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            />
          ))}
        </WeeklyChart>

        <WeeklyLabels>
          {weeklyData.map((data) => (
            <Typography 
              key={data.day} 
              variant="caption" 
              color="secondary"
            >
              {data.day}
            </Typography>
          ))}
        </WeeklyLabels>

        <WeeklyTotal>
          <Typography variant="body3" color="secondary">
            이번 주 총 걸음 수
          </Typography>
          <Typography variant="h4" weight="700" color="primary" style={{ marginTop: theme.spacing.xs }}>
            {totalWeeklySteps.toLocaleString()}걸음
          </Typography>
        </WeeklyTotal>
      </WeeklySteps>
    </DashboardContainer>
  )
}
