import styled from '@emotion/styled';
import { Tabs as TabsContainer, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlaceCardList from '../common/PlaceCardList';
import { Place, usePlaceStore } from '@/store/usePlaceStore';
import { PLACE_TYPES } from '@/utils/placeTypeMappings';
import { useEffect, useState } from 'react';

interface TabData {
  value: string;
  label: string;
  types: string[];
}

interface TabsProps {
  fetchPlacesForTab: (types: string[]) => Promise<Place[]>;
}

const tabs: TabData[] = [
  { value: 'cafe', label: '카페/디저트', types: PLACE_TYPES.CAFE_AND_DESSERT },
  { value: 'restaurant', label: '음식점', types: PLACE_TYPES.RESTAURANTS },
  { value: 'shopping', label: '쇼핑', types: PLACE_TYPES.SHOP },
  { value: 'attractions', label: '관광명소', types: PLACE_TYPES.ATTRACTIONS },
  { value: 'exhibition', label: '공연/전시', types: PLACE_TYPES.EXHIBITION },
  { value: 'unique', label: '이색데이트', types: PLACE_TYPES.UNIQUE },
  { value: 'sports', label: '스포츠', types: PLACE_TYPES.SPORTS },
  { value: 'park', label: '공원', types: PLACE_TYPES.PARK },
  { value: 'camping', label: '캠핑', types: PLACE_TYPES.CAMPING },
  { value: 'lodging', label: '숙소', types: PLACE_TYPES.LODGING },
  { value: 'traffic', label: '교통', types: PLACE_TYPES.TRAFFIC },
];

const Tabs = ({ fetchPlacesForTab }: TabsProps) => {
  const { loading, setLoading, error, setError } = usePlaceStore();
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [tabPlaces, setTabPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const loadPlaces = async () => {
      setLoading(true);

      try {
        const tab = tabs.find(tab => tab.value === activeTab);
        if (tab) {
          const places = await fetchPlacesForTab(tab.types);
          setTabPlaces(places);
        }
      } catch (err) {
        console.error('Error fetching places: ', err);
        setError('플레이스의 정보를 받아오는 데 실패했어요. 잠시 후 시도해주세요.');
      }
      setLoading(false);
    };

    loadPlaces();
  }, [activeTab, fetchPlacesForTab, setLoading, setError]);

  return (
    <TabsContainer defaultValue={tabs[0].value} onValueChange={setActiveTab}>
      <StyledTabsList>
        {tabs.map(tab => (
          <TabsTrigger value={tab.value} key={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </StyledTabsList>

      {tabs.map(tab => (
        <TabsContent value={tab.value} key={tab.value}>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : tabPlaces.length > 0 ? (
            <PlaceCardList places={tabPlaces} />
          ) : (
            <NoPlacesMessage>해당하는 플레이스가 없습니다. ( ᴗ_ᴗ̩̩ )</NoPlacesMessage>
          )}
        </TabsContent>
      ))}
    </TabsContainer>
  );
};

const StyledTabsList = styled(TabsList)`
  border-radius: 20px;
  margin-bottom: 15px;

  button {
    border-radius: 20px;
    padding: 6px 14px;
  }
`;

const NoPlacesMessage = styled.div``;

export default Tabs;
