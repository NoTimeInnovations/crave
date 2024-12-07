import { create } from 'zustand';

export interface Offer {
  id: string;
  menuItemId: string;
  newPrice: number;
  validUntil: Date;
}

interface OfferState {
  offers: Offer[];
  addOffer: (offer: Omit<Offer, 'id'>) => void;
  deleteOffer: (id: string) => void;
}

export const useOfferStore = create<OfferState>((set) => ({
  offers: [],
  addOffer: (offer) =>
    set((state) => ({
      offers: [...state.offers, { ...offer, id: crypto.randomUUID() }],
    })),
  deleteOffer: (id) =>
    set((state) => ({
      offers: state.offers.filter((offer) => offer.id !== id),
    })),
}));