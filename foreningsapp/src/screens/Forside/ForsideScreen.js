import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GS, { SPACING } from "../../styles/globalstyles";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/firebase/db';
import userService from '../../services/firebase/userService';

//lege data til opslagftavle
const TEST_OPSLAG = [
    { id: 1, title: "Generalforsamling d. 15. november", content: "Husk at tilmelde jer senest d. 1. november.", bruger: "Admin", dato: "2025-10-01" },
    { id: 2, title: "Vandaflæsning", content: "Vandaflæsning finder sted i uge 42. Sæt venligst jeres aflæsning i postkassen.", bruger: "Admin", dato: "2025-10-02" },
    { id: 3, title: "Nyt affaldssystem", content: "Fra d. 1. december indføres et nyt affaldssystem. Læs mere på foreningens hjemmeside.", bruger: "Admin", dato: "2025-10-03" },
];


export default function ForsideScreen({ navigation }) {
    const [displayName, setDisplayName] = useState('');
    const [opslagList, setOpslagList] = useState([]);
// Hent brugerens navn til velkomsthilsen
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setDisplayName('');
                return;
            }
            try {
                const profile = await userService.getUserProfile(user.uid);
                if (profile && profile.name) {
                    setDisplayName(profile.name);
                } else if (user.displayName) {
                    setDisplayName(user.displayName);
                } else if (user.email) {
                    const nameFromEmail = user.email.split('@')[0];
                    setDisplayName(nameFromEmail);
                } else {
                    setDisplayName('');
                }
            } catch (err) {
                console.warn('Failed to load user profile for greeting', err);
                setDisplayName(user.displayName || user.email?.split('@')[0] || '');
            }
        });
        return () => unsub();
    }, []);

    // listen for opslag in realtime
    useEffect(() => {
        const unsub = userService.listenToOpslag((data) => {
            // data is an object keyed by id -> value
            const list = data ? Object.keys(data).map((k) => ({ id: k, ...data[k] })) : [];
            // sort so important first then by createdAt desc
            list.sort((a, b) => {
                if ((b.important ? 1 : 0) - (a.important ? 1 : 0) !== 0) return (b.important ? 1 : 0) - (a.important ? 1 : 0);
                return (b.createdAt || 0) - (a.createdAt || 0);
            });
            setOpslagList(list);
        });
        return () => unsub && unsub();
    }, []);

    return (
        <SafeAreaView style={GS.screen} edges={['left', 'right', 'bottom']}>
            <ScrollView contentInsetAdjustmentBehavior="never">
                <View style={GS.content}>
                    {/* Velkomsthilsen */}
                    <View style={{ marginBottom: SPACING.lg }}>
                        <Text style={GS.h1}>Hej {displayName ? displayName : 'bruger'}</Text>
                        <Text style={GS.help}>Velkommen tilbage</Text>
                    </View>

                    {/* Ny opslag knap */}
                    <TouchableOpacity style={[GS.btnSmall, { marginBottom: SPACING.xl }]} onPress={() => navigation.navigate('NyOpslag')}>
                        <Text style={GS.btnSmallText}>Lav nyt opslag</Text>
                    </TouchableOpacity>

                    {/* Opslagstavle */}
                    <View style={{ marginBottom: SPACING.md }}>
                        <Text style={GS.h2}>Opslagstavle</Text>
                    </View>

                    {opslagList.map(opslag => (
                        <View key={opslag.id} style={GS.opslagContainer}>
                            <Text style={GS.label}>
                                {opslag.title} {opslag.important ? '🔴' : ''}
                            </Text>
                            <Text style={GS.help}>
                                {opslag.createdAt ? new Date(opslag.createdAt).toLocaleString() : ''}
                            </Text>
                            
                            {/* Vis billede hvis der er et */}
                            {opslag.imageUrl && (
                                <Image 
                                    source={{ uri: opslag.imageUrl }} 
                                    style={{ width: '100%', height: 200, borderRadius: 8, marginVertical: SPACING.md }}
                                    resizeMode="cover"
                                />
                            )}
                            
                            <Text style={{ marginTop: SPACING.sm, color: '#222' }}>{opslag.text}</Text>
                            <Text style={[GS.help, { marginTop: SPACING.sm }]}>Oprettet af: {opslag.senderName}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

//Forside skærm med opslagstavle, fremhævede ting, brugertilpassede funktioner
