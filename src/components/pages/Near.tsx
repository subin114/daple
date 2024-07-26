import styled from '@emotion/styled';
import TitleDropdownSection from './../layout/TitleDropdownSection';
import Tabs from '../layout/Tabs';
import { usePlaceStore } from '@/store/usePlaceStore';
import { useEffect, useState } from 'react';
import { fetchPlacesInfo, fetchFormattedAddress } from '@/api/googlePlaceApi';

const Near = () => {
  const { places, loading, error, setPlaces } = usePlaceStore();
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [address, setAddress] = useState('');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      if (lat !== null && lng !== null) {
        const types = ['restaurant', 'cafe', 'museum', 'art_gallery'];
        try {
          const data = await fetchPlacesInfo(lat, lng, types);
          setPlaces(data);
        } catch (error) {
          console.error('Error fetching nearby places:', error);
        }
      }
    };

    fetchNearbyPlaces();
  }, [lat, lng]);

  return (
    <NearContainer>
      <Section>
        <TitleDropdownSection title={`${address} 핫플레이스 (총 ${places.length}개)`} />
        <Tabs places={places} />
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
