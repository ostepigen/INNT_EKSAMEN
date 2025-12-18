
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GS, { COLORS, SPACING } from "../../styles/globalstyles";

export default function BoligInfoScreen() {
  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} style={GS.screen}>
      <ScrollView contentContainerStyle={GS.content}>
        <Text style={[GS.h1, { marginBottom: SPACING.xl }]}>Min bolig</Text>

        {/* Bolig info card */}
        <View style={[GS.listCard, { marginBottom: SPACING.lg }]}>
          <View style={GS.listRow}>
            <Text style={[GS.text, { color: COLORS.subtext }]}>Antal rum</Text>
            <Text style={GS.text}> 2</Text>
          </View>
          <View style={GS.listRowDivider} />

          <View style={GS.listRow}>
            <Text style={[GS.text, { color: COLORS.subtext }]}>Bruttoareal</Text>
            <Text style={GS.text}> 55 kvm</Text>
          </View>
          <View style={GS.listRowDivider} />

          <View style={GS.listRow}>
            <Text style={[GS.text, { color: COLORS.subtext }]}> Adresse</Text>
            <Text style={GS.text}> Eksempelvej 1</Text>
          </View>
          <View style={GS.listRowDivider} />

          <View style={GS.listRow}>
            <Text style={[GS.text, { color: COLORS.subtext }]}>Indflytningsdato</Text>
            <Text style={GS.text}> 01-09-2022</Text>
          </View>
        </View>

        {/* Medboende card */}
        <Text style={[GS.h2, { marginBottom: SPACING.md, marginTop: SPACING.lg }]}>Medboende</Text>
        <View style={GS.listCard}>
          <View style={GS.listRow}>
            <Text style={GS.help}>Der er ingen andre beboere registreret på denne bolig endnu.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}