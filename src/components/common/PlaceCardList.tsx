import { Place } from '@/store/usePlaceStore';
import PlaceCard from './PlaceCard';
import { Grid, useBreakpointValue } from '@chakra-ui/react';
import { placeTypeMappings } from '@/utils/placeTypeMappings';

interface PlaceCardListProps {
  places: Place[];
}

const translateType = (type: string): string => {
  return placeTypeMappings[type] || type;
};

const PlaceCardList = ({ places }: PlaceCardListProps) => {
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

  return (
    <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={7}>
      {places.map(place => {
        if (!place) {
          return null;
        }

        const translatedType = place.primaryType ? translateType(place.primaryType) : 'Unknown';

        return (
          <PlaceCard
            key={place.id}
            imageUrl={place.photo ?? '../../../public/no_image.png'}
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
