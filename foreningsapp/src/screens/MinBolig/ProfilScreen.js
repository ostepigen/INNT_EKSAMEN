import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GS from '../../styles/globalstyles';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/firebase/db';
import userService from '../../services/firebase/userService';

export default function ProfilScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({ name: '', address: '', phone: '', email: '' });

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u);
                try {
                    const data = await userService.getUserProfile(u.uid);
                    if (data) setProfile((p) => ({ ...p, ...data }));
                    // sikrer at email altid er udfyldt
                    if (!data?.email && u.email) setProfile((p) => ({ ...p, email: u.email }));
                } catch (err) {
                    console.warn('Failed loading profile', err);
                }
            } else {
                setUser(null);
                setProfile({ name: '', address: '', phone: '', email: '' });
            }
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const onChange = (key, value) => setProfile((p) => ({ ...p, [key]: value }));

    // Gem profil funktion
    const onSave = async () => {
        if (!user) return Alert.alert('Fejl', 'Du skal være logget ind for at gemme din profil.');
        setLoading(true);
                try {
                const toSave = { ...profile };
                if (!toSave.email && user.email) toSave.email = user.email;
                await userService.setUserProfile(user.uid, toSave);
                Alert.alert('OK', 'Profil gemt');
                // Hvis vi blev kaldt som completion flow, gå videre til appen
                if (navigation && navigation.replace) {
                    navigation.replace('Tabs');
                }
        } catch (err) {
            console.warn(err);
            Alert.alert('Fejl ved gem', err.message || String(err));
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <SafeAreaView style={GS.container}>
            <ActivityIndicator size="large" />
        </SafeAreaView>
    );

    return (
        <SafeAreaView style={GS.container}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text style={GS.h2}>Min profil</Text>

                <View style={{ marginTop: 12 }}>
                    <Text style={GS.label}>Navn</Text>
                    <TextInput style={GS.textInput} value={profile.name} onChangeText={(t) => onChange('name', t)} placeholder="F.eks. Mette Jensen" />

                      <Text style={GS.label}>Adresse</Text>
                      <TextInput style={GS.textInput} value={profile.address} onChangeText={(t) => onChange('address', t)} placeholder="Gade 1, 1.th" />

                      <Text style={GS.label}>Telefon</Text>
                      <TextInput style={GS.textInput} value={profile.phone} onChangeText={(t) => onChange('phone', t)} placeholder="+45 12 34 56 78" keyboardType="phone-pad" />

                      <Text style={GS.label}>Email</Text>
                      <TextInput style={GS.textInput} value={profile.email} onChangeText={(t) => onChange('email', t)} placeholder="email@eksempel.dk" keyboardType="email-address" />

                                <TouchableOpacity style={[GS.button, GS.buttonPrimary]} onPress={onSave} disabled={loading}>
                                    <Text style={GS.buttonPrimaryText}>{loading ? 'Gemmer...' : 'Opdater profil'}</Text>
                                </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


