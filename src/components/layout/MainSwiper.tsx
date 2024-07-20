import { Swiper as SwiperComponent, SwiperSlide as SwiperSlideComponent } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import styled from '@emotion/styled';

const MainSwiper = () => {
  return (
    <StyledSwiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      <StyledSwiperSlide>Slide 1</StyledSwiperSlide>
      <StyledSwiperSlide>Slide 2</StyledSwiperSlide>
      <StyledSwiperSlide>Slide 3</StyledSwiperSlide>
      <StyledSwiperSlide>Slide 4</StyledSwiperSlide>
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
  }

  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background-color: #56bec0;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #56bec0;

    &::after {
      font-size: 25px;
    }
  }
`;

const StyledSwiperSlide = styled(SwiperSlideComponent)`
  height: 100%;
  background-color: lightgray;
`;

export default MainSwiper;
