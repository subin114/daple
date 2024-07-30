import styled from '@emotion/styled';
import TitleDropdownSection from './../layout/TitleDropdownSection';
import Tabs from '../layout/Tabs';
import Search from '../layout/Search';
import { usePlaceStore } from '@/store/usePlaceStore';
import { useCallback, useState } from 'react';
import { fetchPlacesInfo } from '@/api/googlePlaceApi';

export interface Location {
  name: string;
  lat: number;
  lng: number;
}

const locations: Location[] = [
  { name: '서울', lat: 37.5184, lng: 127.0473 },
  { name: '부산', lat: 35.1068, lng: 129.0312 },
  { name: '대구', lat: 35.8683, lng: 128.5988 },
  { name: '인천', lat: 37.4643, lng: 126.5904 },
  { name: '광주', lat: 35.1399, lng: 126.9194 },
  { name: '대전', lat: 36.3515, lng: 127.4239 },
  { name: '울산', lat: 35.5664, lng: 129.319 },
  { name: '세종', lat: 36.4801, lng: 127.2889 },
  { name: '경기', lat: 37.2636, lng: 127.0286 },
  { name: '강원', lat: 37.751, lng: 128.8764 },
  { name: '충북', lat: 36.6419, lng: 127.4898 },
  { name: '충남', lat: 36.8145, lng: 127.1469 },
  { name: '전북', lat: 35.8242, lng: 127.1489 },
  { name: '전남', lat: 34.812, lng: 126.3917 },
  { name: '경북', lat: 36.0194, lng: 129.3434 },
  { name: '경남', lat: 35.2372, lng: 128.6811 },
  { name: '제주', lat: 33.4996, lng: 126.5312 },
];

const Region = () => {
  const { regionsPlaces, setRegionsPlaces, setLoading, setError } = usePlaceStore();
  const [lat, setLat] = useState<number | null>(37.514575);
  const [lng, setLng] = useState<number | null>(127.0495556);

  const [activeLocation, setActiveLocation] = useState<string>(locations[0].name);
  const [activeTab, setActiveTab] = useState<string>('cafe');

  /** 주변 장소 정보 가져오기 */
  const fetchPlacesForTab = useCallback(
    async (types: string[]) => {
      if (lat !== null && lng !== null) {
        setLoading(true);
        try {
          const places = await fetchPlacesInfo(lat, lng, types);
          setRegionsPlaces(places);
          return places;
        } catch (error) {
          console.error('Error fetching nearby places:', error);
          setError('주변 플레이스의 정보를 받아오는 데 실패했어요.');
          return [];
        } finally {
          setLoading(false);
        }
      }
      return [];
    },
    [lat, lng, setLoading, setRegionsPlaces, setError],
  );

  /** 지역 변경 시 */
  const handleLocationChange = (location: Location) => {
    setLat(location.lat);
    setLng(location.lng);
    setActiveLocation(location.name);
  };

  /** 탭 변경 시 */
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <NearContainer>
      <Search
        locations={locations}
        handleLocationChange={handleLocationChange}
        activeLocation={activeLocation}
      />
      <Section>
        <TitleDropdownSection
          title={`${activeLocation} 핫플레이스 (총 ${regionsPlaces.length}개)`}
        />
        <Tabs
          fetchPlacesForTab={fetchPlacesForTab}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          places={regionsPlaces}
        />
      </Section>
    </NearContainer>
  );
};

const NearContainer = styled.div`
  max-width: 1200px;
  width: auto;
  min-height: calc(100vh - 330px);
  height: auto;
  margin: 50px auto;
`;

const Section = styled.section`
  width: 100%;
  height: auto;
  margin-top: 40px;
`;

export default Region;
