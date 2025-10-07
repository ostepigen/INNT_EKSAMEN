//Siden min bolig, som brugeren navigere til via TabNavigator 
// fungerer som en slags container
// henter data fra firebase, context og props

// holder layout for hele siden

// kalder de mindre komponenter 

import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import GS from "../../styles/globalstyles";
import { SPACING } from "../../styles/globalstyles";


export default function MinBoligHome({ navigation }) {
  return (
    <SafeAreaView style={GS.beskederContainer}>
      <ScrollView style={GS.beskederScrollView}>
        <View style={{ marginBottom: SPACING.xxl }}>
          <View style={GS.beskederHeader}>
            <Text style={GS.beskederTitle}>Hjemskærm til min profil og min bolig</Text>
          </View>


          {/* TouchableOpacity til min profil */}
          <TouchableOpacity
            style={GS.touchableOpacity}
            onPress={() => navigation.navigate('Profil')}
          >
            <Ionicons name="person-outline" style={GS.icon} />
            <Text style={GS.h2}>Profil</Text>
          </TouchableOpacity>

          {/* TouchableOpacity til min dokumenter */}
          <TouchableOpacity
            style={GS.touchableOpacity}
            onPress={() => navigation.navigate('Dokumenter')}
          >
            <Ionicons name="document-outline" style={GS.icon} />
            <Text style={GS.h2}>Dokumenter</Text>
          </TouchableOpacity>


          {/* TouchableOpacity til min økonomi */}
          <TouchableOpacity
            style={GS.touchableOpacity}
            onPress={() => navigation.navigate('Økonomi')}
          >
            <Ionicons name="cash-outline" style={GS.icon} />
            <Text style={GS.h2}>Økonomi</Text>
          </TouchableOpacity>


          {/* TouchableOpacity til min Boligoplysninger */}
          <TouchableOpacity
            style={GS.touchableOpacity}
            onPress={() => navigation.navigate('Boligoplysninger')}
          >
            <Ionicons name="home-outline" style={GS.icon} />
            <Text style={GS.h2}>Boligoplysninger</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  )

}
