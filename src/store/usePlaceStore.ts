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
  name: string;
  nationalPhoneNumber: string;
  photo: string;
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
  types?: string[];
  websiteUri?: string;
}

interface PlaceStore {
  places: Place[];
  setPlaces: (places: Place[]) => void;
  loading: boolean;
  error: string | null;
}

export const usePlaceStore = create<PlaceStore>(set => ({
  places: [],
  setPlaces: (places: Place[]) => set({ places }),
  loading: false,
  error: null,
}));
