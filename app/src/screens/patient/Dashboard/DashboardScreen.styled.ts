import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing } from '../../../constants/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: Spacing.sectionSpacing * 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.paddingLarge,
    paddingTop: Spacing.sectionSpacing,
    paddingBottom: Spacing.sectionSpacing,
    backgroundColor: '#F8F9FA',
    position: 'relative',
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F8F9FA',
    zIndex: -1,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 16,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.textLight,
  },
  summarySection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
    fontWeight: '600',
  },
  summaryCard: {
    padding: Spacing.padding,
    marginBottom: Spacing.componentSpacing,
  },
  painCard: {
    padding: Spacing.padding,
    backgroundColor: '#FEF7F0',
    borderWidth: 1,
    borderColor: '#F97316',
  },
  painContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  painInfo: {
    flex: 1,
  },
  painTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  painSubtitle: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  painValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  painValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F97316',
  },
  painMaxValue: {
    fontSize: 18,
    fontWeight: '500',
    color: '#F97316',
    opacity: 0.7,
  },
  summaryGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    ...Typography.h2,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  summaryLabel: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.borderLight,
  },
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: Spacing.componentSpacing,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  summaryFooterItem: {
    alignItems: 'center',
  },
  summaryFooterLabel: {
    ...Typography.caption,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  summaryFooterValue: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  actionsSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  actionsContainer: {
    gap: Spacing.componentSpacing,
  },
  indoorAction: {
    backgroundColor: '#E8F5E8',
    borderRadius: Spacing.cardRadius,
    padding: Spacing.padding,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  outdoorAction: {
    backgroundColor: '#E3F2FD',
    borderRadius: Spacing.cardRadius,
    padding: Spacing.padding,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  actionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionHeader: {
    flex: 1,
  },
  actionTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  actionSubtitle: {
    ...Typography.body,
    color: Colors.textLight,
  },
  actionBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.cardRadius,
  },
  actionBadgeText: {
    ...Typography.caption,
    color: Colors.background,
    fontWeight: '600',
  },
  additionalActionsSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  additionalActionsGrid: {
    flexDirection: 'row',
    gap: Spacing.componentSpacing,
  },
  additionalAction: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: Spacing.cardRadius,
    padding: Spacing.padding,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  additionalActionTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  additionalActionSubtitle: {
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
  progressTotal: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
  },
  progressBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },
  progressBarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  progressBar: {
    width: 20,
    height: 80,
    backgroundColor: Colors.borderLight,
    borderRadius: 10,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  progressBarFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 10,
  },
  progressDay: {
    ...Typography.caption,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  progressSteps: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontSize: 10,
  },
});
