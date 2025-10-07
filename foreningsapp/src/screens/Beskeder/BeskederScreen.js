//
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import GS from "../../styles/globalstyles";


//AI billede fra Cloudinary (af en kvinde, som er bestyrelsesmedlem)
const TEST_AI_BILLEDE = "https://res.cloudinary.com/dsjoirhgw/image/upload/c_fill,w_50,h_50,q_auto/v1759848969/Sk%C3%A6rmbillede_2025-10-07_kl._16.54.16_kyuxcc.png";



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
                            <Ionicons name="chevron-forward" size={24} color="#255d32ff" />
                        </View>
                    </TouchableOpacity>


                    {/* View til modtagede beskeder */}
                    <View style={GS.beskederSection}>
                        <Text style={GS.h2}>Modtagede beskeder</Text>
                        <Text style={GS.sectionPlaceholder}>Ulæste beskeder vil blive vist først og ældre under</Text>
                    </View>


                         {/* View til sendte beskeder */}
                    <View style={GS.beskederSection}>
                        <Text style={GS.h2}>Sendte beskeder</Text>
                        <Text style={GS.sectionPlaceholder}>Ingen sendte beskeder</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}