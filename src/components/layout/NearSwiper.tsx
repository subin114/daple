import { Swiper as SwiperComponent, SwiperSlide as SwiperSlideComponent } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import styled from '@emotion/styled';
import { Place, usePlaceStore } from '@/store/usePlaceStore';
import { useCallback, useEffect, useState } from 'react';
import { fetchFormattedAddress, fetchPlacesInfo } from '@/api/googlePlaceApi';
import { PLACE_TYPES } from '@/utils/placeTypeMappings';
import AddressIcon from '@/assets/icons/AddressIcon';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoriesData {
  value: string;
  label: string;
  types: string[];
  description: string;
}

const categories: CategoriesData[] = [
  {
    value: 'cafe',
    label: '카페/디저트',
    types: PLACE_TYPES.CAFE_AND_DESSERT,
    description: '가볍게 들르기 좋은 카페',
  },
  {
    value: 'restaurant',
    label: '음식점',
    types: PLACE_TYPES.RESTAURANTS,
    description: '나도 모르게 빠져드는 맛집',
  },
  { value: 'shopping', label: '쇼핑', types: PLACE_TYPES.SHOP, description: '즐거운 쇼핑 공간' },
  {
    value: 'attractions',
    label: '관광명소',
    types: PLACE_TYPES.ATTRACTIONS,
    description: '놓치면 안될 관광명소',
  },
];

const NearSwiper = () => {
  const { loading, setLoading, setError } = usePlaceStore();
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [_, setAddress] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState<(Place & { description: string })[]>([]);
  const navigate = useNavigate();

  /** 현재 위치 주소 가져오기 */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;
      setLat(latitude);
      setLng(longitude);

      const formattedAddress = await fetchFormattedAddress(latitude, longitude);
      setAddress(formattedAddress || '현재 위치');
    });
  }, []);

  /** 주변 장소 정보 가져오기 */
  const fetchPlacesForCategories = useCallback(async () => {
    if (lat !== null && lng !== null) {
      setLoading(true);
      try {
        const placeData = await Promise.all(
          categories.map(async category => {
            const places = await fetchPlacesInfo(lat, lng, category.types);
            return {
              ...places[0],
              description: category.description,
            };
          }),
        );
        setFilteredPlaces(placeData.filter(Boolean));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching nearby places:', error);
        setError('주변 플레이스의 정보를 받아오는 데 실패했어요.');
        setLoading(false);
        return [];
      }
    }
    return [];
  }, [lat, lng, setLoading, setError]);

  useEffect(() => {
    fetchPlacesForCategories();
  }, [fetchPlacesForCategories]);

  const handleSlideClick = (place: Place & { description: string }) => {
    sessionStorage.setItem(`placeDetail_${place.id}`, JSON.stringify(place));
    navigate(`/near/detail/${place.id}`);
  };

  return (
    <StyledSwiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={4}
      navigation
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
    >
      {loading
        ? Array.from({ length: 4 }).map((_, idx) => (
            <StyledSwiperSlide key={idx}>
              <div className="flex flex-col space-y-3" key={idx}>
                <Skeleton className="h-[350px] w-[277px] rounded-xl" />
              </div>
            </StyledSwiperSlide>
          ))
        : filteredPlaces.map((place, idx) => (
            <StyledSwiperSlide key={idx} onClick={() => handleSlideClick(place)}>
              <BgImg backgroundImage={place?.photo?.[0]}>
                <Description>{place?.description}</Description>
                <Name>{place?.displayName?.text}</Name>
                <Address>
                  <AddressIcon /> {place?.formattedAddress}
                </Address>
              </BgImg>
            </StyledSwiperSlide>
          ))}
    </StyledSwiper>
  );
};

const StyledSwiper = styled(SwiperComponent)`
  .swiper-wrapper {
    height: 350px;
    display: flex;
  }

  .swiper-slide {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    cursor: pointer;
    overflow: hidden;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #56bec0;
    background-color: #fff;
    border-radius: 30px;
    width: 36px;
    height: 36px;
    transition: all 0.2s;

    &::after {
      font-size: 14px;
      font-weight: bold;
    }

    &:hover {
      color: #fff;
      background-color: #56bec0;
    }
  }
`;

const StyledSwiperSlide = styled(SwiperSlideComponent)`
  height: 100%;
`;

const BgImg = styled.div<{ backgroundImage: string | undefined }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(66, 92, 92, 0.7) 0%,
      rgba(66, 92, 92, 0.2) 65%,
      rgba(66, 92, 92, 0) 100%
    );
    opacity: 0.7;
    z-index: 1;
  }
`;

const Description = styled.span`
  border-bottom: 1px solid #fff;
  padding-bottom: 5px;
  margin-bottom: 5px;
  position: relative;
  z-index: 2;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

const Name = styled.h2`
  position: relative;
  z-index: 2;
  font-size: 14px;
  color: #fff;
`;

const Address = styled.span`
  margin-top: auto;
  position: relative;
  z-index: 2;
  font-size: 11px;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    width: 14px;
    height: 14px;
    margin-right: 2px;
  }
`;

export default NearSwiper;
