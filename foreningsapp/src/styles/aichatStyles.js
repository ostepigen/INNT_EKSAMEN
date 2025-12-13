import { StyleSheet, Platform } from 'react-native';

// Styles for AIchat screen
const AIChatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeholder: {
    color: '#255d32ff',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  textInput: {
    height: 40,
    borderColor: '#255d32ff',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    backgroundColor: '#255d32ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageContainer: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    maxWidth: '85%',
  },
  userMessage: {
    backgroundColor: '#255d32ff',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
    color: '#255d32ff',
  },
  errorHeader: {
    color: '#d32f2f',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  loadingContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
  },
  loadingText: {
    color: '#255d32ff',
  },
});

export default AIChatStyles;
