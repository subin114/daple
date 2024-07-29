import { Swiper as SwiperComponent, SwiperSlide as SwiperSlideComponent } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import styled from '@emotion/styled';
import { slide01, slide02, slide03 } from '../../assets/slideImg';

interface swiper {
  name: string;
  imageUrl: string;
}

const swiperImg: swiper[] = [
  { name: '1', imageUrl: slide02 },
  { name: '2', imageUrl: slide01 },
  { name: '3', imageUrl: slide03 },
];

const MainSwiper = () => {
  return (
    <StyledSwiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {swiperImg.map(swiper => (
        <StyledSwiperSlide key={swiper.name}>
          <Img src={swiper.imageUrl} alt={swiper.name} />
          <Name>{swiper.name}</Name>
        </StyledSwiperSlide>
      ))}
    </StyledSwiper>
  );
};

const StyledSwiper = styled(SwiperComponent)`
  .swiper-wrapper {
    height: 400px;
    display: flex;
  }

  .swiper-slide {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 30px;
    overflow: hidden;
  }

  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background-color: #ffffff;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #ffffff;

    &::after {
      font-size: 25px;
    }
  }
`;

const StyledSwiperSlide = styled(SwiperSlideComponent)`
  height: 100%;
  background-color: lightgray;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const Name = styled.span`
  color: #000;
  font-size: 25px;
  position: absolute;
  bottom: 30%;
  left: 10%;
`;

export default MainSwiper;
