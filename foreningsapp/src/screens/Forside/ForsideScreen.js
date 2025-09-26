
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ForsideScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>
                    <View style={{ flex: 1, padding: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>FORSIDE</Text>
                        <Text>OPSLAGSTAVLE</Text>

                        <Text>Vigtige ting fra kalenderen der sker snart
                            Ting der er vigtige og skal fremhæves (Vand lukkes, arbejdsdag, bestyrelsesmøde)
                            Evt tilpasset (Har du solgt din bolig, er der ting du skal huske i forskellige faser, har kunne den komme op det det der skulle huskes)
                            Brugertilpassede funktioner: ligesom man selv kan vælge hvad man ser på sin iphone kunne brugeren også selv tilpasse det. Feks hvis man gerne vil have at den viser hvilket tidspunkt på døgnet der er billigst strøm til at vaske
                        </Text>
                    </View>
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}