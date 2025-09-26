//Menuen i bunden fanerne: 
//Forside, Beskeder, Min forening, Min bolig, Booking.


import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ForsideScreen from "../screens/Forside/ForsideScreen";
import BeskederScreen from "../screens/Beskeder/BeskederScreen";
import MinForeningScreen from "../screens/MinForening/MinForeningScreen";
import BookingScreen from "../screens/Booking/BookingScreen";
import MinBoligStack from "./MinBoligStack";




const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Forside" component={ForsideScreen} />
            <Tab.Screen name="Beskeder" component={BeskederScreen} />
            <Tab.Screen name="Booking" component={BookingScreen} />
            <Tab.Screen name="Forening" component={MinForeningScreen} />
            <Tab.Screen name="Mig" component={MinBoligStack} />
        </Tab.Navigator>
    );
}
