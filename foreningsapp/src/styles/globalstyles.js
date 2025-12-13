
import { StyleSheet } from 'react-native';

export const COLORS = {
  bg:        '#f5f5f5ff',
  card:      '#ffffffff',
  border:    '#E6E8EC',
  text:      '#111827',
  subtext:   '#6B7280',
  textSecondary: '#6B7280',
  primary:   '#255D32',
  primary50: '#E6EFE9',
  danger:    '#D33',
  icons:     '#255D32',
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
  btnSmall: {
    backgroundColor: COLORS.primary,
    borderRadius: SPACING.r,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  btnSmallText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  btnGhost: {
    backgroundColor: COLORS.primary50,
    borderRadius: SPACING.r,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  btnGhostText: { color: COLORS.primary, fontWeight: '700' },

  //ICONS
  icon: { 
    color: COLORS.primary,
    fontSize: 24,
    width: 30, // Fast bredde så alle ikoner starter samme sted
    textAlign: 'left', // Venstrejusterer ikonet inden for den faste bredde
  },

  //TOUCHABLE OPACITY
  touchableOpacity: {
    backgroundColor: COLORS.card,
    borderRadius: SPACING.r,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'flex-start', // Starter fra venstre i stedet for center
    flexDirection: 'row',
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xl, // Større spacing mellem TouchableOpacity elementer
  },

  //OPSLAGSTAVLE
  opslagContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SPACING.r,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },






  //nedstående skal rettes og ændre til gloable
  //AI-Chat styles
  chatContainer: {
    flex: 1,
    backgroundColor: COLORS.card,
  },
  chatInputContainer: {
    flexDirection: 'row',
    padding: SPACING.sm,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
  },
  chatTextInput: {
    height: 40,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: COLORS.bg,
  },
  chatSendButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
  },
  chatSendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // AI chat besked bobler styles (brug og til andre beskeder måske)
  messageContainer: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    maxWidth: '85%',
  },
  userMessage: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  errorMessage: {
    backgroundColor: '#ffebee',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  messageHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userHeader: {
    color: 'white',
  },
  aiHeader: {
    color: COLORS.primary,
  },
  errorHeader: {
    color: COLORS.danger,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.text,
  },
  loadingContainer: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.bg,
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
  },

  //Form styles til NyBeskedScreen
  formContainer: {
    padding: SPACING.lg,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  formDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SPACING.r,
    padding: SPACING.md,
    fontSize: 16,
    backgroundColor: COLORS.card,
    color: COLORS.text,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'right',
    marginTop: SPACING.xs,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xl,
    gap: SPACING.md,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.md + 2,
    borderRadius: SPACING.r,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  buttonDisabled: {
    backgroundColor: COLORS.textSecondary,
    opacity: 0.6,
  },
  buttonPrimaryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondaryText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContainer: {
    flexGrow: 1,
  },

  // BeskederScreen styles
  beskederContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  beskederScrollView: {
    flex: 1,
  },
  beskederContent: {
    padding: SPACING.xl,
  },
  beskederHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  beskederTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  newMessageButtonSmall: {
    backgroundColor: '#255d32ff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  newMessageButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  aiChatButton: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  aiChatContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#255d32ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  aiImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  aiEmoji: {
    fontSize: 24,
  },
  aiTextContainer: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#255d32ff',
    marginBottom: 2,
  },
  aiSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  beskederSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  sectionPlaceholder: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },

  // Additional AI Chat styles
  chatScrollView: {
    flex: 1,
    padding: 20,
  },
  chatScrollContent: {
    paddingBottom: 100,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.text,
  },
  chatPlaceholder: {
    color: COLORS.primary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
  loadingText: {
    color: COLORS.primary,
  },
  chatInputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  
  // Message avatar styles
  messageHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },

  // Message list items (Beskeder)
  messageItem: {
    backgroundColor: COLORS.card,
    borderRadius: SPACING.r,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  messageSubject: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  messagePreview: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  messageMeta: {
    fontSize: 12,
    color: COLORS.subtext,
  },

  // Reusable list card styles
  listCard: {
    backgroundColor: COLORS.card,
    borderRadius: SPACING.r,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  listRowDivider: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});

// Variant (valgfri kant/farve)
export const cardVariant = (selected = false) => ([
  GS.card,
  selected && { borderColor: COLORS.primary, backgroundColor: COLORS.primary50 },
]);

export default GS;
