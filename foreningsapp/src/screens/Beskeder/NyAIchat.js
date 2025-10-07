//TEST version af AI chatten
//brugeren kan skrive spørgsmål til en AI bot og få svar tilbage
//input fra tekst sendes
import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { HUSREGLER_DOKUMENT } from "../../data/husregler";
import GS from "../../styles/globalstyles";
import SendMessage from "../../services/request";

//AI billede fra Cloudinary (af en kvinde, som er bestyrelsesmedlem)
const TEST_AI_BILLEDE = "https://res.cloudinary.com/dsjoirhgw/image/upload/c_fill,w_50,h_50,q_auto/v1759848969/Sk%C3%A6rmbillede_2025-10-07_kl._16.54.16_kyuxcc.png";



export default function TestChatScreen() {
// states til input besked, loading indikator og chat historik
    const [inputBesked, setInputBesked] = useState("");
    const [loading, setLoading] = useState(false);
    const [chatHistorik, setChatHistorik] = useState([]); // array til at gemme alle beskeder i historikken

    //Henter husregler fra separat fil
    //TODO: Dette skal senere hentes fra database
    const foreningsKnowledge = HUSREGLER_DOKUMENT;

    //Send knap funktion til AI chatten
    const sendKnapAI = async () => {
        //hvis der ikke er nogen besked, så returner
        if (!inputBesked.trim()) return; //Undgå tomme requests

        // .trim() fjerner unødvendige mellemrum?
        const brugerBesked = inputBesked.trim();

        //tilføjer brugerens besked til historik med det samme
        const nyBrugerBesked = {
            id: Date.now(), // unik id baseret på tidspunkt
            type: 'user', // angiver at det er en brugerbesked
            message: brugerBesked, // selve beskeden som vi deklererede før
            timestamp: new Date() // nuværende tidspunkt
        };
        setChatHistorik(prev => [...prev, nyBrugerBesked]); // opdaterer historikken med den nye besked

        setLoading(true); // sætter loading til true mens vi venter på svar, så vi kan vise en loading indikator
        setInputBesked(""); // ryd input felt med det samme

// prøv at sende beskeden til AI'en
        try {
            // opret besked array til OpenAI
            const messageArray = [
                {
                    role: "system", // system besked der sætter konteksten for AI'en
                    content: `Du er et AI-bestyrelsesmedlem i en andelsboligforening. 
                            Du skal hjælpe beboerne med spørgsmål om foreningens regler på dansk.
                            Du har adgang til foreningens husregler: ${foreningsKnowledge}
                            
                            VIGTIG: Du er en TEST version, så nævn altid at du er i test-modus i dine svar.
                            Vær hjælpsom men gør det klart at dette er eksperimentelt.`
                },
                {
                    role: "user", // brugerens besked
                    content: brugerBesked // selve beskeden
                }
            ];

            // Brug SendMessage funktionen fra request.js
            const response = await SendMessage(messageArray); // sender besked array til OpenAI og venter på svar
            console.log("AI response:", response);

            // hvis vi får et svar tilbage
            if (response.content) {
                const aiBesked = {
                    id: Date.now() + 1,
                    type: 'ai',
                    message: response.content,
                    timestamp: new Date()
                };
                setChatHistorik(prev => [...prev, aiBesked]); // opdaterer historikken med AI'ens svar
            } else { // hvis der ikke er noget svar
                console.log("AI - Intet svar fra AI");
                const fejlBesked = {
                    id: Date.now() + 1,
                    type: 'error',
                    message: "AI - Kunne ikke få svar fra AI. Prøv igen.",
                    timestamp: new Date()
                };
                setChatHistorik(prev => [...prev, fejlBesked]); // opdaterer historikken med fejlbesked
            }

        } catch (error) { // hvis der opstår en fejl under forespørgslen
            console.error("AI - Netværksfejl:", error);
            const fejlBesked = {
                id: Date.now() + 1,
                type: 'error',
                message: "AI - Netværksfejl. Tjek din internetforbindelse.",
                timestamp: new Date()
            };
            setChatHistorik(prev => [...prev, fejlBesked]);
        } finally {
            setLoading(false); // uanset hvad, sæt loading til false når vi er færdige
        }
    }

    // funktion til at opdatere input besked state når brugeren skriver
    const tekstInputAI = (tekst) => {
        setInputBesked(tekst);
    }

    // render funktionen
    return (
        //keyboardAvoidingView for at undgå at tastaturet dækker input feltet
        <KeyboardAvoidingView
            style={GS.chatContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 20}
        >
            {/* ScrollView til at vise chat historik */}
            <ScrollView
                style={GS.chatScrollView}
                contentContainerStyle={GS.chatScrollContent}
                keyboardShouldPersistTaps="handled">

                <Text style={GS.chatTitle}>AI bestyrelsesmedlem</Text>

                {/* tekst der vises når der ikke er nogen beskeder */}
                {chatHistorik.length === 0 && (
                    <Text style={GS.chatPlaceholder}>
                        Stil et spørgsmål til AI bestyrelsesmedlemmet
                    </Text>
                )}

                {/* Vis alle beskeder i historikken */}
                {chatHistorik.map((besked) => (
                    <View key={besked.id} style={[
                        GS.messageContainer,
                        besked.type === 'user' ? GS.userMessage :
                            besked.type === 'ai' ? GS.aiMessage : GS.errorMessage
                    ]}>
                        <View style={GS.messageHeaderContainer}>
                            {besked.type === 'ai' && (
                                <Image
                                    source={{ uri: TEST_AI_BILLEDE }}
                                    style={GS.messageAvatar}
                                />
                            )}
                            <Text style={[
                                GS.messageHeader,
                                besked.type === 'user' ? GS.userHeader :
                                    besked.type === 'ai' ? GS.aiHeader : GS.errorHeader
                            ]}>
                                {/*senere kan emoji ændres til billede af beboer fra cloudinary*/}
                                {besked.type === 'user' ? '🧐 Dig:' : 
                                    besked.type === 'ai' ? 'AI Bestyrelsesmedlem:' : '⚠️ AI Fejl:'}
                            </Text>
                        </View>
                        <Text style={GS.messageText}>{besked.message}</Text>
                    </View>
                ))}

                {/* til når AI tænker */}
                {loading && (
                    <View style={GS.loadingContainer}>
                        <Text style={GS.loadingText}>AI bestyrelsesmedlem tænker over det bedste svar...</Text>
                    </View>
                )}
            </ScrollView>

            {/* Input sektion der forbliver i bunden */}
            <View style={GS.chatInputContainer}>
                <View style={GS.chatInputWrapper}>
                    <TextInput
                        placeholder="Hvad har du brug for hjælp til?" //tekst i input feltet inden brugeren skriver
                        onChangeText={tekstInputAI} // opdaterer state når brugeren skriver
                        value={inputBesked}
                        style={GS.chatTextInput}
                        multiline={false}
                        returnKeyType="send"
                        onSubmitEditing={sendKnapAI} // tryk på "send" på tastaturet sender beskeden
                    />
                </View>
                {/* Send knap. Viser '...' når der loader og viser 'Send' når der ikke loader */}
                <TouchableOpacity onPress={sendKnapAI} disabled={loading} style={GS.chatSendButton}>
                    <Text style={GS.chatSendButtonText}>{loading ? '...' : 'Send'}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    )
}