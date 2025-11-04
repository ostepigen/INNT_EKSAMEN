import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Switch, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GS from '../../styles/globalstyles';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/firebase/db';
import userService from '../../services/firebase/userService';

export default function NyOpslagScreen({ navigation }) {
    const [title, setTitle] = useState('');
    // date/time are set automatically on save (createdAt in DB) — not user-editable
    const [text, setText] = useState('');
    const [important, setImportant] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
        return () => unsub();
    }, []);

    const onSave = async () => {
        if (!user) return Alert.alert('Fejl', 'Du skal være logget ind for at lave opslag.');
        if (!title || !text) return Alert.alert('Udfyld', 'Overskrift og tekst er påkrævet.');
        setLoading(true);
        try {
            const opslag = {
                title,
                text,
                important: !!important,
                senderUid: user.uid,
                senderName: user.displayName || user.email?.split('@')[0] || 'Bruger',
                // createdAt will be added by userService.pushOpslag
            };
            await userService.pushOpslag(opslag);
            Alert.alert('OK', 'Opslaget er oprettet');
            navigation.goBack();
        } catch (err) {
            console.warn('Failed creating opslag', err);
            Alert.alert('Fejl', err.message || String(err));
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <SafeAreaView style={GS.container}>
            <ActivityIndicator size="large" />
        </SafeAreaView>
    );

    return (
        <SafeAreaView style={GS.container}>
            <View style={{ padding: 16 }}>
                <Text style={GS.h2}>Lav nyt opslag</Text>

                <Text style={GS.label}>Overskrift</Text>
                <TextInput style={GS.textInput} value={title} onChangeText={setTitle} placeholder="F.eks. Generalforsamling" />

             
                {/* Dato og tid sættes automatisk og kan ikke redigeres af brugeren */}


                <Text style={GS.label}>Tekst</Text>
                <TextInput style={[GS.textInput, { height: 120 }]} value={text} onChangeText={setText} multiline placeholder="Skriv dit opslag her" />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
                    <Text style={{ marginRight: 8 }}>Vigtig</Text>
                    <Switch value={important} onValueChange={setImportant} />
                </View>

                <TouchableOpacity style={[GS.button, GS.buttonPrimary]} onPress={onSave}>
                    <Text style={GS.buttonPrimaryText}>Opret opslag</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}
