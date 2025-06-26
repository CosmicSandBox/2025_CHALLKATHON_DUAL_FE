import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing } from '../../../constants/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: Spacing.sectionSpacing,
    paddingBottom: Spacing.sectionSpacing,
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
  updateIndicator: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 4,
  },
  measurementSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  measurementCard: {
    padding: Spacing.padding,
    alignItems: 'center',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  walkingIndicator: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  walkingIcon: {
    fontSize: 40,
  },
  statusText: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  mainStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...Typography.h1,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.body,
    color: Colors.textLight,
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: Colors.borderLight,
    marginHorizontal: Spacing.componentSpacing,
  },
  secondaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  secondaryStatItem: {
    alignItems: 'center',
  },
  secondaryStatValue: {
    ...Typography.h3,
    color: Colors.primary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  secondaryStatLabel: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  instructionSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  instructionCard: {
    padding: Spacing.padding,
  },
  instructionTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.componentSpacing,
  },
  instructionSteps: {
    gap: Spacing.componentSpacing,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
    marginTop: 2,
  },
  stepNumberText: {
    ...Typography.caption,
    color: Colors.background,
    fontWeight: '600',
  },
  stepText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
  actionSection: {
    paddingHorizontal: Spacing.paddingLarge,
  },
  startButton: {
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
  startButtonText: {
    ...Typography.body,
    color: Colors.background,
    fontWeight: '600',
  },
  stopButton: {
    backgroundColor: '#F44336',
    borderRadius: Spacing.cardRadius,
    paddingVertical: Spacing.paddingLarge,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stopButtonText: {
    ...Typography.body,
    color: Colors.background,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: Spacing.sm,
    margin: Spacing.sm,
    borderRadius: Spacing.xs,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
    ...Typography.body,
  },
  infoContainer: {
    backgroundColor: '#E3F2FD',
    padding: Spacing.sm,
    margin: Spacing.sm,
    borderRadius: Spacing.xs,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoText: {
    color: '#1976D2',
    textAlign: 'center',
    ...Typography.body,
  },
  successContainer: {
    backgroundColor: '#E8F5E8',
    padding: Spacing.sm,
    margin: Spacing.sm,
    borderRadius: Spacing.xs,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  successText: {
    color: '#388E3C',
    textAlign: 'center',
    ...Typography.body,
  },
});
