
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function DocumentsScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>
                    <View style={{ flex: 1, padding: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Mine dokumenter</Text>
                        <Text>Kontrakt og tilladelser</Text>
                        <Text>Varsling</Text>
                        <Text>Korrespondance</Text>
                        <Text>Regnskab</Text>
                        <Text>Budget</Text>
                        <Text>Drift og vedligeholdelse</Text>
                        <Text>Måske en knap til at lave en ny mappe</Text>
                    </View>
                </Text>
            </ScrollView>
        </SafeAreaView>
    )

}