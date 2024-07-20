import { Swiper as SwiperComponent, SwiperSlide as SwiperSlideComponent } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import styled from '@emotion/styled';

interface swiper {
  name: string;
  imageUrl: string;
}

const swiperImg: swiper[] = [
  { name: '슬라이드 내용 작성1', imageUrl: '../../../public/slideImg/slide01.jpg' },
  { name: '슬라이드 내용 작성2', imageUrl: '../../../public/slideImg/slide01.jpg' },
  { name: '슬라이드 내용 작성3', imageUrl: '../../../public/slideImg/slide01.jpg' },
  { name: '슬라이드 내용 작성4', imageUrl: '../../../public/slideImg/slide01.jpg' },
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
