
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import GS from "../../styles/globalstyles";



export default function MinForeningScreen() {
    return (
        <SafeAreaView style={GS.container} >

            <ScrollView>

                <View style={GS.card}>

                    {/* Foreningens kontakter */}
                    <View style={{ backgroundColor: '#f8f9fa', padding: 15, borderRadius: 10 }}>
                        {/* Overskrift */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <Ionicons name="people-outline" style={GS.icon} />
                            <Text style={GS.h2}>Kontakter</Text>
                        </View>

                        {/* Bestyrelse */}
                        <View style={{ marginBottom: 20 }}>
                            <Text style={GS.label}>Bestyrelse</Text>
                            <View style={{ paddingLeft: 15 }}>
                                <Text style={GS.bodyText}>• Formand: Lars Nielsen</Text>
                                <Text style={[GS.bodyText, { color: '#666' }]}>  📞 20 12 34 56 | ✉️ formand@forening.dk</Text>
                                <Text style={GS.bodyText}>• Næstformand: Anne Hansen</Text>
                                <Text style={[GS.bodyText, { color: '#666' }]}>  📞 30 45 67 89 | ✉️ naestformand@forening.dk</Text>
                                <Text style={GS.bodyText}>• Kasserer: Peter Andersen</Text>
                                <Text style={[GS.bodyText, { color: '#666' }]}>  📞 40 78 90 12 | ✉️ kasserer@forening.dk</Text>
                            </View>
                        </View>

                        {/* Administration */}
                        <View style={{ marginBottom: 20 }}>
                            <Text style={GS.label}>Administration</Text>
                            <View style={{ paddingLeft: 15 }}>
                                <Text style={GS.bodyText}>• Ejendomsadministrator: Boligselskab Nord</Text>
                                <Text style={[GS.bodyText, { color: '#666' }]}>  📞 70 10 20 30 | ✉️ admin@boligselskabnord.dk</Text>
                                <Text style={GS.bodyText}>• Vicevært: Jens Christensen</Text>
                                <Text style={[GS.bodyText, { color: '#666' }]}>  📞 25 67 89 01 | ✉️ vicevært@forening.dk</Text>
                            </View>
                        </View>

                        {/* Håndværkere */}
                        <View style={{ marginBottom: 10 }}>
                            <Text style={GS.label}>Håndværkere</Text>
                            <View style={{ paddingLeft: 15 }}>
                                <Text style={GS.bodyText}>• VVS: Hansen & Søn VVS</Text>
                                <Text style={[GS.bodyText, { color: '#666' }]}>  📞 86 12 34 56 | ✉️ kontakt@hansenvvs.dk</Text>
                                <Text style={GS.bodyText}>• El-installatør: Nordel A/S</Text>
                                <Text style={[GS.bodyText, { color: '#666' }]}>  📞 75 43 21 09 | ✉️ service@nordel.dk</Text>
                                <Text style={GS.bodyText}>• Låsesmed: Sikkerhed & Låse</Text>
                                <Text style={[GS.bodyText, { color: '#666' }]}>  📞 24/7: 80 90 12 34</Text>
                            </View>
                        </View>
                    </View>
                </View>




                <TouchableOpacity style={GS.touchableOpacity}>
                    <Ionicons name="document-text-outline" style={GS.icon} />
                    <Text style={GS.h2}>FAQ: hjælp og spørgsmål</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    )
}