import { Swiper as SwiperComponent, SwiperSlide as SwiperSlideComponent } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import styled from '@emotion/styled';
import { slide01, slide02, slide03 } from '../../assets/slideImg';
import { ArrowRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface swiper {
  name: string;
  imageUrl: string;
  nav: string;
}

const swiperImg: swiper[] = [
  { name: '내 근처 핫플 보러가기', imageUrl: slide01, nav: '/near' },
  { name: '지역별 핫플 보러가기', imageUrl: slide02, nav: '/region/서울' },
  {
    name: '커뮤니티 보러가기',
    imageUrl: slide03,
    nav: '/community',
  },
];

const MainSwiper = () => {
  const navigate = useNavigate();

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
          <Name onClick={() => navigate(swiper.nav)}>
            {swiper.name} <ArrowRightIcon />
          </Name>
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
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const Name = styled.span`
  position: absolute;
  bottom: 155px;
  left: 108px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 13px;
  background: rgba(205, 205, 205, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(89, 190, 192, 0.2);
    border: 1px solid rgba(89, 190, 192, 0.6);
  }

  svg {
    width: 13px;
    height: 13px;
    margin-left: 4px;
  }
`;

export default MainSwiper;
