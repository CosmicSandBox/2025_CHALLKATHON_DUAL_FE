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
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  introCard: {
    padding: 20,
  },
  introHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 30,
  },
  introInfo: {
    flex: 1,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  introDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  exerciseStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
  },
  stepsCard: {
    padding: 20,
  },
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepEmoji: {
    fontSize: 20,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  twoColumnSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  benefitCard: {
    padding: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitIcon: {
    fontSize: 14,
    color: '#10B981',
    marginRight: 8,
    fontWeight: '700',
  },
  benefitText: {
    fontSize: 13,
    color: '#374151',
  },
  safetyCard: {
    padding: 16,
    backgroundColor: '#FEF3F2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  safetyIcon: {
    fontSize: 12,
    marginRight: 8,
  },
  safetyText: {
    fontSize: 13,
    color: '#DC2626',
  },
  startButton: {
    backgroundColor: '#0EA5E9',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 8,
  },
  startButtonIcon: {
    marginLeft: 4,
  },
  preparationCard: {
    padding: 20,
    backgroundColor: '#F0F9FF',
    borderColor: '#0EA5E9',
    borderWidth: 1,
  },
  preparationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0C4A6E',
    marginBottom: 12,
    textAlign: 'center',
  },
  preparationText: {
    fontSize: 14,
    color: '#0C4A6E',
    textAlign: 'center',
    lineHeight: 20,
  },
});
