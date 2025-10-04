// src/styles/globalstyles.js
import { StyleSheet } from 'react-native';

export const COLORS = {
  bg:        '#f2f2f2',
  card:      '#FFFFFF',
  border:    '#E6E8EC',
  text:      '#111827',
  subtext:   '#6B7280',
  primary:   '#255D32',
  primary50: '#E6EFE9',
  danger:    '#D33',
};

export const SPACING = {
  xs: 6, sm: 10, md: 14, lg: 18, xl: 24, xxl: 32,
  r: 12,
};

export const SHADOW = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
};

const GS = StyleSheet.create({
  // Layout
  screen: { flex: 1, backgroundColor: COLORS.bg },
  content: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.xl, paddingBottom: SPACING.xxl },

  // Typografi
  h1: { fontSize: 28, fontWeight: '700', color: COLORS.text },
  h2: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.sm },
  help: { fontSize: 14, color: COLORS.subtext },

  // Kort / bokse
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SPACING.r,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardSpacer: { height: SPACING.lg },

  // Dato/tid-sektioner
  row: { gap: SPACING.sm },
  rowHeader: { marginTop: SPACING.xl, marginBottom: SPACING.sm },

  // “Value” felt
  valueBox: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: SPACING.r,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  valueText: { fontSize: 18, color: COLORS.text },

  // Knapper
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: SPACING.r,
    paddingVertical: SPACING.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  btnGhost: {
    backgroundColor: COLORS.primary50,
    borderRadius: SPACING.r,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  btnGhostText: { color: COLORS.primary, fontWeight: '700' },
});

// Variant (valgfri kant/farve)
export const cardVariant = (selected = false) => ([
  GS.card,
  selected && { borderColor: COLORS.primary, backgroundColor: COLORS.primary50 },
]);

export default GS;
