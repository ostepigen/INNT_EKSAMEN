
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ForeningScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>
                    <View style={{ flex: 1, padding: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Foreningen</Text>
                        <Text>FORENING SCREEN</Text>
                        <Text>Kontakter(Opdelt i roller):
                            <Text>Administrationen, Bestyrelse, Håndværker</Text>
                            <Text>Bestyrelsen, Håndværker</Text>
                            <Text>Håndværkere og VVS'ere</Text>
                        </Text>

                        <Text>Andele og andre beboere (hvis foreningen ønsker det vist )
                        </Text>
                        <Text>FAQ: hjælp og spørgsmål</Text>

                    </View>
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}