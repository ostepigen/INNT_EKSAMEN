import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase/db';
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
      await createUserWithEmailAndPassword(auth, email, password);
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
    <View style={[GS.card, { margin: 20 }]}>
      <Text style={GS.h2}>Opret bruger</Text>
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
      <TouchableOpacity style={GS.btn} onPress={handleSignup}>
        <Text style={GS.btnText}>Opret</Text>
      </TouchableOpacity>
    </View>
  );
}
