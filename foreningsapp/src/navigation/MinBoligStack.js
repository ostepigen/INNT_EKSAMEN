// Stacknavigatot til min bolig tabben
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';


import MinBoligHome from "../screens/MinBolig/MinBoligHome";
import BoligInfoScreen from "../screens/MinBolig/BoligInfoScreen";
import DocumentsScreen from "../screens/MinBolig/DocumentsScreen";
import FolderDetailScreen from "../screens/MinBolig/FolderDetailScreen";
import ProfilScreen from "../screens/MinBolig/ProfilScreen";
import Økonomi from "../screens/MinBolig/Økonomi"

const Stack = createStackNavigator();
//stack til min bolig
export default function MinBoligStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MinBoligHome"
                component={MinBoligHome}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Boligoplysninger" component={BoligInfoScreen} />
            <Stack.Screen name="Dokumenter" component={DocumentsScreen} />
            <Stack.Screen name="FolderDetail" component={FolderDetailScreen} options={{ headerTitle: 'Dokumenter' }} />
            <Stack.Screen name="Profil" component={ProfilScreen} />
            <Stack.Screen name="Økonomi" component={Økonomi} />
        </Stack.Navigator>
    );


}