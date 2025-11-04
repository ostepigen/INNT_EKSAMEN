// Skærm til at oprette ny besked til bestyrelsen
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GS, { COLORS, SPACING } from "../../styles/globalstyles";
import userService from '../../services/firebase/userService';
import { auth } from '../../services/firebase/db';
import { onAuthStateChanged } from 'firebase/auth';

export default function NyBeskedScreen({ navigation }) {
    const [emne, setEmne] = useState("");
    const [besked, setBesked] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [recipientUid, setRecipientUid] = useState(null);

    useEffect(() => {
        let mounted = true;
        const unsubAuth = onAuthStateChanged(auth, async (u) => {
            if (!u) {
                if (mounted) {
                    setUsers([]);
                    setRecipientUid(null);
                }
                return;
            }
            try {
                const data = await userService.getAllUsers();
                const list = data ? Object.keys(data).map((k) => ({ uid: k, ...data[k] })) : [];
                const me = u.uid;
                const filtered = list.filter(user => user.uid !== me);
                if (mounted) {
                    setUsers(filtered);
                    if (filtered.length > 0) setRecipientUid(filtered[0].uid);
                }
            } catch (err) {
                console.warn('Failed loading users for recipient dropdown', err);
            }
        });
        return () => { mounted = false; unsubAuth(); };
    }, []);

    const sendBesked = async () => {
        if (!emne.trim() || !besked.trim()) {
            Alert.alert("Fejl", "Udfyld venligst både emne og besked");
            return;
        }
        if (!recipientUid) {
            Alert.alert('Fejl', 'Vælg en modtager');
            return;
        }
        setLoading(true);
        
        try {
            const senderUid = auth.currentUser?.uid;
            if (!senderUid) throw new Error('Ikke logget ind');
            const payload = {
                senderUid,
                recipientUid,
                subject: emne,
                text: besked,
            };
            await userService.pushMessage(recipientUid, payload);

            Alert.alert(
                "Besked sendt",
                "Din besked er sendt",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack()
                    }
                ]
            );
        } catch (error) {
            console.warn('Failed sending message', error);
            Alert.alert("Fejl", error.message || "Kunne ikke sende besked. Prøv igen.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={GS.screen}>
            <KeyboardAvoidingView 
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
            >
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={GS.content}>
                        <Text style={GS.h1}>Ny besked</Text>
                        <Text style={[GS.help, { marginBottom: SPACING.xl }]}>
                            Send en besked til bestyrelsen eller en anden beboer
                        </Text>

                        {/* Recipient dropdown */}
                        <Text style={GS.label}>Modtager</Text>
                        <TouchableOpacity style={GS.valueBox} onPress={() => setShowDropdown((s) => !s)}>
                            <Text>{users.find(u => u.uid === recipientUid)?.name || users.find(u => u.uid === recipientUid)?.email || 'Vælg modtager'}</Text>
                        </TouchableOpacity>
                        {showDropdown && (
                            <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 6, marginTop: 6, maxHeight: 180 }}>
                                <ScrollView>
                                    {users.map(u => (
                                        <TouchableOpacity key={u.uid} style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }} onPress={() => { setRecipientUid(u.uid); setShowDropdown(false); }}>
                                            <Text>{u.name || u.email}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}

                        {/* Emne felt */}
                        <Text style={GS.label}>Emne</Text>
                        <TextInput
                            style={GS.valueBox}

                            value={emne}
                            onChangeText={setEmne}
                            maxLength={100}
                        />

                        <View style={GS.cardSpacer} />

                        {/* Besked felt */}
                        <Text style={GS.label}>Besked</Text>
                        <TextInput
                            style={[GS.valueBox, { 
                                height: 120, 
                                textAlignVertical: 'top',
                                paddingTop: SPACING.md 
                            }]}
                            placeholder="Skriv din besked her..."
                            value={besked}
                            onChangeText={setBesked}
                            multiline={true}
                            maxLength={500}
                        />

                        <Text style={[GS.help, { marginTop: SPACING.sm }]}>
                            {besked.length}/500 tegn
                        </Text>

                        <View style={{ height: SPACING.xxl }} />

                        {/* Send knap */}
                        <TouchableOpacity 
                            style={[GS.btn, loading && { backgroundColor: COLORS.subtext }]}
                            onPress={sendBesked}
                            disabled={loading}
                        >
                            <Text style={GS.btnText}>
                                {loading ? "Sender..." : "Send besked"}
                            </Text>
                        </TouchableOpacity>

                        {/* Annuller knap */}
                        <TouchableOpacity 
                            style={[GS.btnGhost, { marginTop: SPACING.lg }]}
                            onPress={() => navigation.goBack()}
                            disabled={loading}
                        >
                            <Text style={GS.btnGhostText}>Annuller</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}