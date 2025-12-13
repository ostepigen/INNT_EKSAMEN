import { StyleSheet } from 'react-native';
import { COLORS, SPACING, SHADOW } from './globalstyles';

const MBH = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SPACING.r,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.card,
  },
  rowDivider: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  rowTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  rowSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  rowTextContainer: {
    flex: 1,
  },
  chevron: {
    fontSize: 20,
    color: COLORS.icons,
  },
});

export default MBH;