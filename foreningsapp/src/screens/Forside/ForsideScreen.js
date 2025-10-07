import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../../styles/globalstyles";

//lege data til opslagftavle
const TEST_OPSLAG = [
    { id: 1, title: "Generalforsamling d. 15. november", content: "Husk at tilmelde jer senest d. 1. november.", bruger: "Admin", dato: "2025-10-01" },
    { id: 2, title: "Vandaflæsning", content: "Vandaflæsning finder sted i uge 42. Sæt venligst jeres aflæsning i postkassen.", bruger: "Admin", dato: "2025-10-02" },
    { id: 3, title: "Nyt affaldssystem", content: "Fra d. 1. december indføres et nyt affaldssystem. Læs mere på foreningens hjemmeside.", bruger: "Admin", dato: "2025-10-03" },
];


export default function ForsideScreen() {
    return (
        <SafeAreaView>
            <ScrollView>

                <View>
                    {/* Velkomsthilsen */}
                    <View>
                        <Text style={GlobalStyles.h2}>Hej "navn på bruger"</Text>
                    </View>

                    <View>
                        {/* loop gennem alle opslag fra TEST_OPSLAG */}
                        {TEST_OPSLAG.map(opslag => (
                            <View key={opslag.id} style={GlobalStyles.opslagContainer}>
                                <Text style={GlobalStyles.label}>{opslag.title}</Text>
                                <Text>{opslag.content}</Text>
                                <Text style={GlobalStyles.normaltekst}>Oprettet af: {opslag.bruger}</Text>
                            </View>
                        ))}
                    </View>
                </View>




                <Text>
                    <View style={{ flex: 1, padding: 12 }}>

                        <View style={GlobalStyles.opslagstavle}>
                            <Text style={GlobalStyles.overskrift}>OPSLAGSTAVLE</Text>

                            <View><Text style={GlobalStyles.normaltekst}>Ting fra kalenderen</Text></View>

                            <View><Text style={GlobalStyles.normaltekst}>Fremhævede beskeder</Text></View>

                            <View><Text style={GlobalStyles.normaltekst}>Alle opslag</Text></View>
                        </View>


                        <View>
                            <Text>
                                Evt tilpasset (Har du solgt din bolig, er der ting du skal huske i forskellige faser, har kunne den komme op det det der skulle huskes)
                                Brugertilpassede funktioner: ligesom man selv kan vælge hvad man ser på sin iphone kunne brugeren også selv tilpasse det. Feks hvis man gerne vil have at den viser hvilket tidspunkt på døgnet der er billigst strøm til at vaske
                            </Text>
                        </View>


                    </View>
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

//Forside skærm med opslagstavle, fremhævede ting, brugertilpassede funktioner
