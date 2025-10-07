import { initializeApp } from 'firebase/app';
import {initializeAuth, getReactNativePersistence,} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyBJNaxiVmw993Do7u95gKBe3jz2ePK-JrU",
    authDomain: "innt-eksamen-86f13.firebaseapp.com",
    projectId: "innt-eksamen-86f13",
    storageBucket: "innt-eksamen-86f13.firebasestorage.app",
    messagingSenderId: "302219186933",
    appId: "1:302219186933:web:74189d707d529845d16bbc"
  };
  

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };