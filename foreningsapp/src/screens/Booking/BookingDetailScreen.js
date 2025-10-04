// src/screens/Booking/BookingDetailScreen.js
import React, { useState } from 'react';
import { View, Text, Pressable, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import GS, { SPACING } from '../../styles/globalstyles';

const STORAGE_KEY = 'BOOKINGS_V1';

const fmtDate = (d) => `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
const fmtTime = (d) => `${String(d.getHours()).padStart(2, '0')}.${String(d.getMinutes()).padStart(2, '0')}`;
const uid = () => `${Date.now()}`;

export default function BookingDetailScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const resource = params?.resource || { id: 'unknown', label: 'Ressource' };

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  const onPickDate = (_, selected) => {
    setShowDate(Platform.OS === 'ios');
    if (selected) setDate(selected);
  };
  const onPickTime = (_, selected) => {
    setShowTime(Platform.OS === 'ios');
    if (selected) setTime(selected);
  };

  async function saveBooking() {
    try {
      const snapshot = await AsyncStorage.getItem(STORAGE_KEY);
      const list = snapshot ? JSON.parse(snapshot) : [];
      list.push({
        id: uid(),
        resource,
        date: fmtDate(date),
        time: fmtTime(time),
      });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      Alert.alert('Gemt', 'Din booking er gemt.');
      navigation.navigate('MyBookings');
    } catch (e) {
      Alert.alert('Fejl', e?.message || 'Kunne ikke gemme booking');
    }
  }

  return (
    <View style={GS.screen}>
      <View style={GS.content}>
        <Text style={[GS.h1, { marginBottom: SPACING.xl }]}>{resource.label}</Text>

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

        <View style={{ height: SPACING.xxl }} />
        <Pressable style={GS.btn} onPress={saveBooking}>
          <Text style={GS.btnText}>Gem booking</Text>
        </Pressable>
      </View>
    </View>
  );
}
