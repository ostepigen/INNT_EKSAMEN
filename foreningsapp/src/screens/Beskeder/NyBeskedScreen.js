// Skærm til at oprette ny besked til bestyrelsen
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
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
        <SafeAreaView edges={['left', 'right', 'bottom']} style={GS.screen}>
            <KeyboardAvoidingView 
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
            >
                <ScrollView style={{ flex: 1 }} contentContainerStyle={GS.content} showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={{ marginBottom: SPACING.xl }}>
    <Ionicons name="mail-outline" size={15} color={COLORS.primary} style={{ marginRight: SPACING.md }} />
                        <Text style={[GS.help, { color: COLORS.subtext }]}>Send en besked til en anden beboer
                     </Text>
                    </View>

                    {/* Form card */}
                    <View style={[GS.listCard, { overflow: 'hidden' }]}>
                        {/* Recipient dropdown */}
                        <View style={{ paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm }}>
                                <Ionicons name="person-outline" size={18} color={COLORS.primary} style={{ marginRight: SPACING.sm }} />
                                <Text style={[GS.label, { marginBottom: 0 }]}>Modtager</Text>
                            </View>
                            <Pressable 
                                style={[GS.valueBox, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]} 
                                onPress={() => setShowDropdown((s) => !s)}
                            >
                                <Text style={GS.valueText}>{users.find(u => u.uid === recipientUid)?.name || users.find(u => u.uid === recipientUid)?.email || 'Vælg modtager'}</Text>
                                <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={20} color={COLORS.subtext} />
                            </Pressable>
                            {showDropdown && (
                                <View style={{ borderWidth: 1, borderColor: COLORS.border, borderRadius: SPACING.r, marginTop: SPACING.sm, maxHeight: 240, backgroundColor: COLORS.card, overflow: 'hidden' }}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        {users.map((u, idx) => (
                                            <View key={u.uid}>
                                                <Pressable 
                                                    style={[{ paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md }, recipientUid === u.uid && { backgroundColor: COLORS.primary50 }]} 
                                                    onPress={() => { setRecipientUid(u.uid); setShowDropdown(false); }}
                                                >
                                                    <Text style={[GS.text, recipientUid === u.uid && { color: COLORS.primary, fontWeight: '600' }]}>{u.name || u.email}</Text>
                                                </Pressable>
                                                {idx < users.length - 1 && <View style={GS.listRowDivider} />}
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                        </View>

                        <View style={GS.listRowDivider} />

                        {/* Emne felt */}
                        <View style={{ paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm }}>
                                <Ionicons name="list-outline" size={18} color={COLORS.primary} style={{ marginRight: SPACING.sm }} />
                                <Text style={[GS.label, { marginBottom: 0 }]}>Emne</Text>
                            </View>
                            <TextInput
                                style={[GS.valueBox, { color: COLORS.text }]}
                                placeholder="Hvad handler beskeden om?"
                                placeholderTextColor={COLORS.subtext}
                                value={emne}
                                onChangeText={setEmne}
                                maxLength={100}
                            />
                            <Text style={[GS.help, { marginTop: SPACING.sm, textAlign: 'right' }]}>
                                {emne.length}/100
                            </Text>
                        </View>

                        <View style={GS.listRowDivider} />

                        {/* Besked felt */}
                        <View style={{ paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm }}>
                                <Ionicons name="document-text-outline" size={18} color={COLORS.primary} style={{ marginRight: SPACING.sm }} />
                                <Text style={[GS.label, { marginBottom: 0 }]}>Besked</Text>
                            </View>
                            <TextInput
                                style={[GS.valueBox, { 
                                    height: 140, 
                                    textAlignVertical: 'top',
                                    paddingTop: SPACING.md,
                                    color: COLORS.text
                                }]}
                                placeholder="Skriv din besked her..."
                                placeholderTextColor={COLORS.subtext}
                                value={besked}
                                onChangeText={setBesked}
                                multiline={true}
                                maxLength={500}
                            />
                            <Text style={[GS.help, { marginTop: SPACING.sm, textAlign: 'right' }]}>
                                {besked.length}/500 tegn
                            </Text>
                        </View>
                    </View>

                    <View style={{ height: SPACING.xl }} />

                    {/* Send knap */}
                    <Pressable 
                        style={[GS.btn, loading && { backgroundColor: COLORS.subtext }, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
                        onPress={sendBesked}
                        disabled={loading}
                    >
                        {!loading && <Ionicons name="send" size={18} color="white" style={{ marginRight: SPACING.sm }} />}
                        <Text style={GS.btnText}>
                            {loading ? "Sender..." : "Send besked"}
                        </Text>
                    </Pressable>

                    {/* Annuller knap */}
                    <Pressable 
                        style={[GS.btnGhost, { marginTop: SPACING.lg, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
                        onPress={() => navigation.goBack()}
                        disabled={loading}
                    >
                        <Ionicons name="close" size={18} color={COLORS.primary} style={{ marginRight: SPACING.sm }} />
                        <Text style={GS.btnGhostText}>Annuller</Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}