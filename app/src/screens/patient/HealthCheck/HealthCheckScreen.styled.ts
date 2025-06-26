import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing } from '../../../constants/spacing';

const { width: screenWidth } = Dimensions.get('window');

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
  progressContainer: {
    backgroundColor: '#3182F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
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
  infoCard: {
    padding: 20,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  legendCard: {
    padding: 16,
  },
  legendContainer: {
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  legendName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    width: 50,
    marginRight: 12,
  },
  legendDescription: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
  },
  bodyPartsContainer: {
    gap: 16,
  },
  bodyPartCard: {
    padding: 20,
  },
  bodyPartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bodyPartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bodyPartIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  bodyPartText: {
    flex: 1,
  },
  bodyPartName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  bodyPartDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  selectedIndicator: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  selectedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  symptomButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  symptomButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  symptomButtonIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  symptomButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailCard: {
    padding: 20,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  detailInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#1F2937',
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  detailHint: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonActive: {
    backgroundColor: '#3182F6',
    shadowColor: '#3182F6',
  },
  submitButtonInactive: {
    backgroundColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  submitButtonTextActive: {
    color: '#FFFFFF',
  },
  submitButtonTextInactive: {
    color: '#A3A8AF',
  },
  submitButtonIcon: {
    marginLeft: 4,
  },
});
