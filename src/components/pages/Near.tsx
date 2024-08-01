import styled from '@emotion/styled';
import TitleDropdownSection from './../layout/TitleDropdownSection';
import Tabs from '../layout/Tabs';
import { usePlaceStore } from '@/store/usePlaceStore';
import { useCallback, useEffect, useState } from 'react';
import { fetchPlacesInfo, fetchFormattedAddress } from '@/api/googlePlaceApi';
import ErrorBoundary from './../../utils/ErrorBoundary';

const Near = () => {
  const { places, setPlaces, setLoading, setError } = usePlaceStore();
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [address, setAddress] = useState('');
  const [activeTab, setActiveTab] = useState<string>('cafe');

  /** 현재 위치 주소 가져오기 */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;
      setLat(latitude);
      setLng(longitude);

      const formattedAddress = await fetchFormattedAddress(latitude, longitude);
      setAddress(formattedAddress || '현재 위치');
    });
  }, []);

  /** 주변 장소 정보 가져오기 */
  const fetchPlacesForTab = useCallback(
    async (types: string[]) => {
      if (lat !== null && lng !== null) {
        setLoading(true);
        try {
          const places = await fetchPlacesInfo(lat, lng, types);
          setPlaces(places);
          setLoading(false);
          return places;
        } catch (error) {
          console.error('Error fetching nearby places:', error);
          setError('주변 플레이스의 정보를 받아오는 데 실패했어요.');
          setLoading(false);
          return [];
        }
      }
      return [];
    },
    [lat, lng, setLoading, setPlaces, setError],
  );

  /** 탭 변경 시 호출되는 함수 */
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <NearContainer>
      <Section>
        <TitleDropdownSection title={`${address} 핫플레이스 (총 ${places.length}개)`} />
        <ErrorBoundary>
          <Tabs
            fetchPlacesForTab={fetchPlacesForTab}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            places={places}
            sourcePage="near"
          />
        </ErrorBoundary>
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

export default Near;
