//Menuen i bunden fanerne: 
//Forside, Beskeder, Min forening, Min bolig, Booking.
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';
import ForsideScreen from "../screens/Forside/ForsideScreen";
import BeskederStack from "./BeskederStack";
import MinForeningScreen from "../screens/MinForening/MinForeningScreen";
import MinBoligStack from "./MinBoligStack";
import BookingStack from "../navigation/BookingStack";




const Tab = createBottomTabNavigator();

export default function TabNavigator({ enabled = true }) {
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
            <Tab.Screen
                name="Forside"
                component={ForsideScreen}
                options={{
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            {...props}
                            onPress={enabled ? props.onPress : undefined}
                            activeOpacity={enabled ? 0.7 : 1}
                            style={[props.style, !enabled && { opacity: 0.5 }]}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Beskeder"
                component={BeskederStack}
                options={{
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            {...props}
                            onPress={enabled ? props.onPress : undefined}
                            activeOpacity={enabled ? 0.7 : 1}
                            style={[props.style, !enabled && { opacity: 0.5 }]}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Booking"
                component={BookingStack}
                options={{
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            {...props}
                            onPress={enabled ? props.onPress : undefined}
                            activeOpacity={enabled ? 0.7 : 1}
                            style={[props.style, !enabled && { opacity: 0.5 }]}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Forening"
                component={MinForeningScreen}
                options={{
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            {...props}
                            onPress={enabled ? props.onPress : undefined}
                            activeOpacity={enabled ? 0.7 : 1}
                            style={[props.style, !enabled && { opacity: 0.5 }]}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Mig"
                component={MinBoligStack}
                options={{
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            {...props}
                            onPress={enabled ? props.onPress : undefined}
                            activeOpacity={enabled ? 0.7 : 1}
                            style={[props.style, !enabled && { opacity: 0.5 }]}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
        );
    }
