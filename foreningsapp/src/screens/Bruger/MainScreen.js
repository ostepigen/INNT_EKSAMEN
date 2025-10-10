// src/screens/MainScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase/db';
import GS from '../styles/globalstyles';

// Eksporterer komponenten 'MainScreen', som fungerer som hovedsiden efter login
export default function MainScreen() {
  // Henter den aktuelle brugers e-mail fra Firebase Authentication
  const userEmail = auth.currentUser?.email;

  // Funktion der håndterer logud-processen
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout fejlede:', error.message);
    }
  };

  return (
    <View style={[GS.screen, { alignItems: 'center', justifyContent: 'center' }]}>
      <Text style={GS.h2}>Hej {userEmail} </Text>
      <Text style={GS.help}>Du er nu logget ind!</Text>
      <TouchableOpacity style={[GS.btn, { marginTop: 20 }]} onPress={handleLogout}>
        <Text style={GS.btnText}>Log ud</Text>
      </TouchableOpacity>
    </View>
  );
}
