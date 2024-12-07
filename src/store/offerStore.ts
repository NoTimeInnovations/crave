import { create } from 'zustand';
import { ref, push, remove, onValue, off, get as getDbValue } from 'firebase/database';
import { doc, getDoc } from 'firebase/firestore';
import { rtdb, db } from '@/lib/firebase';
import { useAuthStore } from './authStore';

export interface Offer {
  id: string;
  menuItemId: string;
  newPrice: number;
  validUntil: Date;
  hotelId: string;
  hotelName: string;
}

interface OfferState {
  offers: Offer[];
  loading: boolean;
  error: string | null;
  subscribeToOffers: () => void;
  unsubscribeFromOffers: () => void;
  addOffer: (offer: Omit<Offer, 'id' | 'hotelId' | 'hotelName'>) => Promise<void>;
  deleteOffer: (id: string) => Promise<void>;
}

export const useOfferStore = create<OfferState>((set, get) => {
  let offersRef: ReturnType<typeof ref> | null = null;

  return {
    offers: [],
    loading: false,
    error: null,

    subscribeToOffers: () => {
      set({ loading: true });
      offersRef = ref(rtdb, 'offers');
      
      onValue(offersRef, (snapshot) => {
        const data = snapshot.val();
        const offers: Offer[] = [];
        
        if (data) {
          Object.keys(data).forEach((key) => {
            offers.push({
              id: key,
              ...data[key],
              validUntil: new Date(data[key].validUntil)
            });
          });
        }
        
        set({ offers, loading: false });
      }, (error) => {
        set({ error: error.message, loading: false });
      });
    },

    unsubscribeFromOffers: () => {
      if (offersRef) {
        off(offersRef);
      }
    },

    addOffer: async (offer) => {
      const user = useAuthStore.getState().user;
      if (!user) return;

      try {
        set({ error: null });
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (!userDocSnap.exists()) {
          throw new Error('User data not found');
        }

        const userData = userDocSnap.data();
        
        const offersRef = ref(rtdb, 'offers');
        await push(offersRef, {
          ...offer,
          hotelId: user.uid,
          hotelName: userData.hotelName,
          validUntil: offer.validUntil.toISOString()
        });
      } catch (error) {
        set({ error: (error as Error).message });
        throw error;
      }
    },

    deleteOffer: async (id) => {
      const user = useAuthStore.getState().user;
      if (!user) return;

      try {
        set({ error: null });
        const offerRef = ref(rtdb, `offers/${id}`);
        await remove(offerRef);
      } catch (error) {
        set({ error: (error as Error).message });
        throw error;
      }
    },
  };
});