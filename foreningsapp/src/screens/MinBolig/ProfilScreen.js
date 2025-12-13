import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import GS, { COLORS, SPACING } from '../../styles/globalstyles';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/firebase/db';
import userService from '../../services/firebase/userService';

export default function ProfilScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [profile, setProfile] = useState({ name: '', address: '', phone: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u);
                try {
                    const data = await userService.getUserProfile(u.uid);
                    if (data) setProfile((p) => ({ ...p, ...data }));
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

    const onSave = async () => {
        if (!user) return Alert.alert('Fejl', 'Du skal være logget ind for at gemme din profil.');
        setIsSaving(true);
        try {
            const toSave = { ...profile };
            if (!toSave.email && user.email) toSave.email = user.email;
            await userService.setUserProfile(user.uid, toSave);
            Alert.alert('OK', 'Profil gemt');
            setIsEditing(false);
        } catch (err) {
            console.warn(err);
            Alert.alert('Fejl ved gem', err.message || String(err));
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return (
        <SafeAreaView style={GS.screen}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        </SafeAreaView>
    );

    return (
        <SafeAreaView style={GS.screen} edges={['left', 'right']}> 
            <ScrollView 
                contentContainerStyle={{ paddingTop: SPACING.md, paddingBottom: SPACING.lg }}
                automaticallyAdjustContentInsets={false}
                contentInsetAdjustmentBehavior="never"
                scrollIndicatorInsets={{ bottom: SPACING.sm }}
            >
                

                {/* Avatar og navn sektion */}
                <View style={{ alignItems: 'center', marginBottom: SPACING.lg }}>
                    {/* Avatar cirkel */}
                    <View style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        backgroundColor: '#e8f1f5',
                        borderWidth: 3,
                        borderColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: SPACING.lg,
                    }}>
                        <Ionicons name="person" size={60} color={COLORS.primary} />
                    </View>

                    {/* Kun navn under avatar */}
                    <Text style={[GS.h2, { textAlign: 'center', marginBottom: SPACING.xs }]}>
                        {profile.name || 'Dit navn'}
                    </Text>
                </View>

                {/* Personlige oplysninger sektion */}
                <View style={{ paddingHorizontal: SPACING.lg, marginBottom: SPACING.xl }}>
                    <Text style={[GS.h2, { marginBottom: SPACING.lg }]}>Personlige oplysninger</Text>

                    {/* Oplysninger kort */}
                    <View style={{
                        backgroundColor: '#fff',
                        borderRadius: SPACING.r,
                        borderWidth: 1,
                        borderColor: COLORS.border,
                        overflow: 'hidden',
                        marginBottom: SPACING.lg,
                    }}>
                        {/* Adresse */}
                        <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.border, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md }}>
                            <Text style={[GS.label, { color: COLORS.subtext, marginBottom: SPACING.xs }]}>
                                Adresse
                            </Text>
                            {isEditing ? (
                                <TextInput
                                    style={[GS.textInput, { borderWidth: 1 }]}
                                    value={profile.address}
                                    onChangeText={(t) => onChange('address', t)}
                                    placeholder="Gade 1, 1.th"
                                />
                            ) : (
                                <Text style={[GS.help, { color: COLORS.text, fontWeight: '500' }]}>
                                    {profile.address || '-'}
                                </Text>
                            )}
                        </View>

                        {/* Mobilnummer */}
                        <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.border, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md }}>
                            <Text style={[GS.label, { color: COLORS.subtext, marginBottom: SPACING.xs }]}>
                                Mobilnummer
                            </Text>
                            {isEditing ? (
                                <TextInput
                                    style={[GS.textInput, { borderWidth: 1 }]}
                                    value={profile.phone}
                                    onChangeText={(t) => onChange('phone', t)}
                                    placeholder="+45 12 34 56 78"
                                    keyboardType="phone-pad"
                                />
                            ) : (
                                <Text style={[GS.help, { color: COLORS.text, fontWeight: '500' }]}>
                                    {profile.phone || '-'}
                                </Text>
                            )}
                        </View>

                        {/* Email */}
                        <View style={{ paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md }}>
                            <Text style={[GS.label, { color: COLORS.subtext, marginBottom: SPACING.xs }]}>
                                E-mail
                            </Text>
                            {isEditing ? (
                                <TextInput
                                    style={[GS.textInput, { borderWidth: 1 }]}
                                    value={profile.email}
                                    onChangeText={(t) => onChange('email', t)}
                                    placeholder="email@eksempel.dk"
                                    keyboardType="email-address"
                                />
                            ) : (
                                <Text style={[GS.help, { color: COLORS.text, fontWeight: '500' }]}>
                                    {profile.email || '-'}
                                </Text>
                            )}
                        </View>
                    </View>


                    {/* Knapper */}
                    {isEditing ? (
                        <View style={{ gap: SPACING.md }}>
                            <TouchableOpacity
                                style={[GS.button, GS.buttonPrimary]}
                                onPress={onSave}
                                disabled={isSaving}
                            >
                                <Text style={GS.buttonPrimaryText}>
                                    {isSaving ? 'Gemmer...' : 'Gem ændringer'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[GS.button, GS.buttonSecondary]}
                                onPress={() => setIsEditing(false)}
                                disabled={isSaving}
                            >
                                <Text style={GS.buttonSecondaryText}>Annuller</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={[GS.button, GS.buttonPrimary]}
                            onPress={() => setIsEditing(true)}
                        >
                            <Text style={GS.buttonPrimaryText}>Rediger profil</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


