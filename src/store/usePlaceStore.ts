import { create } from 'zustand';

export interface Place {
  adrFormatAddress: string;
  currentOpeningHours?: {
    openNow: boolean;
    periods?: {
      open: {
        date: {
          day: number;
          month: number;
          year: number;
        };
        day: number;
        hour: number;
        minute: number;
      };
      close: {
        date: {
          day: number;
          month: number;
          year: number;
        };
        day: number;
        hour: number;
        minute: number;
      };
    }[];
    weekdayDescriptions?: string[];
  };
  displayName: {
    text: string;
    languageCode: string;
  };
  formattedAddress: string;
  googleMapsUri: string;
  iconBackgroundColor: string;
  iconMaskBaseUri: string;
  id: string;
  internationalPhoneNumber: number;
  location: {
    latitude: number;
    longitude: number;
  };
  name: string;
  nationalPhoneNumber: string;
  photo: string[];
  photos?: {
    authorAttributions: {
      display: string;
      photoUri: string;
      uri: string;
    };
    heightPx: number;
    name: string;
    widthPx: number;
  }[];
  primaryType: string;
  primaryTypeDisplayName: {
    languageCode: string;
    text: string;
  };
  rating: number;
  reviews?: {
    authorAttribution: {
      displayName: string;
      photoUri: string;
      uri: string;
    };
    name: string;
    originalText: {
      languageCode: string;
      text: string;
    };
    publishTime: string;
    rating: number;
    relativePublishTimeDescription: string;
    text: {
      languageCode: string;
      text: string;
    };
  }[];
  shortFormattedAddress: string;
  types?: string[];
  websiteUri?: string;
}

interface PlaceStore {
  places: Place[];
  setPlaces: (places: Place[]) => void;
  regionsPlaces: Place[];
  setRegionsPlaces: (places: Place[]) => void;
  bookmarkPlaces: Place[];
  setBookmarkPlaces: (places: Place[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string) => void;
  currentPlaceId: string | null;
  setCurrentPlaceId: (id: string | null) => void;
}

export const usePlaceStore = create<PlaceStore>(set => ({
  places: [],
  setPlaces: (places: Place[]) => set({ places }),
  regionsPlaces: [],
  setRegionsPlaces: (regionsPlaces: Place[]) => set({ regionsPlaces }),
  bookmarkPlaces: [],
  setBookmarkPlaces: (bookmarkPlaces: Place[]) => set({ bookmarkPlaces }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  error: null,
  setError: (error: string) => set({ error }),
  currentPlaceId: null,
  setCurrentPlaceId: (id: string | null) => set({ currentPlaceId: id }),
}));
