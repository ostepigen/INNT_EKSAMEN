
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import GS, { COLORS, SPACING } from "../../styles/globalstyles";

export default function MinForeningScreen() {
    const [expandedId, setExpandedId] = useState(null);

    const bestyrelse = [
        {
            id: 1,
            title: "Bestyrelsen",
            subtitle: "Foreningens bestyrelse",
            members: [
                { rolle: "Formand", navn: "Lars Nielsen", telefon: "20 20 20 56", email: "lars@forening.dk" },
                { rolle: "Næstformand", navn: "Anne Hansen", telefon: "30 20 67 89", email: "anne@forening.dk" },
                { rolle: "Kasserer", navn: "Peter Andersen", telefon: "40 20 90 12", email: "peter@forening.dk" },
                { rolle: "Sekretær", navn: "Maria Jensen", telefon: "50 11 20 20", email: "maria@forening.dk" }
            ]
        }
    ];

    const driftskontakter = [
        {
            id: 2,
            title: "VVS & CO",
            subtitle: "VVS firma",
            email: "kontor@vvs.dk",
            telefon: "59 59 59 59",
            icon: "water"
        },
        {
            id: 3,
            title: "Københavns El-Service",
            subtitle: "Elektriker",
            email: "el@kbh.dk",
            telefon: "44 44 44 44",
            icon: "flash"
        }
    ];

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <SafeAreaView style={GS.screen} edges={['top', 'left', 'right', 'bottom']}>
            <ScrollView contentContainerStyle={GS.mfsContainer} contentInsetAdjustmentBehavior="never">
                
                {/* Bestyrelse sektion */}
                <View style={GS.mfsSectionHeader}>
                    <Text style={GS.h1}>Bestyrelsen</Text>
                </View>

                {bestyrelse.map((section, index) => (
                    <TouchableOpacity
                        key={section.id}
                        style={GS.mfsCard}
                        onPress={() => setExpandedId(expandedId === section.id ? null : section.id)}
                        activeOpacity={0.7}
                    >
                        <View style={GS.mfsCardHeader}>
                            <View style={{ flex: 1 }}>
                                <Text style={GS.mfsCardTitle}>
                                    {section.title}
                                </Text>
                                <Text style={GS.mfsCardSubtitle}>
                                    {section.subtitle}
                                </Text>
                            </View>
                            <Ionicons
                                name={expandedId === section.id ? "chevron-up" : "chevron-down"}
                                style={GS.mfsExpandChevron}
                            />
                        </View>

                        {expandedId === section.id && (
                            <View style={GS.mfsCardContent}>
                                {section.members.map((medlem, memberIndex) => (
                                    <View key={memberIndex} style={GS.mfsMemberBlock}>
                                        <Text style={[GS.label, { color: COLORS.primary, marginBottom: SPACING.xs }]}>
                                            {medlem.rolle}
                                        </Text>
                                        <Text style={[GS.help, { color: COLORS.text, fontWeight: '500', marginBottom: SPACING.xs }]}>
                                            {medlem.navn}
                                        </Text>
                                        <Text style={[GS.help, { color: COLORS.subtext, marginBottom: SPACING.xs }]}>
                                            📞 {medlem.telefon}
                                        </Text>
                                        <Text style={[GS.help, { color: COLORS.primary }]}>
                                            {medlem.email}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </TouchableOpacity>
                ))}

                {/* Driftskontakter sektion */}
                <View style={GS.mfsSectionHeader}>
                    <Text style={GS.h1}>Driftskontakter</Text>
                </View>

                {driftskontakter.map((kontakt, index) => (
                    <TouchableOpacity
                        key={kontakt.id}
                        style={[GS.mfsCard, { marginBottom: SPACING.lg }]}
                        onPress={() => toggleExpand(kontakt.id)}
                        activeOpacity={0.7}
                    >
                        {/* Header - Altid synlig */}
                        <View style={GS.mfsCardHeader}>
                            <View style={{ flex: 1 }}>
                                <Text style={GS.mfsCardTitle}>
                                    {kontakt.title}
                                </Text>
                                <Text style={GS.mfsCardSubtitle}>
                                    {kontakt.subtitle}
                                </Text>
                            </View>
                            <Ionicons
                                name={expandedId === kontakt.id ? "chevron-up" : "chevron-down"}
                                style={GS.mfsExpandChevron}
                            />
                        </View>

                        {/* Expandable content */}
                        {expandedId === kontakt.id && (
                            <View style={GS.mfsCardContent}>
                                {/* Email */}
                                <View style={{ marginBottom: SPACING.lg }}>
                                    <Text style={GS.mfsContactLabel}>
                                        E-mail
                                    </Text>
                                    <Text style={GS.mfsContactValue}>
                                        {kontakt.email}
                                    </Text>
                                </View>

                                {/* Telefon */}
                                <View>
                                    <Text style={GS.mfsContactLabel}>
                                        Arbejdstelefon
                                    </Text>
                                    <Text style={GS.mfsContactValue}>
                                        {kontakt.telefon}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}