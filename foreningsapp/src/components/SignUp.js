import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { signUpUser } from '../services/firebase/auth';
import GS from '../styles/globalstyles';

// Eksporterer komponenten 'SignUp', som håndterer oprettelse af nye brugere
export default function SignUp() {
// Opretter to state-variabler til at gemme brugerens input (email og kodeord)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

// Funktion, der håndterer brugeroprettelsen via Firebase Authentication
  const handleSignup = async () => {
    try {
      // Forsøger at oprette en ny bruger med e-mail og adgangskode
      await signUpUser(email, password);
      // Viser en bekræftelse til brugeren, når oprettelsen lykkes
      Alert.alert('Bruger oprettet!');
      // Nulstiller inputfelterne efter oprettelse
      setEmail('');
      setPassword('');
      //fejlbesked
    } catch (error) {
      Alert.alert('Fejl', error.message);
    }
  };

  // Returnerer komponentens visuelle layout
  return (
    <View style={[GS.card, { margin: 20, flex: 1, justifyContent: 'center' }]}>
      <Text style={[GS.h2, { marginBottom: 30, textAlign: 'center' }]}>Opret bruger</Text>
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
      <TouchableOpacity style={[GS.btn, { paddingVertical: 15 }]} onPress={handleSignup}>
        <Text style={[GS.btnText, { fontSize: 18 }]}>Opret</Text>
      </TouchableOpacity>
    </View>
  );
}
