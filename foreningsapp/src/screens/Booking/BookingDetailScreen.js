import React, { useState } from 'react';
import { View, Text, Pressable, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import GS, { SPACING } from '../../styles/globalstyles';

const STORAGE_KEY = 'BOOKINGS_V1'; // Bruges til at gemme bookinger lokalt i AsyncStorage

// Hjælpefunktioner til formatering og id
const fmtDate = (d) => `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`; // Konverterer dato til tekst
const fmtTime = (d) => `${String(d.getHours()).padStart(2, '0')}.${String(d.getMinutes()).padStart(2, '0')}`; // Konverterer tid til tekst
const uid = () => `${Date.now()}`; // Genererer simpelt unikt id baseret på tidspunkt

export default function BookingDetailScreen() {
  const navigation = useNavigation(); // Bruges til at skifte skærm
  const { params } = useRoute(); // Henter parametre fra navigationen
  const resource = params?.resource || { id: 'unknown', label: 'Ressource' }; // Den valgte ressource

  // States til dato og tid, samt om vælgerne vises
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  // Når brugeren vælger dato
  const onPickDate = (_, selected) => {
    setShowDate(Platform.OS === 'ios'); // iOS holder picker åben
    if (selected) setDate(selected);
  };

  // Når brugeren vælger tidspunkt
  const onPickTime = (_, selected) => {
    setShowTime(Platform.OS === 'ios');
    if (selected) setTime(selected);
  };

  // Gemmer booking i AsyncStorage
  async function saveBooking() {
    try {
      const snapshot = await AsyncStorage.getItem(STORAGE_KEY); // Hent eksisterende data
      const list = snapshot ? JSON.parse(snapshot) : []; // Hvis ingen data, lav tom liste
      list.push({
        id: uid(),
        resource,
        date: fmtDate(date),
        time: fmtTime(time),
      });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list)); // Gem opdateret liste
      Alert.alert('Gemt', 'Din booking er gemt.'); // Bekræft besked
      navigation.navigate('MyBookings'); // Gå til skærmen med bookinger
    } catch (e) {
      Alert.alert('Fejl', e?.message || 'Kunne ikke gemme booking');
    }
  }

  return (
    <View style={GS.screen}>
      <View style={GS.content}>
        <Text style={[GS.h1, { marginBottom: SPACING.xl }]}>{resource.label}</Text>

        {/* Sektion for valg af dato */}
        <View style={GS.rowHeader}><Text style={GS.label}>Dato</Text></View>
        <Pressable style={GS.valueBox} onPress={() => setShowDate(true)}>
          <Text style={GS.valueText}>{fmtDate(date)}</Text>
        </Pressable>
        {showDate && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={onPickDate}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          />
        )}

        {/* Sektion for valg af tidspunkt */}
        <View style={GS.rowHeader}><Text style={GS.label}>Tidspunkt</Text></View>
        <Pressable style={GS.valueBox} onPress={() => setShowTime(true)}>
          <Text style={GS.valueText}>{fmtTime(time)}</Text>
        </Pressable>
        {showTime && (
          <DateTimePicker
            value={time}
            mode="time"
            onChange={onPickTime}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          />
        )}

        {/* Knap til at gemme booking */}
        <View style={{ height: SPACING.xxl }} />
        <Pressable style={GS.btn} onPress={saveBooking}>
          <Text style={GS.btnText}>Gem booking</Text>
        </Pressable>
      </View>
    </View>
  );
}
