//stack navigator til Booking i tabnavigator
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingScreen from '../screens/Booking/BookingScreen';
import BookingDetailScreen from '../screens/Booking/BookingDetailScreen';
import MyBookingsScreen from '../screens/Booking/MyBookingsScreen';

const Stack = createNativeStackNavigator();

export default function BookingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BookingHome" component={BookingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BookingDetail" component={BookingDetailScreen} options={{ title: '' }} />
      <Stack.Screen name="MyBookings" component={MyBookingsScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
}
