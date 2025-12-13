
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import GS from "../../styles/globalstyles";

export default function DocumentsScreen({ navigation }) {
    const folders = [
        {
            key: 'vedtaegter',
            title: 'Vedtægter og husorden',
            subtitle: 'Foreningens regler',
            icon: 'document-text-outline',
            count: 2,
            documents: [
                {
                    title: 'Husregler',
                    date: 'Opdateret 2025',
                    url: 'https://res.cloudinary.com/dsjoirhgw/image/upload/v1765659338/Husregler_for_Fantasiga%CC%8Arden_mujfnd.pdf'
                },
                {
                    title: 'Vedtægter',
                    date: 'Gældende fra 2024',
                    url: null
                }
            ]
        },
        {
            key: 'generalforsamling',
            title: 'Generalforsamling',
            subtitle: 'Referater og dokumenter',
            icon: 'people-outline',
            count: 3,
            documents: [
                {
                    title: 'Referat 2024',
                    date: '15. november 2024',
                    url: null
                },
                {
                    title: 'Referat 2023',
                    date: '10. november 2023',
                    url: null
                },
                {
                    title: 'Dagsorden 2025',
                    date: 'Kommende',
                    url: null
                }
            ]
        },
        {
            key: 'budget',
            title: 'Budget',
            subtitle: 'Økonomi og regnskab',
            icon: 'calculator-outline',
            count: 1,
            documents: [
                {
                    title: 'Budget 2025',
                    date: 'Godkendt',
                    url: null
                }
            ]
        },
        {
            key: 'personlige',
            title: 'Personlige dokumenter',
            subtitle: 'Dine filer',
            icon: 'folder-outline',
            count: 0,
            documents: []
        }
    ];

    const handleFolderPress = (folder) => {
        navigation.navigate('FolderDetail', { folder });
    };

    return (
        <SafeAreaView style={GS.screen} edges={['left', 'right', 'bottom']}>
            <ScrollView style={GS.beskederScrollView} contentInsetAdjustmentBehavior="never">
                <View style={GS.content}>
                    {folders.map((folder, index) => (
                        <TouchableOpacity
                            key={folder.key}
                            onPress={() => handleFolderPress(folder)}
                            style={[GS.listCard, { paddingVertical: 12, paddingHorizontal: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' }]}
                        >
                            <Ionicons name={folder.icon} size={20} color={GS.icon.color} style={{ marginRight: 12 }} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: GS.h2.color }}>{folder.title}</Text>
                                <Text style={{ fontSize: 12, color: GS.help.color }}>{folder.subtitle} • {folder.count} {folder.count === 1 ? 'fil' : 'filer'}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color={GS.icon.color} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}