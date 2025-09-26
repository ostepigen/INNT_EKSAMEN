
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function BoligInfoScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>
                    <View style={{ flex: 1, padding: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Min bolig</Text>
                        <Text>Antal rum: 2</Text>
                        <Text>Bruttoareal: 55kvm</Text>
                        <Text>Adresse: Eksempelvej 1</Text>
                        <Text>Indflytningsdato: 01-09-2025</Text>
                        <Text>Liste over hvem der også bor i samme bolig</Text>
                    </View>
                </Text>
            </ScrollView>
        </SafeAreaView>
    )

}