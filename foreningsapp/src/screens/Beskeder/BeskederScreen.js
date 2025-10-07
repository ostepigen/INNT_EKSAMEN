//
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import GS from "../../styles/globalstyles";

export default function BeskederScreen({ navigation }) {
    return (
        <SafeAreaView style={GS.beskederContainer}>
            <ScrollView style={GS.beskederScrollView}>
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

                    {/* TouchableOpacity for AI chat knap */}
                    <TouchableOpacity
                        style={GS.aiChatButton}
                        onPress={() => navigation.navigate('AIChat')}
                    >
                        {/* View til AI chatten */}
                        <View style={GS.aiChatContent}>
                            <View style={GS.aiIcon}>
                                <Text style={GS.aiEmoji}>🙋🏻‍♀️</Text>
                            </View>
                            <View style={GS.aiTextContainer}>
                                <Text style={GS.aiTitle}>AI Bestyrelsesmedlem</Text>
                                <Text style={GS.aiSubtitle}>Jeg kan hjælpe dig med hurtige svar</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color="#255d32ff" />
                        </View>
                    </TouchableOpacity>


                    {/* View til ulæste beskeder */}
                    <View style={GS.beskederSection}>
                        <Text style={GS.sectionTitle}>Ulæste beskeder</Text>
                        <Text style={GS.sectionPlaceholder}>Ingen nye beskeder</Text>
                    </View>

                    {/* View til gamle beskeder */}
                    <View style={GS.beskederSection}>
                        <Text style={GS.sectionTitle}>Tidligere beskeder</Text>
                        <Text style={GS.sectionPlaceholder}>Ingen tidligere beskeder</Text>
                    </View>


                         {/* View til sendte beskeder */}
                    <View style={GS.beskederSection}>
                        <Text style={GS.sectionTitle}>Sendte beskeder</Text>
                        <Text style={GS.sectionPlaceholder}>Ingen sendte beskeder</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}