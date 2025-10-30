import { ref, set, get, push, onValue, update } from 'firebase/database';
import { database } from './db';

// Utility paths
const usersPath = (uid) => `users/${uid}`;
const messagesPath = (uid) => `messages/${uid}`;
const bookingsPath = (uid) => `bookings/${uid}`;

// --- Profile CRUD ---
export async function setUserProfile(uid, profile) {
  if (!uid) throw new Error('Missing uid');
  const userRef = ref(database, usersPath(uid));
  await set(userRef, { ...profile, updatedAt: Date.now() });
}

export async function updateUserProfile(uid, updates) {
  if (!uid) throw new Error('Missing uid');
  const userRef = ref(database, usersPath(uid));
  await update(userRef, { ...updates, updatedAt: Date.now() });
}

export async function getUserProfile(uid) {
  if (!uid) return null;
  const userRef = ref(database, usersPath(uid));
  const snap = await get(userRef);
  return snap.exists() ? snap.val() : null;
}

export function listenToUserProfile(uid, cb) {
  if (!uid) return () => {};
  const userRef = ref(database, usersPath(uid));
  const unsubscribe = onValue(userRef, (snapshot) => cb(snapshot.val()));
  return () => unsubscribe();
}

// --- Messages ---
export async function pushMessage(uid, message) {
  if (!uid) throw new Error('Missing uid');
  const listRef = ref(database, messagesPath(uid));
  const newRef = await push(listRef);
  await set(newRef, { ...message, createdAt: Date.now() });
  return newRef.key;
}

export async function getMessages(uid) {
  if (!uid) return {};
  const listRef = ref(database, messagesPath(uid));
  const snap = await get(listRef);
  return snap.exists() ? snap.val() : {};
}

// --- Bookings (vasketider) ---
export async function pushBooking(uid, booking) {
  if (!uid) throw new Error('Missing uid');
  const listRef = ref(database, bookingsPath(uid));
  const newRef = await push(listRef);
  await set(newRef, { ...booking, createdAt: Date.now() });
  return newRef.key;
}

export async function getBookings(uid) {
  if (!uid) return {};
  const listRef = ref(database, bookingsPath(uid));
  const snap = await get(listRef);
  return snap.exists() ? snap.val() : {};
}

export default {
  setUserProfile,
  updateUserProfile,
  getUserProfile,
  listenToUserProfile,
  pushMessage,
  getMessages,
  pushBooking,
  getBookings,
};
