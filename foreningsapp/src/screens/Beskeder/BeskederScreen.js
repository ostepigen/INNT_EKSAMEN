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
    const [expandedSection, setExpandedSection] = useState(null); // 'received' or 'sent'

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

    // Filter ulæste beskeder (dem uden 'read' flag eller read=false)
    const unreadMessages = received.filter(m => !m.read);

    const handleMarkAsRead = async (messageId) => {
        try {
            const uid = auth.currentUser?.uid;
            if (!uid) return;
            await userService.markMessageAsRead(uid, messageId);
        } catch (e) {
            console.warn('Failed marking message as read', e);
        }
    };

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


                    {/* Ulæste beskeder - altid synlige */}
                    <View style={GS.beskederSection}>
                        <Text style={GS.h2}>Ulæste beskeder</Text>
                        {unreadMessages.length === 0 ? (
                            <Text style={GS.sectionPlaceholder}>Ingen ulæste beskeder</Text>
                        ) : (
                            unreadMessages.map(m => (
                                <View key={m.id} style={[GS.messageItem, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={GS.messageSubject}>{m.subject}</Text>
                                        <Text style={GS.messagePreview}>{m.text}</Text>
                                        <Text style={GS.messageMeta}>Fra: {users[m.senderUid]?.name || m.senderUid} • {m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}</Text>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => handleMarkAsRead(m.id)}
                                        style={{ padding: 8, marginLeft: 8 }}
                                    >
                                        <Ionicons name="checkmark-circle-outline" size={24} color="#4CAF50" />
                                    </TouchableOpacity>
                                </View>
                            ))
                        )}
                    </View>


                    {/* Modtagede beskeder - expandable */}
                    <TouchableOpacity 
                        style={[GS.messageItem, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
                        onPress={() => setExpandedSection(expandedSection === 'received' ? null : 'received')}
                    >
                        <Text style={GS.h2}>Modtagede beskeder ({received.length})</Text>
                        <Ionicons 
                            name={expandedSection === 'received' ? "chevron-up" : "chevron-down"} 
                            size={24} 
                            color={GS.icon.color} 
                        />
                    </TouchableOpacity>
                    {expandedSection === 'received' && (
                        <View style={GS.beskederSection}>
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
                    )}


                    {/* Sendte beskeder - expandable */}
                    <TouchableOpacity 
                        style={[GS.messageItem, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
                        onPress={() => setExpandedSection(expandedSection === 'sent' ? null : 'sent')}
                    >
                        <Text style={GS.h2}>Sendte beskeder ({sent.length})</Text>
                        <Ionicons 
                            name={expandedSection === 'sent' ? "chevron-up" : "chevron-down"} 
                            size={24} 
                            color={GS.icon.color} 
                        />
                    </TouchableOpacity>
                    {expandedSection === 'sent' && (
                        <View style={GS.beskederSection}>
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
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}