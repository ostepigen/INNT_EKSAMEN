//Menuen i bunden fanerne: 
//Forside, Beskeder, Min forening, Min bolig, Booking.
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ForsideScreen from "../screens/Forside/ForsideScreen";
import BeskederScreen from "../screens/Beskeder/BeskederScreen";
import MinForeningScreen from "../screens/MinForening/MinForeningScreen";
import MinBoligStack from "./MinBoligStack";
import AIchat from '../screens/Beskeder/AIchat';
import BookingStack from "../navigation/BookingStack";




const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                //spørg vejledere ind til icons? er det sådan her
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Forside') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Beskeder') {
                        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                    } else if (route.name === 'Booking') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === 'Forening') {
                        iconName = focused ? 'business' : 'business-outline';
                    } else if (route.name === 'Mig') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#255d32ff',
                tabBarInactiveTintColor: 'brown',
            })}
        >
            <Tab.Screen name="Forside" component={ForsideScreen} />
            <Tab.Screen name="Beskeder" component={BeskederScreen} />
            <Tab.Screen name="Booking" component={BookingStack} />
            <Tab.Screen name="Forening" component={MinForeningScreen} />
            <Tab.Screen name="Mig" component={MinBoligStack} />
            <Tab.Screen name="AI Chat" component={AIchat} />
        </Tab.Navigator>
        );
    }
