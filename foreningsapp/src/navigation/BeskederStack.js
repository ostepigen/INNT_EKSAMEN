// Stack navigator til Beskeder i tabnavigator
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import BeskederScreen from "../screens/Beskeder/BeskederScreen";
import NyBeskedScreen from "../screens/Beskeder/NyBeskedScreen";
import NyAIchat from "../screens/Beskeder/NyAIchat";

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
        name="NyBesked" 
        component={NyBeskedScreen} 
        options={{title: "Ny besked"}}
      />
      <Stack.Screen 
        name="NYAIChat" 
        component={NyAIchat} 
          options={{title: "AI beskeder"}}
      />

        </Stack.Navigator>
    );
}