import styled from '@emotion/styled';
import TitleDropdownSection from './../layout/TitleDropdownSection';
import Tabs from '../layout/Tabs';
import usePlaceStore from '@/store/usePlaceStore';
import { useEffect } from 'react';

const Near = () => {
  const { fetchPlaces, places } = usePlaceStore();

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const coords = await getCurrentLocation();
        console.log('Fetching places for coords!@!@!@!@!@:', coords);
        fetchPlaces(coords.latitude.toString(), coords.longitude.toString());
      } catch (error) {
        console.error('Failed to get current location or fetch places: ', error);
      }
    };

    fetchCurrentLocation();
  }, []);

  /** Geolocation API - 현재 사용자의 위치를 비동기적으로 가져옴 */
  const getCurrentLocation = (): Promise<GeolocationCoordinates> => {
    return new Promise<GeolocationCoordinates>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position.coords),
        error => reject(error),
        { enableHighAccuracy: true },
      );
    });
  };

  console.log('우와앙', places);

  return (
    <NearContainer>
      <Section>
        <TitleDropdownSection title={`핫플레이스 (총 ${places.length}개)`} />
        <Tabs places={places} />
      </Section>
    </NearContainer>
  );
};

const NearContainer = styled.div`
  max-width: 1200px;
  width: auto;
  margin: 50px auto;
`;

const Section = styled.section`
  width: 100%;
  height: auto;
  margin-top: 40px;
`;

export default Near;
