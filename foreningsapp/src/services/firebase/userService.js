import { ref, set, get, push, onValue, update } from 'firebase/database';
import { database } from './db';

// Utility paths
const usersPath = (uid) => `users/${uid}`;
const messagesPath = (uid) => `messages/${uid}`;
const sentMessagesPath = (uid) => `messages_sent/${uid}`;
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

// --- Users listing (for recipient dropdown) ---
export async function getAllUsers() {
  const listRef = ref(database, `users`);
  const snap = await get(listRef);
  return snap.exists() ? snap.val() : {};
}

export function listenToUsers(cb) {
  const listRef = ref(database, `users`);
  const unsubscribe = onValue(listRef, (snapshot) => cb(snapshot.val()));
  return () => unsubscribe();
}

// --- Messages ---
export async function pushMessage(uid, message) {
  if (!uid) throw new Error('Missing uid');
  // push to recipient
  const listRef = ref(database, messagesPath(uid));
  const newRef = await push(listRef);
  const key = newRef.key;
  const payload = { ...message, createdAt: Date.now() };
  await set(newRef, payload);
  // also write a copy to sender's sent folder (if senderUid provided)
  try {
    const senderUid = message.senderUid;
    if (senderUid) {
      const sentRef = ref(database, `${sentMessagesPath(senderUid)}/${key}`);
      await set(sentRef, payload);
    }
  } catch (e) {
    // don't fail the main write if sent copy fails
    console.warn('Failed writing sent copy', e);
  }
  return key;
}

export async function getMessages(uid) {
  if (!uid) return {};
  const listRef = ref(database, messagesPath(uid));
  const snap = await get(listRef);
  return snap.exists() ? snap.val() : {};
}

export async function getSentMessages(uid) {
  if (!uid) return {};
  const listRef = ref(database, sentMessagesPath(uid));
  const snap = await get(listRef);
  return snap.exists() ? snap.val() : {};
}

export function listenToMessages(uid, cb) {
  if (!uid) return () => {};
  const listRef = ref(database, messagesPath(uid));
  const unsubscribe = onValue(listRef, (snapshot) => cb(snapshot.val()));
  return () => unsubscribe();
}

export function listenToSentMessages(uid, cb) {
  if (!uid) return () => {};
  const listRef = ref(database, sentMessagesPath(uid));
  const unsubscribe = onValue(listRef, (snapshot) => cb(snapshot.val()));
  return () => unsubscribe();
}

// --- Bookings (global, visible to all users) ---
const bookingsGlobalPath = (resourceId) => `bookings/${resourceId}`;

export async function pushBooking(resourceId, booking) {
  if (!resourceId) throw new Error('Missing resourceId');
  const listRef = ref(database, bookingsGlobalPath(resourceId));
  const newRef = await push(listRef);
  await set(newRef, { ...booking, createdAt: Date.now() });
  return newRef.key;
}

export async function getBookings(resourceId) {
  if (!resourceId) return {};
  const listRef = ref(database, bookingsGlobalPath(resourceId));
  const snap = await get(listRef);
  return snap.exists() ? snap.val() : {};
}

export function listenToBookings(resourceId, cb) {
  if (!resourceId) return () => {};
  const listRef = ref(database, bookingsGlobalPath(resourceId));
  const unsubscribe = onValue(listRef, (snapshot) => cb(snapshot.val()));
  return () => unsubscribe();
}

export async function deleteBooking(resourceId, bookingId) {
  if (!resourceId || !bookingId) throw new Error('Missing resourceId or bookingId');
  const bookingRef = ref(database, `${bookingsGlobalPath(resourceId)}/${bookingId}`);
  await set(bookingRef, null);
}

// --- Opslag (public posts shown on Forside) ---
const opslagPath = () => `opslag`;

export async function pushOpslag(opslag) {
  if (!opslag) throw new Error('Missing opslag');
  const listRef = ref(database, opslagPath());
  const newRef = await push(listRef);
  await set(newRef, { ...opslag, createdAt: Date.now() });
  return newRef.key;
}

export async function getOpslag() {
  const listRef = ref(database, opslagPath());
  const snap = await get(listRef);
  return snap.exists() ? snap.val() : {};
}

export function listenToOpslag(cb) {
  const listRef = ref(database, opslagPath());
  const unsubscribe = onValue(listRef, (snapshot) => cb(snapshot.val()));
  return () => unsubscribe();
}

export default {
  setUserProfile,
  updateUserProfile,
  getUserProfile,
  listenToUserProfile,
  pushMessage,
  getMessages,
  getSentMessages,
  listenToMessages,
  listenToSentMessages,
  pushBooking,
  getBookings,
  listenToBookings,
  deleteBooking,
  getAllUsers,
  listenToUsers,
  pushOpslag,
  getOpslag,
  listenToOpslag,
};
