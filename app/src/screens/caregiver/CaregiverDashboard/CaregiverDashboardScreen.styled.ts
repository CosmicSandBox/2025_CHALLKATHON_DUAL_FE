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
    paddingBottom: Spacing.sectionSpacing,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.paddingLarge,
    paddingTop: Spacing.sectionSpacing,
    paddingBottom: Spacing.componentSpacing,
  },
  greeting: {
    ...Typography.h1,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textLight,
  },
  profileContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 24,
  },
  
  // Caregiver Section
  caregiverSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  caregiverCard: {
    padding: Spacing.padding,
  },
  caregiverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caregiverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  caregiverAvatarText: {
    fontSize: 28,
  },
  caregiverInfo: {
    flex: 1,
  },
  caregiverName: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  caregiverRole: {
    ...Typography.body,
    color: Colors.textLight,
  },
  
  // Patient Section
  patientSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
    fontWeight: '600',
  },
  patientCard: {
    padding: Spacing.padding,
  },
  attentionCard: {
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.componentSpacing,
  },
  patientAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.componentSpacing,
  },
  patientAvatarText: {
    fontSize: 32,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    ...Typography.h2,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  patientCondition: {
    ...Typography.body,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  patientStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.xs,
  },
  statusText: {
    ...Typography.caption,
    fontWeight: '500',
  },
  attentionBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attentionBadgeText: {
    fontSize: 16,
  },
  
  // Progress Section
  progressSection: {
    marginBottom: Spacing.componentSpacing,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  progressLabel: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  progressValue: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  
  // Contact Section
  contactSection: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.padding,
    borderRadius: Spacing.cardRadius,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  emergencyButton: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  contactButtonIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  contactButtonText: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  
  // Location Button
  locationSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  locationButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationButtonIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  locationButtonText: {
    ...Typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
    flex: 1,
  },
  locationButtonArrow: {
    ...Typography.body,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Overview Section
  overviewSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  overviewCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
    padding: Spacing.padding,
  },
  overviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overviewIcon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  overviewText: {
    flex: 1,
  },
  overviewValue: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  overviewLabel: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  
  // Alerts Section
  alertsSection: {
    paddingHorizontal: Spacing.paddingLarge,
    marginBottom: Spacing.sectionSpacing,
  },
  alertsList: {
    gap: Spacing.componentSpacing,
  },
  alertCard: {
    padding: Spacing.padding,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  alertPriority: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: Spacing.sm,
  },
  alertInfo: {
    flex: 1,
  },
  alertType: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  alertTime: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  alertMessage: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginBottom: Spacing.componentSpacing,
  },
  alertActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  alertButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.padding,
    borderRadius: Spacing.cardRadius,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
  },
  alertButtonText: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  primaryButtonText: {
    ...Typography.bodySmall,
    color: Colors.background,
    fontWeight: '500',
  },
  
  // Actions Section
  actionsSection: {
    paddingHorizontal: Spacing.paddingLarge,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: Colors.background,
    borderRadius: Spacing.cardRadius,
    padding: Spacing.padding,
    marginBottom: Spacing.componentSpacing,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  actionIconText: {
    fontSize: 24,
  },
  actionTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  actionSubtitle: {
    ...Typography.caption,
    color: Colors.textLight,
    lineHeight: 16,
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.paddingLarge,
    paddingVertical: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  closeButton: {
    backgroundColor: '#FF4444',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
  },
  closeButtonText: {
    ...Typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  webView: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
});
