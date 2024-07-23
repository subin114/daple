import { fetchPlacesByKeyword } from '@/api/kakaoApi';
import { create } from 'zustand';

export interface Place {
  id: string;
  imageUrl: string;
  category_group_name: string;
  place_name: string;
  address_name: string;
}

interface PlaceState {
  places: Place[];
  fetchPlaces: (latitude: string, longitude: string) => void;
}

const usePlaceStore = create<PlaceState>(set => ({
  places: [],
  fetchPlaces: async (latitude, longitude) => {
    const keywords = ['음식점', '카페', '쇼핑', '전시', '이색데이트', '기타'];

    try {
      // 여러 API 호출을 동시에 실행
      const results = await Promise.all(
        keywords.map(keyword =>
          fetchPlacesByKeyword(parseFloat(latitude), parseFloat(longitude), keyword),
        ),
      );

      const response = results.flat();

      // 중복된 ID를 제거
      const uniquePlaces = Array.from(new Map(response.map(place => [place.id, place])).values());

      set({ places: uniquePlaces });
    } catch (error) {
      console.error('Failed to fetch places: ', error);
    }
  },
}));

export default usePlaceStore;
