import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../../styles/globalstyles";


export default function ForsideScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
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
