//
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import GS from "../../styles/globalstyles";
import { auth } from '../../services/firebase/db';
import { onAuthStateChanged } from 'firebase/auth';
import userService from '../../services/firebase/userService';


//AI billede fra Cloudinary (af en kvinde, som er bestyrelsesmedlem)
const TEST_AI_BILLEDE = "https://res.cloudinary.com/dsjoirhgw/image/upload/c_fill,w_50,h_50,q_auto/v1759848969/Sk%C3%A6rmbillede_2025-10-07_kl._16.54.16_kyuxcc.png";



export default function BeskederScreen({ navigation }) {
    const [received, setReceived] = useState([]);
    const [sent, setSent] = useState([]);
    const [users, setUsers] = useState({});

    useEffect(() => {
        let unsubMessages = null;
        let unsubSent = null;
        let unsubAuth = null;
        unsubAuth = onAuthStateChanged(auth, async (u) => {
            if (!u) {
                setReceived([]); setSent([]); setUsers({});
                return;
            }
            const uid = u.uid;
            // load users map for name lookups
            try {
                const all = await userService.getAllUsers();
                const map = all ? Object.keys(all).reduce((acc,k) => { acc[k] = all[k]; return acc; }, {}) : {};
                setUsers(map);
            } catch (e) {
                console.warn('Failed loading users map', e);
            }

            unsubMessages = userService.listenToMessages(uid, (data) => {
                const list = data ? Object.keys(data).map(k => ({ id: k, ...data[k] })) : [];
                list.sort((a,b) => (b.createdAt || 0) - (a.createdAt || 0));
                setReceived(list);
            });

            unsubSent = userService.listenToSentMessages(uid, (data) => {
                const list = data ? Object.keys(data).map(k => ({ id: k, ...data[k] })) : [];
                list.sort((a,b) => (b.createdAt || 0) - (a.createdAt || 0));
                setSent(list);
            });
        });

        return () => {
            if (unsubMessages) unsubMessages();
            if (unsubSent) unsubSent();
            if (unsubAuth) unsubAuth();
        };
    }, []);

    return (
        <SafeAreaView style={GS.beskederContainer} edges={['left', 'right', 'bottom']}>
            <ScrollView style={GS.beskederScrollView} contentInsetAdjustmentBehavior="never">
                <View style={GS.beskederContent}>
                    <View style={GS.beskederHeader}>
                        <Text style={GS.beskederTitle}>Beskeder</Text>

                          {/* TouchableOpacity til ny besked knap */}
                        <TouchableOpacity
                            style={GS.newMessageButtonSmall}
                            onPress={() => navigation.navigate('NyBesked')}
                        >
                            <Ionicons name="create-outline" size={20} color="#fff" />
                            <Text style={GS.newMessageButtonText}>Send ny besked</Text>
                        </TouchableOpacity>
                    </View>


                    {/* TouchableOpacity til NY AI CHAT */}
                    <TouchableOpacity
                        style={GS.aiChatButton}
                        onPress={() => navigation.navigate('NYAIChat')}
                    >
                        {/* View til NY AI chatten */}
                        <View style={GS.aiChatContent}>
                            <View style={GS.aiIcon}>

                                      {/* billede fra cloudinary */}
                                      <Image
                                          source={{ uri: TEST_AI_BILLEDE }}
                                          style={GS.aiImage}
                                      />
                            </View>
                            <View style={GS.aiTextContainer}>
                                <Text style={GS.aiTitle}>AI Bestyrelsesmedlem</Text>
                                <Text style={GS.aiSubtitle}>Jeg kan hjælpe dig med hurtige svar</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color={GS.icon.color} />
                        </View>
                    </TouchableOpacity>


                    {/* View til modtagede beskeder */}
                    <View style={GS.beskederSection}>
                        <Text style={GS.h2}>Modtagede beskeder</Text>
                        {received.length === 0 ? (
                            <Text style={GS.sectionPlaceholder}>Ingen modtagede beskeder</Text>
                        ) : (
                            received.map(m => (
                                <View key={m.id} style={GS.messageItem}>
                                    <Text style={GS.messageSubject}>{m.subject}</Text>
                                    <Text style={GS.messagePreview}>{m.text}</Text>
                                    <Text style={GS.messageMeta}>Fra: {users[m.senderUid]?.name || m.senderUid} • {m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}</Text>
                                </View>
                            ))
                        )}
                    </View>


                         {/* View til sendte beskeder */}
                    <View style={GS.beskederSection}>
                        <Text style={GS.h2}>Sendte beskeder</Text>
                        {sent.length === 0 ? (
                            <Text style={GS.sectionPlaceholder}>Ingen sendte beskeder</Text>
                        ) : (
                            sent.map(m => (
                                <View key={m.id} style={GS.messageItem}>
                                    <Text style={GS.messageSubject}>{m.subject}</Text>
                                    <Text style={GS.messagePreview}>{m.text}</Text>
                                    <Text style={GS.messageMeta}>Til: {users[m.recipientUid]?.name || m.recipientUid} • {m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}</Text>
                                </View>
                            ))
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}