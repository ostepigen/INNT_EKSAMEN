import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../services/firebase/db';
import userService from '../../services/firebase/userService';
import GS, { SPACING, COLORS } from '../../styles/globalstyles';

const fmtDate = (d) => `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;

// hardcoded tidsintervaller for vaskekælder
const LAUNDRY_SLOTS = [
  { start: 7, end: 10, label: '07:00 - 10:00' },
  { start: 10, end: 13, label: '10:00 - 13:00' },
  { start: 13, end: 16, label: '13:00 - 16:00' },
  { start: 16, end: 19, label: '16:00 - 19:00' },
  { start: 19, end: 21, label: '19:00 - 21:00' },
];

// Hjælpefunktioner for kalender
const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
const monthNames = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];

export default function BookingDetailScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const resource = params?.resource || { id: 'unknown', label: 'Ressource' };

  // Tjek hvilken facilitet der er tale om
  const isLaundry = resource.id === 'laundry';
  const isRoom = resource.id === 'room';

  //vaskekælder states
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  //fælleslokale states
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hent bookings for den valgte ressource
  useEffect(() => {
    const unsub = userService.listenToBookings(resource.id, (data) => {
      const list = data ? Object.keys(data).map(k => ({ id: k, ...data[k] })) : [];
      setBookings(list);
    });
    return () => unsub();
  }, [resource.id]);

  //vaskekælder metode til dato picker
  const onPickDate = (_, selected) => {
    setShowDate(Platform.OS === 'ios');
    if (selected) {
      setDate(selected);
      setSelectedSlot(null);
    }
  };
  //vaskekælder metode til at tjekke om et tidsinterval er booket
  const isSlotBooked = (slot) => {
    const dateStr = fmtDate(date);
    return bookings.some(b => b.date === dateStr && b.startHour === slot.start && b.endHour === slot.end);
  };

  //fælleslokale metode til at tjekke om en dag er booket
  const isDayBooked = (day) => {
    const dateStr = `${day}.${currentMonth.getMonth() + 1}.${currentMonth.getFullYear()}`;
    return bookings.some(b => b.date === dateStr);
  };
  //fælleslokale metode til at tjekke om en dag er booket af den nuværende bruger
  const isDayBookedByUser = (day) => {
    const dateStr = `${day}.${currentMonth.getMonth() + 1}.${currentMonth.getFullYear()}`;
    const user = auth.currentUser;
    return bookings.some(b => b.date === dateStr && b.userId === user?.uid);
  };
  //fælleslokale metoder til at navigere mellem måneder
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDay(null);
  };
  //fælleslokale metoder til at navigere mellem måneder
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDay(null);
  };
 //fælleslokale metode til at rendere kalenderen
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    //tomme felter for at starte på korrekt ugedag
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={{ width: '14.28%' }} />);
    }

    //dage felter
    for (let day = 1; day <= daysInMonth; day++) {
      // beregn om dagen er i fortiden, booket af bruger, booket af andre eller valgt
      const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      dayDate.setHours(0, 0, 0, 0);
      const isPast = dayDate < today;
      const bookedByUser = isDayBookedByUser(day);
      const bookedByOther = isDayBooked(day) && !bookedByUser;
      const selected = selectedDay === day;

      //dagens felt
      days.push(
        <Pressable
          key={day}
          disabled={isPast || (isDayBooked(day) && !bookedByUser)}
          onPress={() => setSelectedDay(day)}
          style={{
            width: '14.28%',
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: SPACING.r,
            borderWidth: 1,
            borderColor: selected ? COLORS.primary : COLORS.border,
            backgroundColor: isPast ? '#f0f0f0' : bookedByUser ? COLORS.primary50 : bookedByOther ? '#ffebee' : selected ? COLORS.primary50 : COLORS.card,
          }}
        >
          <Text style={{ fontWeight: selected ? '700' : '400', color: isPast ? '#999' : bookedByUser ? COLORS.primary : bookedByOther ? COLORS.danger : selected ? COLORS.primary : COLORS.text }}>
            {day}
          </Text>
        </Pressable>
      );
    }

    return days;
  };

//fælles metode til at gemme en booking
  async function saveBooking() {
    if (isLaundry && !selectedSlot) {
      Alert.alert('Fejl', 'Vælg venligst et tidspunkt');
      return;
    }
    if (isRoom && selectedDay === null) {
      Alert.alert('Fejl', 'Vælg venligst en dag');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Fejl', 'Du skal være logget ind');
      return;
    }

    setLoading(true);
    try {
      const profile = await userService.getUserProfile(user.uid);
      
      const bookingData = {
        date: isLaundry ? fmtDate(date) : `${selectedDay}.${currentMonth.getMonth() + 1}.${currentMonth.getFullYear()}`,
        userId: user.uid,
        userName: profile?.name || user.email,
      };

      if (isLaundry) {
        bookingData.startHour = selectedSlot.start;
        bookingData.endHour = selectedSlot.end;
      }

      await userService.pushBooking(resource.id, bookingData);
      Alert.alert('Gemt', 'Din booking er gemt.');
      navigation.navigate('MyBookings');
    } catch (e) {
      Alert.alert('Fejl', e?.message || 'Kunne ikke gemme booking');
    } finally {
      setLoading(false);
    }
  }

  //særskilte skærm for vaskekælde
  if (isLaundry) {
    return (
      <View style={GS.screen}>
        <ScrollView contentContainerStyle={GS.content}>
          <Text style={[GS.h1, { marginBottom: SPACING.lg }]}>{resource.label}</Text>
          <Text style={[GS.help, { marginBottom: SPACING.xl }]}>Vælg dato og tidspunkt</Text>

          <Text style={GS.label}>Dato</Text>
          <Pressable style={GS.valueBox} onPress={() => setShowDate(true)}>
            <Text style={GS.valueText}>{fmtDate(date)}</Text>
          </Pressable>
          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={onPickDate}
              minimumDate={new Date()}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            />
          )}

          <View style={{ height: SPACING.xl }} />

          <Text style={GS.label}>Vælg tidspunkt</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, justifyContent: 'space-between' }}>
            {LAUNDRY_SLOTS.map(slot => {
              const booked = isSlotBooked(slot);
              const selected = selectedSlot?.start === slot.start;
              return (
                <Pressable
                  key={`${slot.start}-${slot.end}`}
                  disabled={booked}
                  onPress={() => setSelectedSlot(slot)}
                  style={{
                    width: '48%',
                    paddingVertical: SPACING.md,
                    paddingHorizontal: SPACING.lg,
                    borderRadius: SPACING.r,
                    borderWidth: 1,
                    borderColor: booked ? '#ffcccc' : selected ? COLORS.primary : COLORS.border,
                    backgroundColor: booked ? '#ffebee' : selected ? COLORS.primary50 : COLORS.card,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: booked ? COLORS.danger : selected ? COLORS.primary : COLORS.text, fontWeight: selected ? '700' : '400' }}>
                    {slot.label}
                  </Text>
                  {booked && <Text style={{ fontSize: 10, color: COLORS.danger, marginTop: 2 }}>Optaget</Text>}
                </Pressable>
              );
            })}
          </View>

          <View style={{ height: SPACING.xxl }} />

          <Pressable style={[GS.btn, loading && { backgroundColor: COLORS.subtext }]} onPress={saveBooking} disabled={loading}>
            <Text style={GS.btnText}>{loading ? 'Gemmer...' : 'Gem booking'}</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  //skærm for fælleslokale
  if (isRoom) {
    return (
      <View style={GS.screen}>
        <ScrollView contentContainerStyle={GS.content}>
          <Text style={[GS.h1, { marginBottom: SPACING.lg }]}>{resource.label}</Text>
          <Text style={[GS.help, { marginBottom: SPACING.xl }]}>Vælg en dag</Text>

          {/* Month navigation */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg }}>
            <Pressable onPress={handlePrevMonth} style={{ padding: SPACING.md }}>
              <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
            </Pressable>
            <Text style={GS.h2}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </Text>
            <Pressable onPress={handleNextMonth} style={{ padding: SPACING.md }}>
              <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
            </Pressable>
          </View>

          {/* Weekday headers */}
          <View style={{ flexDirection: 'row', marginBottom: SPACING.sm }}>
            {['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'].map(day => (
              <View key={day} style={{ width: '14.28%', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: COLORS.subtext }}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Calendar grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {renderCalendar()}
          </View>

          <View style={{ height: SPACING.xxl }} />

          <Pressable style={[GS.btn, (!selectedDay || loading) && { backgroundColor: COLORS.subtext }]} onPress={saveBooking} disabled={selectedDay === null || loading}>
            <Text style={GS.btnText}>{loading ? 'Gemmer...' : 'Gem booking'}</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }
//hvis ingen kendt ressource
  return (
    <View style={GS.screen}>
      <View style={GS.content}>
        <Text style={GS.h1}>Ukendt ressource</Text>
      </View>
    </View>
  );
}
