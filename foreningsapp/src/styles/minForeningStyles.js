import { StyleSheet } from 'react-native';
import { COLORS, SPACING, SHADOW } from './globalstyles';

const MFS = StyleSheet.create({
  container: {
    padding: SPACING.lg,
  },
  sectionHeader: {
    marginBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SPACING.r,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.card,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.subtext,
  },
  expandChevron: {
    marginLeft: SPACING.md,
    color: COLORS.primary,
    fontSize: 24,
  },
  cardContent: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  memberBlock: {
    marginBottom: SPACING.lg,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.subtext,
    marginBottom: SPACING.xs,
  },
  contactValue: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
});

export default MFS;