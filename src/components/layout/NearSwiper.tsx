import { Swiper as SwiperComponent, SwiperSlide as SwiperSlideComponent } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import styled from '@emotion/styled';

const NearSwiper = () => {
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
      <StyledSwiperSlide>Slide 1</StyledSwiperSlide>
      <StyledSwiperSlide>Slide 2</StyledSwiperSlide>
      <StyledSwiperSlide>Slide 3</StyledSwiperSlide>
      <StyledSwiperSlide>Slide 4</StyledSwiperSlide>
      <StyledSwiperSlide>Slide 5</StyledSwiperSlide>
      <StyledSwiperSlide>Slide 6</StyledSwiperSlide>
      <StyledSwiperSlide>Slide 7</StyledSwiperSlide>
      <StyledSwiperSlide>Slide 8</StyledSwiperSlide>
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
    background-color: #f0f0f0;
    border-radius: 30px;
    cursor: pointer;
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
`;

export default NearSwiper;
