import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { loginUser } from '../services/firebase/auth';
import GS from '../styles/globalstyles';

// Eksporterer komponenten Login, som bruges til at håndtere brugerlogin 
export default function Login() {
// Opretter to state-variabler til at gemme brugerens input (email og kodeord)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

// Funktion der håndterer login-processen
  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      Alert.alert('Du er logget ind!');
    } catch (error) {
      Alert.alert('Fejl', error.message);
    }
  };

  // Returnerer det visuelle layout for login-siden
  return (
    <View style={[GS.card, { margin: 20, flex: 1, justifyContent: 'center' }]}>
      <Text style={[GS.h2, { marginBottom: 30, textAlign: 'center' }]}>Login</Text>
      <TextInput
        placeholder="Email"
        style={[GS.input, { fontSize: 16, paddingVertical: 15, marginBottom: 20 }]}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Kodeord"
        style={[GS.input, { fontSize: 16, paddingVertical: 15, marginBottom: 30 }]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={[GS.btn, { paddingVertical: 15 }]} onPress={handleLogin}>
        <Text style={[GS.btnText, { fontSize: 18 }]}>Log ind</Text>
      </TouchableOpacity>
    </View>
  );
}
