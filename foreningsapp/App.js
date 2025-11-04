import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './src/services/firebase/db';
import {userService} from './src/services/firebase/userService';
import {ProfilScreen} from './src/screens/MinBolig/ProfilScreen';
import {AuthScreen} from './src/screens/Bruger/AuthScreen';
import {TabNavigator} from './src/navigation/TabNavigator';

// Opretter en Stack Navigator til at håndtere navigation mellem sider
const Stack = createNativeStackNavigator();

export default function App() {
// State-variabler til at gemme den aktuelle bruger og initialiseringsstatus
  const [user, setUser] = useState(null);
  const [booted, setBooted] = useState(false);
  const [needsProfile, setNeedsProfile] = useState(false);

// useEffect lytter efter ændringer i brugerens loginstatus via Firebase Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (current) => {
      setUser(current); // Gemmer brugerdata, hvis der er logget ind
      if (current) {
        try {
          const profile = await userService.getUserProfile(current.uid);
          // Hvis profile mangler, kræver vi at brugeren udfylder den
          setNeedsProfile(!profile);
        } catch (err) {
          console.warn('Failed checking profile', err);
          setNeedsProfile(true);
        }
      } else {
        setNeedsProfile(false);
      }
      setBooted(true); // Markerer, at appen er klar til at vise indhold
    });
    return unsubscribe; // Afmelder lytteren, når komponenten unmountes
  }, []);

  // Viser ikke noget før vi har tjekket auth status
  if (!booted) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          {user ? (
            // Når brugeren er logget ind, registrer både CompleteProfile og Tabs.
            // initialRouteName bestemmes ud fra needsProfile så brugeren lander korrekt.
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={needsProfile ? 'CompleteProfile' : 'Tabs'}>
              <Stack.Screen name="CompleteProfile" component={ProfilScreen} />
              <Stack.Screen name="Tabs">
                {() => <TabNavigator enabled={!needsProfile} />}
              </Stack.Screen>
            </Stack.Navigator>
          ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Auth" component={AuthScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

