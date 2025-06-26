import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing } from '../../../constants/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#F8F9FA',
  },
  backButton: {
    marginRight: 8,
    marginTop: 0,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#A3A8AF',
    fontWeight: '400',
  },
  scrollContent: {
    paddingVertical: Spacing.sm,
    paddingBottom: Spacing.sectionSpacing,
  },
  weatherSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  weatherCard: {
    padding: Spacing.padding,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  weatherTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  weatherIcon: {
    fontSize: 24,
  },
  weatherStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weatherItem: {
    alignItems: 'center',
  },
  weatherValue: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  weatherLabel: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  progressSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  progressCard: {
    padding: Spacing.padding,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  progressTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  progressValue: {
    ...Typography.h3,
    color: Colors.primary,
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
    marginBottom: Spacing.componentSpacing,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
    fontWeight: '600',
  },
  safetySection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  safetyCard: {
    padding: 0,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.componentSpacing,
    paddingHorizontal: Spacing.padding,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  safetyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  safetyIconText: {
    fontSize: 18,
  },
  safetyText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },
  actionSection: {
    paddingHorizontal: Spacing.paddingLarge,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    borderRadius: Spacing.cardRadius,
    paddingVertical: Spacing.paddingLarge,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    ...Typography.body,
    color: Colors.background,
    fontWeight: '600',
  },
  exerciseContainer: {
    flex: 1,
  },
  exerciseStatusCard: {
    paddingHorizontal: Spacing.paddingLarge,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.componentSpacing,
  },
  statusCard: {
    padding: Spacing.padding,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  statusTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  progressPercentage: {
    ...Typography.h2,
    color: Colors.primary,
    fontWeight: '700',
  },
  progressBarContainer: {
    marginBottom: Spacing.componentSpacing,
  },
  exerciseProgressBar: {
    height: 12,
    backgroundColor: Colors.borderLight,
    borderRadius: 6,
    overflow: 'hidden',
  },
  exerciseProgressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  exerciseStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  exerciseStatItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  exerciseStatLabel: {
    ...Typography.caption,
    color: Colors.textLight,
    textAlign: 'center',
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: Spacing.paddingLarge,
    borderRadius: Spacing.cardRadius,
    overflow: 'hidden',
    backgroundColor: Colors.background,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  webView: {
    flex: 1,
  },
  exerciseActionSection: {
    paddingHorizontal: Spacing.paddingLarge,
    paddingVertical: Spacing.componentSpacing,
  },
  // 새로운 운동 화면 스타일들
  exerciseHeader: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.paddingLarge,
    paddingTop: Spacing.padding,
    paddingBottom: Spacing.componentSpacing,
  },
  exerciseHeaderContent: {
    backgroundColor: Colors.background,
  },
  exerciseTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  exerciseTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  recordBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordText: {
    fontSize: 16,
  },
  progressContainer: {
    marginTop: Spacing.componentSpacing,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  progressLabel: {
    ...Typography.caption,
    color: Colors.textLight,
    fontWeight: '600',
  },
  maxProgressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  currentProgressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#FF5722',
    borderRadius: 4,
  },
  recordCardsContainer: {
    paddingHorizontal: Spacing.paddingLarge,
    paddingVertical: Spacing.componentSpacing,
    backgroundColor: Colors.background,
  },
  recordCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.componentSpacing,
  },
  recordCard: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    borderRadius: Spacing.cardRadius,
    padding: Spacing.padding,
    marginHorizontal: Spacing.xs,
  },
  recordCardHeader: {
    backgroundColor: '#4CAF50',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.componentSpacing,
    borderRadius: 6,
    marginBottom: Spacing.componentSpacing,
  },
  recordCardTitle: {
    ...Typography.caption,
    color: Colors.background,
    fontWeight: '600',
    textAlign: 'center',
  },
  recordCardContent: {
    paddingHorizontal: Spacing.xs,
  },
  recordTime: {
    ...Typography.caption,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  recordDistance: {
    ...Typography.caption,
    color: '#FF5722',
    fontWeight: '600',
  },
  exerciseStopButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: Spacing.componentSpacing,
    paddingHorizontal: Spacing.padding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseStopButtonText: {
    ...Typography.button,
    color: Colors.background,
    fontWeight: '700',
  },
  webViewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: Spacing.componentSpacing,
    ...Typography.body,
    color: Colors.textLight,
  },
});
