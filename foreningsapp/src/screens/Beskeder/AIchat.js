//den her fil er til AI chatten
//brugeren kan skrive spørgsmål til en AI bot og få svar tilbage
//input fra tekst sendes
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

//nøgle til open ai
// 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

export default function ChatScreen() {

    const [inputBesked, setInputBesked] = useState("");
    const [loading, setLoading] = useState(false);
    const [chatHistorik, setChatHistorik] = useState([]); // Array til at gemme alle beskeder

    // Fast dokument som AI'en altid har adgang til
    const foreningsKnowledge = `
    BOLIGFORENING KNOWLEDGE BASE:    
    REGLER:
    - Ingen kæledyr over 10 kg
    - Musik skal være dæmpet efter kl.19 i hverdage og kl. 22 i weekender
    - Rygning kun på altan eller udenfor
    
    KONTAKT:
    - Vicevært: 12 34 56 78
    - Bestyrelse: bestyrelse@forening.dk
    - Akut reparationer: Ring altid til vicevært først
    `;

    const sendKnapAI = async () => {
        if (!inputBesked.trim()) return; // Undgå tomme requests
        
        const brugerBesked = inputBesked.trim();
        console.log("Brugerens besked: " + brugerBesked);
        
        // Tilføj brugerens besked til historik med det samme
        const nyBrugerBesked = {
            id: Date.now(),
            type: 'user',
            message: brugerBesked,
            timestamp: new Date()
        };
        setChatHistorik(prev => [...prev, nyBrugerBesked]);
        
        setLoading(true);
        setInputBesked(""); // Ryd input felt med det samme
        
        try {
            // OPTIMERET TIL AT SPARE PENGE - Bruger GPT-3.5-turbo (billigere end GPT-4)
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
        // keyboardAvoidingView for at undgå at tastaturet dækker input feltet
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            <ScrollView style={{ flex: 1, padding: 20 }} contentContainerStyle={{ paddingBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>AI Chat</Text>
                
                {chatHistorik.length === 0 && (
                    <Text style={{ color: '#255d32ff', fontStyle: 'italic', textAlign: 'center', marginTop: 50 }}>
                        Stil et spørgsmål til AI bestyrelsesmedlemmet
                    </Text>
                )}
                
                {/* Vis alle beskeder i historikken */}
                {chatHistorik.map((besked) => (
                    <View key={besked.id} style={[
                        styles.messageContainer,
                        besked.type === 'user' ? styles.userMessage : 
                        besked.type === 'ai' ? styles.aiMessage : styles.errorMessage
                    ]}>
                        <Text style={[
                            styles.messageHeader,
                            besked.type === 'user' ? styles.userHeader : 
                            besked.type === 'ai' ? styles.aiHeader : styles.errorHeader
                        ]}>
                            {besked.type === 'user' ? '🧐 Dig:' : 
                             besked.type === 'ai' ? '🧐 AI Bestyrelsesmedlem:' : '⚠️ Fejl:'}
                        </Text>
                        <Text style={styles.messageText}>{besked.message}</Text>
                    </View>
                ))}
                
                {loading && (
                    <View style={styles.loadingContainer}>
                        <Text style={{ color: '#255d32ff' }}>AI bestyrelsesmedlem tænker over det bedste svar...</Text>
                    </View>
                )}
            </ScrollView>

            {/** Input sektion der forbliver i bunden */}
            <View style={styles.inputContainer}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <TextInput 
                        placeholder="Hvad har du brug for hjælp til?" 
                        onChangeText={tekstInputAI} 
                        value={inputBesked}
                        style={styles.textInput}
                        multiline={false}
                        returnKeyType="send"
                        onSubmitEditing={sendKnapAI}
                    />
                </View>

                <TouchableOpacity onPress={sendKnapAI} disabled={loading} style={styles.sendButton}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{loading ? '...' : 'Send'}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        borderColor: '#255d32ff',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: '#f9f9f9',
    },
    sendButton: {
        backgroundColor: '#255d32ff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        minWidth: 60,
        alignItems: 'center',
    },
    messageContainer: {
        marginVertical: 8,
        padding: 12,
        borderRadius: 12,
        maxWidth: '85%',
    },
    userMessage: {
        backgroundColor: '#255d32ff',
        alignSelf: 'flex-end',
    },
    aiMessage: {
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    errorMessage: {
        backgroundColor: '#ffebee',
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#ffcdd2',
    },
    messageHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    userHeader: {
        color: 'white',
    },
    aiHeader: {
        color: '#255d32ff',
    },
    errorHeader: {
        color: '#d32f2f',
    },
    messageText: {
        fontSize: 14,
        lineHeight: 20,
    },
    loadingContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 12,
        marginVertical: 8,
    },
});