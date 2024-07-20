import styled from '@emotion/styled';
import { Tabs as TabsContainer, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlaceCardList from '../common/PlaceCardList';

interface TabData {
  value: string;
  label: string;
}

const tabs: TabData[] = [
  { value: 'all', label: '전체' },
  { value: 'restaurant', label: '음식점' },
  { value: 'cafe', label: '카페' },
  { value: 'shopping', label: '쇼핑' },
  { value: 'exhibition', label: '공연/전시' },
  { value: 'unique', label: '이색데이트' },
  { value: 'etc', label: '기타' },
];

const Tabs = () => {
  return (
    <TabsContainer defaultValue="all">
      <StyledTabsList>
        {tabs.map(tab => (
          <TabsTrigger value={tab.value} key={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </StyledTabsList>

      {tabs.map(tab => (
        <TabsContent value={tab.value} key={tab.value}>
          <PlaceCardList />
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

export default Tabs;
