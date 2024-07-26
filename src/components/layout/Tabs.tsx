import styled from '@emotion/styled';
import { Tabs as TabsContainer, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlaceCardList from '../common/PlaceCardList';
import { Place } from '@/store/usePlaceStore';
import { PLACE_TYPES } from '@/utils/placeTypeMappings';

interface TabData {
  value: string;
  label: string;
  types: string[];
}

interface TabsProps {
  places: Place[];
}

const tabs: TabData[] = [
  { value: 'cafe', label: '카페/디저트', types: PLACE_TYPES.CAFE_AND_DESSERT },
  { value: 'restaurant', label: '음식점', types: PLACE_TYPES.RESTAURANTS },
  { value: 'restaurant_categories', label: '레스토랑', types: PLACE_TYPES.RESTAURANT_CATEGORIES },
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

const filterPlacesByTypes = (places: Place[], types: string[], tabValue: string) => {
  if (tabValue === 'all') {
    return places;
  }

  return places.filter(place => types.some(type => place.primaryType?.includes(type)));
};

const Tabs = ({ places }: TabsProps) => {
  return (
    <TabsContainer defaultValue="cafe">
      <StyledTabsList>
        {tabs.map(tab => (
          <TabsTrigger value={tab.value} key={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </StyledTabsList>

      {tabs.map(tab => (
        <TabsContent value={tab.value} key={tab.value}>
          {filterPlacesByTypes(places, tab.types, tab.value).length > 0 ? (
            <PlaceCardList places={filterPlacesByTypes(places, tab.types, tab.value)} />
          ) : (
            <NoPlacesMessage>해당하는 플레이스가 없습니다.</NoPlacesMessage>
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
