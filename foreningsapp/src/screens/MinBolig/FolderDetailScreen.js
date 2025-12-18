import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import GS from "../../styles/globalstyles";

export default function FolderDetailScreen({ route }) {
    const { folder } = route.params;

    const openDocument = async (doc) => {
        if (doc.url) {
            const supported = await Linking.canOpenURL(doc.url);
            if (supported) {
                await Linking.openURL(doc.url);
            } else {
                Alert.alert("Fejl", "Kan ikke åbne dokumentet");
            }
        } else {
            Alert.alert(doc.title, "Dokument kommer snart");
        }
    };

    return (
        <SafeAreaView style={GS.screen} edges={['top', 'left', 'right', 'bottom']}>
            <ScrollView style={GS.beskederScrollView} contentInsetAdjustmentBehavior="never">
                <View style={GS.content}>
                    <Text style={[GS.h1, { marginBottom: 8 }]}>{folder.title}</Text>
                    <Text style={[GS.help, { marginBottom: 24 }]}>{folder.subtitle}</Text>

                    {folder.documents && folder.documents.length > 0 ? (
                        folder.documents.map((doc, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => openDocument(doc)}
                                style={[GS.listCard, { paddingVertical: 12, paddingHorizontal: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' }]}
                            >
                                <Ionicons name="document-text" size={20} color={GS.icon.color} style={{ marginRight: 12 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 16, fontWeight: '600', color: GS.h2.color }}>{doc.title}</Text>
                                    {doc.date && <Text style={{ fontSize: 12, color: GS.help.color }}>{doc.date}</Text>}
                                </View>
                                <Ionicons name="open-outline" size={18} color={GS.icon.color} />
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={[GS.card, { padding: 24, alignItems: 'center' }]}>
                            <Text style={GS.help}>Ingen dokumenter i denne mappe</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
