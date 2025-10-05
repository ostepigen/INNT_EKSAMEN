// Stack navigator til Beskeder i tabnavigator
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import BeskederScreen from "../screens/Beskeder/BeskederScreen";
import AIchat from "../screens/Beskeder/AIchat";
import NyBeskedScreen from "../screens/Beskeder/NyBeskedScreen";

const Stack = createStackNavigator();

export default function BeskederStack() {
    return (
        <Stack.Navigator>
                  <Stack.Screen 
        name="BeskederHome" 
        component={BeskederScreen} 
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="AIChat" 
        component={AIchat} 
        options={{title: "AI Assistant"}}
      />
      <Stack.Screen 
        name="NyBesked" 
        component={NyBeskedScreen} 
        options={{title: "Ny besked"}}
      />
        </Stack.Navigator>
    );
}