import styled from '@emotion/styled';
import { Tabs as TabsContainer, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlaceCardList from '../common/PlaceCardList';
import { Place, usePlaceStore } from '@/store/usePlaceStore';
import { PLACE_TYPES } from '@/utils/placeTypeMappings';
import { useEffect } from 'react';

interface TabData {
  value: string;
  label: string;
  types: string[];
}

interface TabsProps {
  fetchPlacesForTab: (types: string[]) => Promise<Place[]>;
  activeTab: string;
  handleTabChange: (tabValue: string) => void;
  places: Place[];
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

const Tabs = ({ fetchPlacesForTab, activeTab, handleTabChange, places }: TabsProps) => {
  const { loading, error } = usePlaceStore();
  // const [activeTab, setActiveTab] = useState(tabs[0].value);
  // const [tabPlaces, setTabPlaces] = useState<{ [key: string]: Place[] }>(() =>
  //   Object.fromEntries(tabs.map(tab => [tab.value, []])),
  // );

  // const tabPlacesRef = useRef(tabPlaces);

  // const loadPlaces = useCallback(
  //   async (types: string[], tabValue: string) => {
  //     setLoading(true);
  //     console.log('현재 탭 종류는 : ', tabValue, '현재 타입들 종류는 : ', types);

  //     if (tabPlacesRef.current[tabValue].length > 0) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const places = await fetchPlacesForTab(types);
  //       console.log('places의 데이터 받아와보자 : ', places);
  //       tabPlacesRef.current = { ...tabPlacesRef.current, [tabValue]: places };
  //       setTabPlaces(tabPlacesRef.current);
  //     } catch (err) {
  //       console.error('Error fetching places: ', err);
  //       setError('플레이스의 정보를 받아오는 데 실패했어요.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [fetchPlacesForTab, setError, setLoading],
  // );

  // useEffect(() => {
  //   const tab = tabs.find(tab => tab.value === activeTab);
  //   if (tab) {
  //     loadPlaces(tab.types, activeTab);
  //   }
  // }, [activeTab, loadPlaces]);

  useEffect(() => {
    const tab = tabs.find(tab => tab.value === activeTab);
    if (tab) {
      fetchPlacesForTab(tab.types);
    }
  }, [activeTab, fetchPlacesForTab]);

  return (
    <TabsContainer defaultValue={tabs[0].value} onValueChange={handleTabChange}>
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
            <div>로딩중...</div>
          ) : error ? (
            <div>에러발생</div>
          ) : places.length > 0 ? (
            <PlaceCardList places={places} />
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
