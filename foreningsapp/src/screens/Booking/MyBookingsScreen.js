// src/screens/Booking/MyBookingsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GS, { SPACING, COLORS, SHADOW } from '../../styles/globalstyles';

const STORAGE_KEY = 'BOOKINGS_V1';

export default function MyBookingsScreen() {
  const [data, setData] = useState([]);

  async function load() {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    setData(raw ? JSON.parse(raw) : []);
  }
  useEffect(() => { load(); }, []);

  async function clearAll() {
    Alert.alert('Slet alle', 'Vil du slette alle bookinger?', [
      { text: 'Annullér', style: 'cancel' },
      { text: 'Slet', style: 'destructive', onPress: async () => {
          await AsyncStorage.removeItem(STORAGE_KEY);
          load();
        } },
    ]);
  }

  const renderItem = ({ item }) => (
    <View style={[GS.card, SHADOW.card, { marginBottom: SPACING.lg, borderColor: COLORS.border }]}>
      <Text style={[GS.h2, { marginBottom: SPACING.sm }]}>{item?.resource?.label}</Text>
      <Text style={GS.help}>Dato: {item.date}</Text>
      <Text style={GS.help}>Tid: {item.time}</Text>
    </View>
  );

  return (
    <View style={GS.screen}>
      <View style={[GS.content, { paddingTop: SPACING.lg }]}>
        <Text style={[GS.h1, { marginBottom: SPACING.lg }]}>Mine bookinger</Text>

        <FlatList
          data={data}
          keyExtractor={(it) => it.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={GS.help}>Ingen bookinger endnu.</Text>}
          contentContainerStyle={{ paddingBottom: SPACING.xxl }}
        />

        <Pressable onPress={clearAll} style={[GS.btnGhost, { marginTop: SPACING.xl }]}>
          <Text style={GS.btnGhostText}>Ryd alle bookinger</Text>
        </Pressable>
      </View>
    </View>
  );
}
