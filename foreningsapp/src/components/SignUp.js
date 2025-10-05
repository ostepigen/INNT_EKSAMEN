import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase/db';
import GS from '../styles/globalstyles';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Bruger oprettet!');
      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert('Fejl', error.message);
    }
  };

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
