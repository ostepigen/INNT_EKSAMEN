import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GS, { SPACING, cardVariant } from '../../styles/globalstyles';

const RESOURCES = [
  { id: 'laundry', label: 'Vaskekælder' },
  { id: 'room',    label: 'Fælleslokale' },
];

export default function BookingScreen({ navigation }) {
  return (
    <SafeAreaView style={GS.screen} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={[GS.content, { paddingBottom: SPACING.xl }]} contentInsetAdjustmentBehavior="never">
        <Text style={[GS.h1, { marginBottom: SPACING.lg }]}>Booking</Text>
        <Text style={[GS.help, { marginBottom: SPACING.xl }]}>Vælg hvad du vil booke</Text>

        {RESOURCES.map((r) => (
          <View key={r.id} style={{ marginBottom: SPACING.lg }}>
            <Pressable
              style={cardVariant(false)}
              onPress={() => navigation.navigate('BookingDetail', { resource: r })}
            >
              <Text style={GS.h2}>{r.label}</Text>
              <View style={{ height: SPACING.sm }} />
              <Text style={GS.help}>Tryk for at vælge dato og tidspunkt</Text>
            </Pressable>
          </View>
        ))}

        <Pressable onPress={() => navigation.navigate('MyBookings')} style={[GS.btnGhost, { marginTop: SPACING.xl }]}>
          <Text style={GS.btnGhostText}>Se mine bookinger</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
