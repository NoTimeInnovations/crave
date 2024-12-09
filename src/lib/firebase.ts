import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: `https://foodoffers-2cedb-default-rtdb.asia-southeast1.firebasedatabase.app`,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const messaging = getMessaging(app);


export const generateToken = async() => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    try {
      const currentToken = await getToken(messaging, { vapidKey: 'BFU5alXLphNpTi0MUbQ9br2rQAscs3pDYXaO_nsCZCsD1Y3z8lqOpBRqQSOeUw2r0WYDxJS6BE1aaoreDVraJIY' });
      if (currentToken) {
        console.log('Token:', currentToken);
      } else {
        console.error('No registration token available. Request permission to generate one.');
      }
    } catch (error) {
      console.error('An error occurred while retrieving token. ', error);
    }
  } else {
    console.warn('Permission not granted for notifications.');
  }
}