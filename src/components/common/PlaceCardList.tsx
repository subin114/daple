import PlaceCard from './PlaceCard';
import { Grid, useBreakpointValue } from '@chakra-ui/react';

const PlaceCardList = () => {
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
      {cards.map(card => (
        <PlaceCard
          key={card.id}
          imageUrl={card.imageUrl}
          category={card.category}
          title={card.title}
          address={card.address}
        />
      ))}
    </Grid>
  );
};

export default PlaceCardList;
