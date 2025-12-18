//Siden min bolig, som brugeren navigere til via TabNavigator 
// fungerer som en slags container
// henter data fra firebase, context og props

// holder layout for hele siden

// kalder de mindre komponenter 

import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { logoutUser } from "../../services/firebase/auth";
import GS, { COLORS, SPACING } from "../../styles/globalstyles";

// viser hovedsiden for Min Bolig med navigation til undersider
export default function MinBoligHome({ navigation }) {
  const rows = [
    {
      key: 'Profil',
      title: 'Profil',
      subtitle: 'Din personlige info',
      icon: 'person-outline',
      navigateTo: 'Profil',
    },
    {
      key: 'Dokumenter',
      title: 'Dokumenter',
      subtitle: 'Dine filer og dokumenter',
      icon: 'document-outline',
      navigateTo: 'Dokumenter',
    },
    {
      key: 'Økonomi',
      title: 'Økonomi',
      subtitle: 'Betalinger og saldo',
      icon: 'cash-outline',
      navigateTo: 'Økonomi',
    },
    {
      key: 'Boligoplysninger',
      title: 'Boligoplysninger',
      subtitle: 'Adresse og detaljer',
      icon: 'home-outline',
      navigateTo: 'Boligoplysninger',
    },
  ];
  // håndterer bruger logout
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      Alert.alert('Fejl', 'Logout fejlede: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={GS.beskederContainer} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView style={GS.beskederScrollView} contentInsetAdjustmentBehavior="never">
        <View style={{ paddingHorizontal: GS.content.paddingHorizontal, paddingTop: GS.content.paddingTop, paddingBottom: GS.content.paddingBottom }}>
          <Text style={[GS.h1, { marginBottom: 24 }]}>Min bolig</Text>

          {rows.map((row) => (
            <TouchableOpacity
              key={row.key}
              onPress={() => navigation.navigate(row.navigateTo)}
              style={[GS.listCard, { paddingVertical: 12, paddingHorizontal: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' }]}
            >
              <Ionicons name={row.icon} size={22} color={GS.icon.color} style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: GS.h2.color }}>{row.title}</Text>
                <Text style={{ fontSize: 14, color: GS.help.color }}>{row.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={GS.icon.color} />
            </TouchableOpacity>
          ))}

          <TouchableOpacity 
            onPress={handleLogout}
            style={[{ paddingVertical: 12, paddingHorizontal: 16, marginTop: 24, marginBottom: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.danger, borderRadius: 8 }]}
          >
            <Ionicons name="log-out-outline" size={22} color="#fff" style={{ marginRight: 12 }} />
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff', flex: 1 }}>Log ud</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
