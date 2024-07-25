import { Place } from '@/store/usePlaceStore';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/** Google Place API */
const api = axios.create({
  baseURL: 'https://places.googleapis.com/v1',
  headers: {
    'X-Goog-Api-Key': API_KEY,
    'X-Goog-FieldMask': '*',
    'Content-Type': 'application/json',
  },
});

/** Nearby */
export const fetchNearByPlaces = async (lat: number, lng: number, types: string[]) => {
  const requestBody = {
    includedTypes: types,
    maxResultCount: 20,
    locationRestriction: {
      circle: {
        center: {
          latitude: lat,
          longitude: lng,
        },
        radius: 500,
      },
    },
  };

  try {
    const response = await api.post('/places:searchNearby', requestBody);
    const places = response.data.places;
    console.log('Response:', places);
    // const placeIds = response.data.places.map((place: Place) => place.id);
    return places;
  } catch (err) {
    console.error('Error fetching places: ', err);
    throw err;
  }
};

/** Photos */
const fetchPlacePhotos = async (placeName: string) => {
  try {
    const response = await axios.get(
      `https://places.googleapis.com/v1/${placeName}/media?key=${API_KEY}&maxHeightPx=1600&maxWidthPx=1000`,
    );

    return response.request.responseURL;
  } catch (err) {
    console.error('Error fetching place photos: ', err);
    return null;
  }
};

export const fetchPlacesInfo = async (lat: number, lng: number, types: string[]) => {
  try {
    // 1. 주변 장소 검색
    const places = await fetchNearByPlaces(lat, lng, types);

    // 2. 각 장소의 사진 참조 값 추출 및 사진 요청
    const placesWithPhotos = await Promise.all(
      places.map(async (place: Place) => {
        if (place.photos && place.photos.length > 0) {
          const getPlaceName = place.photos[0]?.name;
          const photo = await fetchPlacePhotos(getPlaceName);
          return { ...place, photo };
        } else {
          return { ...place, photo: null };
        }
      }),
    );
    console.log('Places with photos:', placesWithPhotos);

    return placesWithPhotos;
  } catch (err) {
    console.error('Error fetching nearby places and photos: ', err);
    return [];
  }
};
