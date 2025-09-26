
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ProfilScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>
                    <View style={{ flex: 1, padding: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Min profil</Text>
                        <Text>CPR: **********</Text>
                        <Text>Adresse: Eksempelvej 1</Text>
                        <Text>Telefon: +45 12345678</Text>
                        <Text>Email: test@email.com</Text>
                    </View>
                </Text>
            </ScrollView>
        </SafeAreaView>
    )

}