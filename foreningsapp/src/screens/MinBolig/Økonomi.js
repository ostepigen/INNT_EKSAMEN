
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ØkonomiScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>
                    <View style={{ flex: 1, padding: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Min bolig</Text>
                        <Text>Udstående (beløb): 5.000 kr. ADVARSEL</Text>
                        <Text>Seneste betaling: 01-08-2025 med husleje 5.000 kr., internet, acconto vand, varme , p-plads</Text>
                        <Text>Betalingshistorik:</Text>
                    </View>
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}