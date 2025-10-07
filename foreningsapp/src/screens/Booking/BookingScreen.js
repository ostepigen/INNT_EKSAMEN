import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import GS, { SPACING, cardVariant } from '../../styles/globalstyles';

// Liste over ressourcer der kan bookes
const RESOURCES = [
  { id: 'laundry', label: 'Vaskekælder' },
  { id: 'room',    label: 'Fælleslokale' },
];

export default function BookingScreen({ navigation }) {
  return (
    <View style={GS.screen}>
      <ScrollView contentContainerStyle={[GS.content, { paddingBottom: SPACING.xl }]}>
        <Text style={[GS.h1, { marginBottom: SPACING.lg }]}>Booking</Text>
        <Text style={[GS.help, { marginBottom: SPACING.xl }]}>Vælg hvad du vil booke</Text>

        {/* Viser en trykbar "kort" for hver ressource */}
        {RESOURCES.map((r) => (
          <View key={r.id} style={{ marginBottom: SPACING.lg }}>
            <Pressable
              style={cardVariant(false)}
              onPress={() => navigation.navigate('BookingDetail', { resource: r })} // Går til detaljeskærm
            >
              <Text style={GS.h2}>{r.label}</Text>
              <View style={{ height: SPACING.sm }} />
              <Text style={GS.help}>Tryk for at vælge dato og tidspunkt</Text>
            </Pressable>
          </View>
        ))}

        {/* Knap til at gå til oversigten over egne bookinger */}
        <Pressable onPress={() => navigation.navigate('MyBookings')} style={{ marginTop: SPACING.xl }}>
          <Text style={GS.btnGhostText}>Se mine bookinger</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
