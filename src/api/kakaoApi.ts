import axios from 'axios';

const API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

// 특정 위치를 기준으로 반경 내 장소 검색
export const fetchPlacesByKeyword = async (
  longitude: number,
  latitude: number,
  keyword: string,
) => {
  const x = longitude.toString();
  const y = latitude.toString();

  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&x=${x}&y=${y}&radius=5000`;

  console.log('Fetching URL:', url); // 디버깅 로그 추가

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
    });

    return response.data.documents;
  } catch (error) {
    console.error('Failed to fetch places: ', error);
  }
};
