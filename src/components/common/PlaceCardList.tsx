import { Place } from '@/store/usePlaceStore';
import PlaceCard from './PlaceCard';
import { Grid, useBreakpointValue } from '@chakra-ui/react';

interface PlaceCardListProps {
  places: Place[];
}

// 타입 매핑
const typeTranslations: { [key: string]: string } = {
  restaurant: '음식점',
  food: '음식점',
  cafe: '카페',
  museum: '박물관',
  art_gallery: '전시',
};

const translateType = (type: string): string => {
  return typeTranslations[type] || type;
};

const PlaceCardList = ({ places }: PlaceCardListProps) => {
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

  return (
    <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={7}>
      {places.map(place => {
        if (!place) {
          return null;
        }

        const translatedType = place.types?.[1] ? translateType(place.types[1]) : 'Unknown';

        return (
          <PlaceCard
            key={place.id}
            imageUrl={place.photo ?? 'default-image-url'}
            // category={place.types?.[1] ?? 'Unknown'}
            category={translatedType}
            title={place.displayName?.text ?? 'no title'}
            address={place.formattedAddress ?? 'no vicinity'}
          />
        );
      })}
    </Grid>
  );
};

export default PlaceCardList;
