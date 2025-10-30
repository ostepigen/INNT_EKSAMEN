import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase konfigurationsobjekt
const firebaseConfig = {
  apiKey: "AIzaSyBJNaxiVmw993Do7u95gKBe3jz2ePK-JrU",
  authDomain: "innt-eksamen-86f13.firebaseapp.com",
  databaseURL: "https://innt-eksamen-86f13-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "innt-eksamen-86f13",
  storageBucket: "innt-eksamen-86f13.firebasestorage.app",
  messagingSenderId: "302219186933",
  appId: "1:302219186933:web:74189d707d529845d16bbc",
};

// Initialiserer Firebase appen (idempotent)
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialiserer Firebase Authentication med React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialiser Realtime Database
const database = getDatabase(app);

export { auth, database };