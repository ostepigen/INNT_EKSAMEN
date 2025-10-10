import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase/db';
import GS from '../styles/globalstyles';

// Eksporterer komponenten 'Login', som bruges til at håndtere brugerlogin 
export default function Login() {
// Opretter to state-variabler til at gemme brugerens input (email og kodeord)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

// Funktion der håndterer login-processen
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Du er logget ind!');
    } catch (error) {
      Alert.alert('Fejl', error.message);
    }
  };

  // Returnerer det visuelle layout for login-siden
  return (
    <View style={[GS.card, { margin: 20 }]}>
      <Text style={GS.h2}>Login</Text>
      <TextInput
        placeholder="Email"
        style={GS.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Kodeord"
        style={GS.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={GS.btn} onPress={handleLogin}>
        <Text style={GS.btnText}>Log ind</Text>
      </TouchableOpacity>
    </View>
  );
}
