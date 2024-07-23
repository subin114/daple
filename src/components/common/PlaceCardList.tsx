import { Place } from '@/store/usePlaceStore';
import PlaceCard from './PlaceCard';
import { Grid, useBreakpointValue } from '@chakra-ui/react';

interface PlaceCardListProps {
  places: Place[];
}

const PlaceCardList = ({ places }: PlaceCardListProps) => {
  const cards = [
    {
      id: 1,
      imageUrl: 'https://picsum.photos/300/180',
      category: '전체',
      title: '장소 이름을 입력하세요',
      address: '주소를 입력하세요',
    },
    {
      id: 2,
      imageUrl: 'https://picsum.photos/300/180',
      category: '전체',
      title: '장소 이름을 입력하세요',
      address: '주소를 입력하세요',
    },
    {
      id: 3,
      imageUrl: 'https://picsum.photos/300/180',
      category: '전체',
      title: '장소 이름을 입력하세요',
      address: '주소를 입력하세요',
    },
    {
      id: 4,
      imageUrl: 'https://picsum.photos/300/180',
      category: '전체',
      title: '장소 이름을 입력하세요',
      address: '주소를 입력하세요',
    },
    {
      id: 5,
      imageUrl: 'https://picsum.photos/300/180',
      category: '전체',
      title: '장소 이름을 입력하세요',
      address: '주소를 입력하세요',
    },
    {
      id: 6,
      imageUrl: 'https://picsum.photos/300/180',
      category: '전체',
      title: '장소 이름을 입력하세요',
      address: '주소를 입력하세요',
    },
    {
      id: 7,
      imageUrl: 'https://picsum.photos/300/180',
      category: '전체',
      title: '장소 이름을 입력하세요',
      address: '주소를 입력하세요',
    },
    {
      id: 8,
      imageUrl: 'https://picsum.photos/300/180',
      category: '전체',
      title: '장소 이름을 입력하세요',
      address: '주소를 입력하세요',
    },
  ];

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

  return (
    <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={7}>
      {places.map(place => (
        <PlaceCard
          key={place.id}
          imageUrl={place.imageUrl}
          category={place.category_group_name}
          title={place.place_name}
          address={place.address_name}
        />
      ))}
    </Grid>
  );
};

export default PlaceCardList;
