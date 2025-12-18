// i denne fil er funktioner til at interagere med Firebase Realtime Database for brugerrelaterede data
import { ref, set, get, push, onValue, update } from 'firebase/database';
import { database } from './db';

// paths i Realtime Database
const usersPath = (uid) => `users/${uid}`;
const messagesPath = (uid) => `messages/${uid}`;
const sentMessagesPath = (uid) => `messages_sent/${uid}`;
const bookingsPath = (uid) => `bookings/${uid}`;

// CRUD funktioner for brugerprofiler
export async function setUserProfile(uid, profile) {
  if (!uid) throw new Error('Missing uid');
  const userRef = ref(database, usersPath(uid));
  await set(userRef, { ...profile, updatedAt: Date.now() });
}
// opdaterer eksisterende brugerprofil med nye data
export async function updateUserProfile(uid, updates) {
  if (!uid) throw new Error('Missing uid');
  const userRef = ref(database, usersPath(uid));
  await update(userRef, { ...updates, updatedAt: Date.now() });
}
// henter brugerprofil data
export async function getUserProfile(uid) {
  if (!uid) return null;
  const userRef = ref(database, usersPath(uid));
  const snap = await get(userRef);
  return snap.exists() ? snap.val() : null;
}
// lytter efter ændringer i brugerprofil data
export function listenToUserProfile(uid, cb) {
  if (!uid) return () => {};
  const userRef = ref(database, usersPath(uid));
  const unsubscribe = onValue(userRef, (snapshot) => cb(snapshot.val()));
  return () => unsubscribe();
}

// henter alle brugere
export async function getAllUsers() {
  const listRef = ref(database, `users`);
  const snap = await get(listRef);
  return snap.exists() ? snap.val() : {};
}
// lytter efter ændringer i alle brugere
export function listenToUsers(cb) {
  const listRef = ref(database, `users`);
  const unsubscribe = onValue(listRef, (snapshot) => cb(snapshot.val()));
  return () => unsubscribe();
}

// --- Besked funktioner ---
export async function pushMessage(uid, message) {
  if (!uid) throw new Error('Missing uid');
  // skriver besked til brugerens beskedliste
  const listRef = ref(database, messagesPath(uid)); // beskedliste for modtager
  const newRef = await push(listRef); // ny besked reference
  const key = newRef.key; // unik nøgle for beskeden
  const payload = { ...message, createdAt: Date.now() }; // besked data med timestamp
  await set(newRef, payload); // gemmer besked i databasen
  //
  try {
    const senderUid = message.senderUid; // henter afsenderens uid fra besked data
    if (senderUid) { // hvis afsender uid findes, gem en kopi i afsenderens sendte beskeder
      const sentRef = ref(database, `${sentMessagesPath(senderUid)}/${key}`); // reference til sendt besked for afsender
      await set(sentRef, payload); // gemmer kopi af besked i afsenderens sendte beskeder
    }
  } catch (e) {
    console.warn('Failed writing sent copy', e);
  }
  return key;
}
// henter alle beskeder for en bruger
export async function getMessages(uid) {
  if (!uid) return {};
  const listRef = ref(database, messagesPath(uid));
  const snap = await get(listRef);
  return snap.exists() ? snap.val() : {};
}
// henter alle sendte beskeder for en bruger
export async function getSentMessages(uid) {
  if (!uid) return {};
  const listRef = ref(database, sentMessagesPath(uid));
  const snap = await get(listRef);
  return snap.exists() ? snap.val() : {};
}
// lytter efter nye beskeder for en bruger
export function listenToMessages(uid, cb) {
  if (!uid) return () => {};
  const listRef = ref(database, messagesPath(uid));
  const unsubscribe = onValue(listRef, (snapshot) => cb(snapshot.val()));
  return () => unsubscribe();
}
// lytter efter sendte beskeder for en bruger
export function listenToSentMessages(uid, cb) {
  if (!uid) return () => {};
  const listRef = ref(database, sentMessagesPath(uid));
  const unsubscribe = onValue(listRef, (snapshot) => cb(snapshot.val()));
  return () => unsubscribe();
}
// markerer en besked som læst
export async function markMessageAsRead(uid, messageId) {
  if (!uid || !messageId) throw new Error('Missing uid or messageId');
  const messageRef = ref(database, `${messagesPath(uid)}/${messageId}`);
  await update(messageRef, { read: true });
}

// --- Booking funktioner ---
const bookingsGlobalPath = (resourceId) => `bookings/${resourceId}`;

export async function pushBooking(resourceId, booking) {
  if (!resourceId) throw new Error('Missing resourceId');
  const listRef = ref(database, bookingsGlobalPath(resourceId));
  const newRef = await push(listRef);
  await set(newRef, { ...booking, createdAt: Date.now() });
  return newRef.key;
}
// henter alle bookinger for en given ressource
export async function getBookings(resourceId) {
  if (!resourceId) return {};
  const listRef = ref(database, bookingsGlobalPath(resourceId));
  const snap = await get(listRef);
  return snap.exists() ? snap.val() : {};
}
// lytter efter ændringer i bookinger for en given ressource
export function listenToBookings(resourceId, cb) {
  if (!resourceId) return () => {};
  const listRef = ref(database, bookingsGlobalPath(resourceId));
  const unsubscribe = onValue(listRef, (snapshot) => cb(snapshot.val()));
  return () => unsubscribe();
}
// sletter en booking for en given ressource
export async function deleteBooking(resourceId, bookingId) {
  if (!resourceId || !bookingId) throw new Error('Missing resourceId or bookingId');
  const bookingRef = ref(database, `${bookingsGlobalPath(resourceId)}/${bookingId}`);
  await set(bookingRef, null);
}

// --- Opslag (public posts shown on Forside) ---
const opslagPath = () => `opslag`;
// tilføjer et nyt opslag
export async function pushOpslag(opslag) {
  if (!opslag) throw new Error('Missing opslag');
  const listRef = ref(database, opslagPath());
  const newRef = await push(listRef);
  await set(newRef, { ...opslag, createdAt: Date.now() });
  return newRef.key;
}
// henter alle opslag
export async function getOpslag() {
  const listRef = ref(database, opslagPath());
  const snap = await get(listRef);
  return snap.exists() ? snap.val() : {};
}
// lytter efter ændringer i opslag
export function listenToOpslag(cb) {
  const listRef = ref(database, opslagPath());
  const unsubscribe = onValue(listRef, (snapshot) => cb(snapshot.val()));
  return () => unsubscribe();
}
// sletter et opslag
export async function deleteOpslag(opslagId) {
  if (!opslagId) throw new Error('Missing opslagId');
  const opslagRef = ref(database, `${opslagPath()}/${opslagId}`);
  await set(opslagRef, null);
}


