//denne fil er til skærmen der viser brugerens egne bookinger
import React, { useEffect, useState } from 'react'; 
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../services/firebase/db';
import { listenToBookings, deleteBooking } from '../../services/firebase/userService';
import GS, { SPACING, COLORS } from '../../styles/globalstyles';
import { useIsFocused } from '@react-navigation/native';

//Definere de faciliteter der kan bookes (skal matche BookingScreen.js)
const RESOURCES = [
  { id: 'laundry', label: 'Vaskekælder' },
  { id: 'room', label: 'Fælleslokale' },
];

export default function MyBookingsScreen() {
  //State til at holde brugerens bookinger og alle bookinger
  const [myBookings, setMyBookings] = useState([]);
  const [allBookings, setAllBookings] = useState({});

  //Hent alle bookinger for hver ressource i realtid
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsubscribers = RESOURCES.map(resource => {
      return listenToBookings(resource.id, (data) => {
        setAllBookings(prev => ({ ...prev, [resource.id]: data || {} }));
      });
    });

    return () => unsubscribers.forEach(u => u());
  }, []);

  //Filtrer og sorter brugerens egne bookinger når alle bookinger opdateres
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const mine = [];
    RESOURCES.forEach(resource => {
      const resourceBookings = allBookings[resource.id] || {};
      Object.keys(resourceBookings).forEach(key => {
        const booking = resourceBookings[key];
        if (booking.userId === user.uid) {
          mine.push({ id: key, resourceId: resource.id, resourceLabel: resource.label, ...booking });
        }
      });
    });
    mine.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('.').map(Number);
      const [dayB, monthB, yearB] = b.date.split('.').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA, a.startHour || a.hour || 0);
      const dateB = new Date(yearB, monthB - 1, dayB, b.startHour || b.hour || 0);
      return dateB - dateA;
    });
    setMyBookings(mine);
  }, [allBookings]);

  //Funktion til at slette en booking
  async function deleteBooking(booking) {
    Alert.alert('Slet booking', 'Er du sikker?', [
      { text: 'Annullér', style: 'cancel' },
      { text: 'Slet', style: 'destructive', onPress: async () => {
        try {
          await deleteBooking(booking.resourceId, booking.id);
          Alert.alert('Slettet', 'Booking er fjernet');
        } catch (e) {
          Alert.alert('Fejl', e?.message || 'Kunne ikke slette booking');
        }
      }},
    ]);
  }

  return (
    <SafeAreaView style={GS.screen} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentInsetAdjustmentBehavior="never">
        <View style={GS.content}>
          <Text style={[GS.h1, { marginBottom: SPACING.lg }]}>Mine bookinger</Text>

          {myBookings.length === 0 ? (
            <View style={[GS.card, { padding: SPACING.xl, alignItems: 'center' }]}>
              <Text style={GS.help}>Ingen bookinger endnu.</Text>
            </View>
          ) : (
            myBookings.map((booking) => (
              <View key={booking.id} style={[GS.card, { marginBottom: SPACING.lg }]}>
                <Text style={[GS.h2, { marginBottom: SPACING.xs }]}>{booking.resourceLabel}</Text>
                <Text style={GS.help}>Dato: {booking.date}</Text>
                <Text style={GS.help}>
                  Tid: {booking.startHour !== undefined 
                    ? `${String(booking.startHour).padStart(2, '0')}:00 - ${String(booking.endHour).padStart(2, '0')}:00`
                    : `${booking.hour}:00`}
                </Text>
                <Pressable onPress={() => deleteBooking(booking)} style={{ marginTop: SPACING.md }}>
                  <Text style={{ color: COLORS.danger, fontSize: 14, fontWeight: '600' }}>Slet booking</Text>
                </Pressable>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
