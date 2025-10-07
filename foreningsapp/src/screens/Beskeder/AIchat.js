//den her fil er til AI chatten
//brugeren kan skrive spørgsmål til en AI bot og få svar tilbage
//input fra tekst sendes
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { HUSREGLER_DOKUMENT } from "../../data/husregler";
import GS from "../../styles/globalstyles";

//nøgle til open ai
// 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

export default function ChatScreen() {

    const [inputBesked, setInputBesked] = useState("");
    const [loading, setLoading] = useState(false);
    const [chatHistorik, setChatHistorik] = useState([]); // Array til at gemme alle beskeder

    //Henter husregler fra separat fil
    //TODO: Dette skal senere hentes fra database
    const foreningsKnowledge = HUSREGLER_DOKUMENT;

    const sendKnapAI = async () => {
        if (!inputBesked.trim()) return; //Undgå tomme requests
        
        const brugerBesked = inputBesked.trim();
        console.log("Brugerens besked: " + brugerBesked);
        
        //Tilføj brugerens besked til historik med det samme
        const nyBrugerBesked = {
            id: Date.now(),
            type: 'user',
            message: brugerBesked,
            timestamp: new Date()
        };
        setChatHistorik(prev => [...prev, nyBrugerBesked]);
        
        setLoading(true);
        setInputBesked(""); //Ryd input felt med det samme
        
        try {
            //OPTIMERET TIL AT SPARE PENGE - Bruger GPT-3.5-turbo (billigere end GPT-4)
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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'
                },
                body: JSON.stringify({
                    "model": "gpt-3.5-turbo", // Billigste model (10x billigere end GPT-4)
                    "messages": [
                        {
                            "role": "system",
                            "content": `Du er et venligt og hjælpsomt bestyrelsesmedlem i en boligforening. 
                            
                            Du har adgang til følgende information om foreningen:
                            ${foreningsKnowledge}
                            
                            Besvar spørgsmål baseret på denne information. Hvis spørgsmålet ikke kan besvares ud fra informationen, sig det venligt og foreslå at kontakte bestyrelsen.
                            
                            Svar altid kort og præcist på dansk.`
                        },
                        {
                            "role": "user",
                            "content": inputBesked
                        }
                    ],
                    "max_tokens": 100, // Reduceret fra 150 for at spare penge
                    "temperature": 0.7
                })
            });

            const data = await response.json();
            
            // Debug: Se hele response objektet (kun i udvikling)
            console.log("Fuld AI response:", JSON.stringify(data, null, 2));
            
            // Tilbage til OpenAI format
            if (data.choices && data.choices[0] && data.choices[0].message) {
                const aiResponse = data.choices[0].message.content;
                console.log("AI svar:", aiResponse);
                
                // Tilføj AI svar til historik
                const nyAiSvar = {
                    id: Date.now() + 1,
                    type: 'ai',
                    message: aiResponse,
                    timestamp: new Date()
                };
                setChatHistorik(prev => [...prev, nyAiSvar]);
                
                // Log token forbrug for at holde øje med omkostninger
                if (data.usage) {
                    console.log(`Tokens brugt: ${data.usage.total_tokens} (Input: ${data.usage.prompt_tokens}, Output: ${data.usage.completion_tokens})`);
                }
            } else if (data.error) {
                console.log("API fejl:", data.error);
                const fejlBesked = {
                    id: Date.now() + 1,
                    type: 'error',
                    message: "Fejl: " + data.error.message,
                    timestamp: new Date()
                };
                setChatHistorik(prev => [...prev, fejlBesked]);
            } else {
                console.log("Fejl i response struktur:", data);
                const fejlBesked = {
                    id: Date.now() + 1,
                    type: 'error',
                    message: "Der skete en fejl. Prøv igen.",
                    timestamp: new Date()
                };
                setChatHistorik(prev => [...prev, fejlBesked]);
            }
            
        } catch (error) {
            console.error("Netværksfejl:", error);
            const fejlBesked = {
                id: Date.now() + 1,
                type: 'error',
                message: "Netværksfejl. Tjek din internetforbindelse.",
                timestamp: new Date()
            };
            setChatHistorik(prev => [...prev, fejlBesked]);
        } finally {
            setLoading(false);
        }
    }
    const tekstInputAI = (tekst) => {
        setInputBesked(tekst);
        console.log(tekst);
    }

    return (
        //keyboardAvoidingView for at undgå at tastaturet दækker input feltet
        <KeyboardAvoidingView 
            style={GS.chatContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 20}
        >
            <ScrollView 
                style={GS.chatScrollView} 
                contentContainerStyle={GS.chatScrollContent}
                keyboardShouldPersistTaps="handled">
                
                <Text style={GS.chatTitle}>AI Chat</Text>
                
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
                        <Text style={[
                            GS.messageHeader,
                            besked.type === 'user' ? GS.userHeader : 
                            besked.type === 'ai' ? GS.aiHeader : GS.errorHeader
                        ]}>
                            {besked.type === 'user' ? '🧐 Dig:' : 
                             besked.type === 'ai' ? '🧐 AI Bestyrelsesmedlem:' : '⚠️ Fejl:'}
                        </Text>
                        <Text style={GS.messageText}>{besked.message}</Text>
                    </View>
                ))}
                {/*AI tænker */}
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
                        placeholder="Hvad har du brug for hjælp til?" 
                        onChangeText={tekstInputAI} 
                        value={inputBesked}
                        style={GS.chatTextInput}
                        multiline={false}
                        returnKeyType="send"
                        onSubmitEditing={sendKnapAI}
                    />
                </View>

                <TouchableOpacity onPress={sendKnapAI} disabled={loading} style={GS.chatSendButton}>
                    <Text style={GS.chatSendButtonText}>{loading ? '...' : 'Send'}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    )
}

// Alle styles er nu flyttet til globalstyles.js