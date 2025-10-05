//
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function BeskederScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <Text style={styles.title}>Beskeder</Text>


                    {/* TouchableOpacity for AI chat knap */}
                    <TouchableOpacity
                        style={styles.aiChatButton}
                        onPress={() => navigation.navigate('AIChat')}
                    >
                        {/* View til AI chatten */}
                        <View style={styles.aiChatContent}>
                            <View style={styles.aiIcon}>
                                <Text style={styles.aiEmoji}>🙋🏻‍♀️</Text>
                            </View>
                            <View style={styles.aiTextContainer}>
                                <Text style={styles.aiTitle}>AI Bestyrelsesmedlem</Text>
                                <Text style={styles.aiSubtitle}>Jeg kan hjælpe dig med hurtige svar</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color="#255d32ff" />
                        </View>
                    </TouchableOpacity>


                    {/* View til ulæste beskeder */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ulæste beskeder</Text>
                        <Text style={styles.placeholder}>Ingen nye beskeder</Text>
                    </View>

                    {/* View til gamle beskeder */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Tidligere beskeder</Text>
                        <Text style={styles.placeholder}>Ingen tidligere beskeder</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    aiChatButton: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    aiChatContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    aiIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#255d32ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    aiEmoji: {
        fontSize: 24,
    },
    aiTextContainer: {
        flex: 1,
    },
    aiTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#255d32ff',
        marginBottom: 2,
    },
    aiSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    placeholder: {
        fontSize: 14,
        color: '#999',
        fontStyle: 'italic',
    },
});