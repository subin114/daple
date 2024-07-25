import styled from '@emotion/styled';
import TitleDropdownSection from './../layout/TitleDropdownSection';
import Tabs from '../layout/Tabs';
import { usePlaceStore } from '@/store/usePlaceStore';
import { useEffect, useState } from 'react';
import { fetchPlacesInfo } from '@/api/googlePlaceApi';

const Near = () => {
  const { places, loading, error, setPlaces } = usePlaceStore();
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  /** Geolocation API - 현재 사용자의 위치 가져오기 */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
  }, []);

  /** fetching nearby places */
  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      if (lat !== null && lng !== null) {
        const types = ['restaurant', 'cafe', 'museum', 'art_gallery'];
        try {
          // const data = await fetchPlacesInfo(lat, lng, types);
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
