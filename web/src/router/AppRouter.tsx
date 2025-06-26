import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Layout } from '../components/common/Layout'
import { NavigationHeader } from '../components/common/NavigationHeader'
import { PageTransition } from '../components/common/PageTransition'
import { LandingPage } from '../components/mobile/LandingPage'
import { AppDownloadSection } from '../components/mobile/AppDownloadSection'
import { Hero } from '../components/mobile/Hero'
import { LoginSection } from '../components/mobile/LoginSection'
import { PatientDashboard } from '../components/mobile/PatientDashboard'
import { GuardianDashboard } from '../components/mobile/GuardianDashboard'
import { LoadingScreen } from '../components/common/LoadingScreen'

type ViewState = 'landing' | 'download' | 'webapp' | 'dashboard'

export const AppRouter = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing')
  const [selectedUserType, setSelectedUserType] = useState<'patient' | 'guardian' | null>(null)
  // 나중에 사용할 예정
  const [_isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // const handleGetStarted = () => {
  //   setCurrentView('webapp')  // 바로 웹 체험으로 이동
  // }

  const handleGetStarted = () => {} // 임시 빈 함수

  const handleDownloadApp = () => {
    setCurrentView('download')  // QR코드 페이지로 이동
  }

  const handleWebAppStart = () => {
    setCurrentView('webapp')  // QR코드에서 웹 체험으로 이동
  }

  const handleUserTypeSelect = (type: 'patient' | 'guardian') => {
    setSelectedUserType(type)
  }

  const handleKakaoLogin = async () => {
    setIsLoading(true)
    
    // 카카오 로그인 시뮬레이션
    setTimeout(() => {
      setIsLoggedIn(true)
      setCurrentView('dashboard')
      setIsLoading(false)
    }, 2000)
  }

  const handleBack = () => {
    if (currentView === 'download') {
      setCurrentView('landing')
    } else if (currentView === 'webapp') {
      setCurrentView('landing')  // 웹앱에서 뒤로가기하면 랜딩으로
    } else if (currentView === 'dashboard') {
      setIsLoggedIn(false)
      setSelectedUserType(null)
      setCurrentView('webapp')
    }
  }

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'download':
        return '앱 다운로드'
      case 'webapp':
        return '워크 메이트 체험'
      case 'dashboard':
        return selectedUserType === 'patient' ? '환자 대시보드' : '보호자 대시보드'
      default:
        return undefined
    }
  }

  const getShowBackButton = () => {
    return currentView !== 'landing'
  }

  if (isLoading) {
    return <LoadingScreen text="로그인 중..." />
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} onDownloadApp={handleDownloadApp} />
      
      case 'download':
        return <AppDownloadSection onWebAppStart={handleWebAppStart} />
      
      case 'webapp':
        return (
          <>
            <Hero onSelectUserType={handleUserTypeSelect} />
            <LoginSection 
              selectedUserType={selectedUserType}
              onKakaoLogin={handleKakaoLogin}
            />
          </>
        )
      
      case 'dashboard':
        return selectedUserType === 'patient' ? (
          <PatientDashboard />
        ) : (
          <GuardianDashboard />
        )
      
      default:
        return <LandingPage onGetStarted={handleGetStarted} onDownloadApp={handleDownloadApp} />
    }
  }

  return (
    <BrowserRouter>
      <Layout padding={false}>
        <NavigationHeader
          title={getHeaderTitle()}
          showBackButton={getShowBackButton()}
          onBack={handleBack}
        />
        
        <AnimatePresence mode="wait">
          <PageTransition key={currentView}>
            {renderCurrentView()}
          </PageTransition>
        </AnimatePresence>
      </Layout>
    </BrowserRouter>
  )
}
