import { Swiper as SwiperComponent, SwiperSlide as SwiperSlideComponent } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import styled from '@emotion/styled';
import {
  seoul,
  busan,
  daegu,
  incheon,
  gwangju,
  daejeon,
  ulsan,
  sejong,
  gyeonggi,
  gangwon,
  chungbuk,
  chungnam,
  jeonbuk,
  jeonnam,
  gyeongbuk,
  gyeongnam,
  jeju,
} from '../../assets/regionsImg';

interface location {
  name: string;
  imageUrl: string;
}

const locations: location[] = [
  { name: '서울', imageUrl: seoul },
  { name: '부산', imageUrl: busan },
  { name: '대구', imageUrl: daegu },
  { name: '인천', imageUrl: incheon },
  { name: '광주', imageUrl: gwangju },
  { name: '대전', imageUrl: daejeon },
  { name: '울산', imageUrl: ulsan },
  { name: '세종', imageUrl: sejong },
  { name: '경기', imageUrl: gyeonggi },
  { name: '강원', imageUrl: gangwon },
  { name: '충북', imageUrl: chungbuk },
  { name: '충남', imageUrl: chungnam },
  { name: '전북', imageUrl: jeonbuk },
  { name: '전남', imageUrl: jeonnam },
  { name: '경북', imageUrl: gyeongbuk },
  { name: '경남', imageUrl: gyeongnam },
  { name: '제주', imageUrl: jeju },
];

const RegionSwiper = () => {
  return (
    <StyledSwiper modules={[Navigation, Pagination]} spaceBetween={30} slidesPerView={6} navigation>
      {locations.map(location => (
        <StyledSwiperSlide key={location.name}>
          <Img src={location.imageUrl} alt={location.name} />
          <Name>{location.name}</Name>
        </StyledSwiperSlide>
      ))}
    </StyledSwiper>
  );
};

const StyledSwiper = styled(SwiperComponent)`
  .swiper-wrapper {
    height: 175px;
    display: flex;
  }

  .swiper-slide {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 20px;
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
  background-color: lightgray;
  height: 100%;
  position: relative;

  &:hover img {
    filter: brightness(0.95);
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  filter: brightness(0.8);
  transition: all 0.2s;
`;

const Name = styled.span`
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default RegionSwiper;
