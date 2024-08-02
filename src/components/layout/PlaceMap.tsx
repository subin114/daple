import { GoogleMap, Marker } from 'react-google-map-wrapper';

interface PlaceMapProps {
  detailPlace: {
    location: {
      latitude: number;
      longitude: number;
    };
  };
}

const PlaceMap = ({ detailPlace }: PlaceMapProps) => {
  return (
    <GoogleMap
      className="h-[300px]"
      zoom={18}
      center={{ lat: detailPlace.location.latitude, lng: detailPlace.location.longitude }}
    >
      <Marker lat={detailPlace.location.latitude} lng={detailPlace.location.longitude} />
    </GoogleMap>
  );
};

export default PlaceMap;
