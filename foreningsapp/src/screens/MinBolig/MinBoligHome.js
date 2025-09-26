//Siden min bolig, som brugeren navigere til via TabNavigator 
// fungerer som en slags container
// henter data fra firebase, context og props

// holder layout for hele siden

// kalder de mindre komponenter 

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function MinBoligHome({ navigation }) {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Min bolig og profil</Text>
      <Button title="Min profil" onPress={() => navigation.navigate("Profil")} />
      <Button title="Dokumenter" onPress={() => navigation.navigate("Dokumenter")} />
      <Button title="Økonomi" onPress={() => navigation.navigate("Økonomi")} />
      <Button title="Boligoplysninger" onPress={() => navigation.navigate("Boligoplysninger")} />
    </View>
    )

}
//ændrer styles til globalt stylesheet
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
});