
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function BookingScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>
                    <View style={{ flex: 1, padding: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Booking</Text>
                        <Text>BOOKING SCREEN</Text>
                    </View>
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}