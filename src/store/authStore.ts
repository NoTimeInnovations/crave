import { create } from 'zustand';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User 
} from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { auth } from '@/lib/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signUpAsPartner: (email: string, password: string, hotelName: string, location: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const db = getFirestore();

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  signUp: async (email, password) => {
    try {
      set({ error: null });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        role: 'user',
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
  signUpAsPartner: async (email, password, hotelName, location) => {
    try {
      set({ error: null });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        hotelName,
        location,
        role: 'hotel',
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
  signIn: async (email, password) => {
    try {
      set({ error: null });
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
}));

// Set up auth state listener
onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user, loading: false });
});