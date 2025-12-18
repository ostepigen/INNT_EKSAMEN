// Firebase authentication functions
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './db';

// Login bruger med email og kodeord
export async function loginUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// Opret ny bruger med email og kodeord
export async function signUpUser(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

// Log ud
export async function logoutUser() {
  return await signOut(auth);
}