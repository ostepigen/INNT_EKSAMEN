//denne fil er til skærmen hvor brugeren kan lave et nyt opslag
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Switch, ActivityIndicator, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import GS, { COLORS, SPACING } from '../../styles/globalstyles';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/firebase/db';
import { pushOpslag, getUserProfile } from '../../services/firebase/userService';
import * as ImagePicker from 'expo-image-picker';

//viser skærmen til at lave et nyt opslag
export default function NyOpslagScreen({ navigation }) {
    const [title, setTitle] = useState('');
    // date/time are set automatically on save (createdAt in DB) — not user-editable
    const [text, setText] = useState('');
    const [important, setImportant] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUri, setImageUri] = useState(null);

    // Funktion til at vælge billede fra galleri
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Tilladelse nødvendig', 'Vi har brug for adgang til dine billeder');
            return;
        }
        // Åbn billedvælgeren
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });
        // Hvis brugeren valgte et billede, opdater imageUri state
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };
// Funktion til at tage et nyt billede med kameraet
    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Tilladelse nødvendig', 'Vi har brug for adgang til dit kamera');
            return;
        }
        // Åbn kameraet
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });
        // Hvis brugeren tog et billede, opdater imageUri state
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    // Hent den aktuelle bruger
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
        return () => unsub();
    }, []);
// Funktion til at gemme det nye opslag
    const onSave = async () => {
        if (!user) return Alert.alert('Fejl', 'Du skal være logget ind for at lave opslag.');
        if (!title || !text) return Alert.alert('Udfyld', 'Overskrift og tekst er påkrævet.');
        // Opretter opslag objekt og gemmer det via userService
        setLoading(true);
        try {
            let imageUrl = null;
            
            // Upload billede til Cloudinary hvis der er valgt et
            if (imageUri) {
                const formData = new FormData();
                formData.append('file', {
                    uri: imageUri,
                    type: 'image/jpeg',
                    name: 'opslag.jpg'
                });
                formData.append('upload_preset', 'opslag_upload');
                
                const cloudinaryResponse = await fetch(
                    'https://api.cloudinary.com/v1_1/dsjoirhgw/image/upload',
                    {
                        method: 'POST',
                        body: formData,
                    }
                );
                
                const cloudinaryData = await cloudinaryResponse.json(); // Hent den uploadede billed-URL
                imageUrl = cloudinaryData.secure_url; // Gem URL til opslag objekt
            }
            
            const opslag = {
                title,
                text,
                important: !!important,
                senderUid: user.uid,
                senderName: user.displayName || user.email?.split('@')[0] || 'Bruger',
                imageUrl: imageUrl, // Tilføj billede URL
                // createdAt will be added by pushOpslag
            };
            await pushOpslag(opslag);
            Alert.alert('OK', 'Opslaget er oprettet');
            navigation.goBack();
        } catch (err) {
            console.warn('Failed creating opslag', err);
            Alert.alert('Fejl', err.message || String(err));
        } finally {
            setLoading(false);
        }
    };
    // Vis loading indikator mens opslag gemmes
    if (loading) return (
        <SafeAreaView style={GS.container}>
            <ActivityIndicator size="large" />
        </SafeAreaView>
    );
// Hoved-UI for at oprette et nyt opslag
    return (
        <SafeAreaView style={GS.screen} edges={['top', 'left', 'right', 'bottom']}>
            <ScrollView contentContainerStyle={GS.content}>
                <Text style={[GS.h1, { marginBottom: SPACING.xl }]}>Lav nyt opslag</Text>

                <View style={GS.listCard}>
                    <View style={{ paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md }}>
                        <Text style={GS.label}>Overskrift</Text>
                        <TextInput 
                            style={GS.valueBox} 
                            value={title} 
                            onChangeText={setTitle} 
                            placeholder="F.eks. Generalforsamling"
                            placeholderTextColor={COLORS.subtext}
                        />
                    </View>

                    <View style={GS.listRowDivider} />

                    <View style={{ paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md }}>
                        <Text style={GS.label}>Tekst</Text>
                        <TextInput 
                            style={[GS.valueBox, { height: 120, textAlignVertical: 'top', paddingTop: SPACING.md }]} 
                            value={text} 
                            onChangeText={setText} 
                            multiline 
                            placeholder="Skriv dit opslag her"
                            placeholderTextColor={COLORS.subtext}
                        />
                    </View>

                    <View style={GS.listRowDivider} />

                    <View style={{ paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="alert-circle-outline" size={18} color={COLORS.primary} style={{ marginRight: SPACING.sm }} />
                                <Text style={GS.label}>Markér som vigtig</Text>
                            </View>
                            <Switch value={important} onValueChange={setImportant} trackColor={{ true: COLORS.primary }} />
                        </View>
                    </View>

                    <View style={GS.listRowDivider} />

                    <View style={{ paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md }}>
                        <Text style={GS.label}>Billede (valgfrit)</Text>
                        
                        <View style={{ flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.sm }}>
                            <TouchableOpacity 
                                style={[GS.btnGhost, { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]} 
                                onPress={takePhoto}
                            >
                                <Ionicons name="camera-outline" size={20} color={COLORS.primary} style={{ marginRight: SPACING.sm }} />
                                <Text style={GS.btnGhostText}>Tag billede</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[GS.btnGhost, { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]} 
                                onPress={pickImage}
                            >
                                <Ionicons name="images-outline" size={20} color={COLORS.primary} style={{ marginRight: SPACING.sm }} />
                                <Text style={GS.btnGhostText}>Vælg fra galleri</Text>
                            </TouchableOpacity>
                        </View>

                        {imageUri && (
                            <View style={{ marginTop: SPACING.md }}>
                                <Image 
                                    source={{ uri: imageUri }} 
                                    style={{ width: '100%', height: 200, borderRadius: SPACING.r }} 
                                    resizeMode="cover"
                                />
                                <TouchableOpacity 
                                    onPress={() => setImageUri(null)}
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: SPACING.sm }}
                                >
                                    <Ionicons name="close-circle" size={18} color={COLORS.danger} style={{ marginRight: SPACING.xs }} />
                                    <Text style={{ color: COLORS.danger }}>Fjern billede</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>

                <View style={{ height: SPACING.xl }} />

                <TouchableOpacity 
                    style={[GS.btn, loading && { backgroundColor: COLORS.subtext }]} 
                    onPress={onSave}
                    disabled={loading}
                >
                    <Text style={GS.btnText}>{loading ? 'Opretter...' : 'Opret opslag'}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[GS.btnGhost, { marginTop: SPACING.lg }]} 
                    onPress={() => navigation.goBack()}
                    disabled={loading}
                >
                    <Text style={GS.btnGhostText}>Annuller</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
