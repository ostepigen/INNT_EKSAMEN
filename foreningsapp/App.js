import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './src/services/firebase/db';
import AuthScreen from './src/screens/Bruger/AuthScreen';
import TabNavigator from './src/navigation/TabNavigator';

// Opretter en Stack Navigator til at håndtere navigation mellem sider
const Stack = createNativeStackNavigator();

export default function App() {
// State-variabler til at gemme den aktuelle bruger og initialiseringsstatus
  const [user, setUser] = useState(null);
  const [booted, setBooted] = useState(false);

// useEffect lytter efter ændringer i brugerens loginstatus via Firebase Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (current) => {
      setUser(current); // Gemmer brugerdata, hvis der er logget ind
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
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
              // Når man er logget ind, viser vi tabs
              <Stack.Screen name="Tabs" component={TabNavigator} />
            ) : (
              // Ellers AuthScreen (login/signup)
              <Stack.Screen name="Auth" component={AuthScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

