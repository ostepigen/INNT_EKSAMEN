// Skærm til at oprette ny besked til bestyrelsen
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GS, { COLORS, SPACING } from "../../styles/globalstyles";

export default function NyBeskedScreen({ navigation }) {
    const [emne, setEmne] = useState("");
    const [besked, setBesked] = useState("");
    const [loading, setLoading] = useState(false);

    const sendBesked = async () => {
        if (!emne.trim() || !besked.trim()) {
            Alert.alert("Fejl", "Udfyld venligst både emne og besked");
            return;
        }

        setLoading(true);
        
        try {
            // TODO: Her skal beskeden sendes til database/firebase
            // For nu simulerer vi bare at den sendes
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            Alert.alert(
                "Besked sendt", 
                "Din besked er sendt til bestyrelsen",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack()
                    }
                ]
            );
        } catch (error) {
            Alert.alert("Fejl", "Kunne ikke sende besked. Prøv igen.");
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