//
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function BeskederScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>
                    <View style={{ flex: 1, padding: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Beskeder</Text>
                        <Text>BESKEDER SCREEN</Text>
                        <Text>Ulæste beskeder (Med titler øverst)

                        </Text>
                        <Text>Gamle beskeder</Text>
                        <Text>Send besked</Text>
                        <Text> AI avatar (AI bestyrelsesmedlem)</Text>
                    </View>
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}