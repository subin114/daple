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
import { useNavigate } from 'react-router-dom';

interface location {
  name: string;
  imageUrl: string;
  link: string;
}

const locations: location[] = [
  { name: '서울', imageUrl: seoul, link: '/region/서울' },
  { name: '부산', imageUrl: busan, link: '/region/부산' },
  { name: '대구', imageUrl: daegu, link: '/region/대구' },
  { name: '인천', imageUrl: incheon, link: '/region/인천' },
  { name: '광주', imageUrl: gwangju, link: '/region/광주' },
  { name: '대전', imageUrl: daejeon, link: '/region/대전' },
  { name: '울산', imageUrl: ulsan, link: '/region/울산' },
  { name: '세종', imageUrl: sejong, link: '/region/세종' },
  { name: '경기', imageUrl: gyeonggi, link: '/region/경기' },
  { name: '강원', imageUrl: gangwon, link: '/region/강원' },
  { name: '충북', imageUrl: chungbuk, link: '/region/충북' },
  { name: '충남', imageUrl: chungnam, link: '/region/충남' },
  { name: '전북', imageUrl: jeonbuk, link: '/region/전북' },
  { name: '전남', imageUrl: jeonnam, link: '/region/전남' },
  { name: '경북', imageUrl: gyeongbuk, link: '/region/경북' },
  { name: '경남', imageUrl: gyeongnam, link: '/region/경남' },
  { name: '제주', imageUrl: jeju, link: '/region/제주' },
];

const RegionSwiper = () => {
  const navigate = useNavigate();

  return (
    <StyledSwiper modules={[Navigation, Pagination]} spaceBetween={30} slidesPerView={6} navigation>
      {locations.map(location => (
        <StyledSwiperSlide key={location.name} onClick={() => navigate(location.link)}>
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
