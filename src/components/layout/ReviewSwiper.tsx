import { Swiper as SwiperComponent, SwiperSlide as SwiperSlideComponent } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import styled from '@emotion/styled';
import ReviewProfileIcon from '@/assets/icons/ReviewProfileIcon';
import RatingIcon from '@/assets/icons/RatingIcon';

interface ReviewSwiperProps {
  reviews?: {
    authorAttribution: {
      displayName: string;
      photoUri: string;
      uri: string;
    };
    name: string;
    originalText: {
      languageCode: string;
      text: string;
    };
    publishTime: string;
    rating: number;
    relativePublishTimeDescription: string;
    text?: {
      languageCode: string;
      text: string;
    };
  }[];
}

const ReviewSwiper = ({ reviews }: ReviewSwiperProps) => {
  return (
    <StyledSwiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={2}
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
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      }}
    >
      {reviews?.map((review, idx) => (
        <StyledSwiperSlide key={idx}>
          <Nickname>
            <ReviewProfileIcon />
            {review.authorAttribution.displayName}
          </Nickname>
          <Rating>
            <RatingIcon />
            {review.rating}
          </Rating>
          {review.text?.text ? (
            <Review>{review.text?.text}</Review>
          ) : (
            <None>리뷰를 작성하지 않았어요</None>
          )}
          <Time>{review.relativePublishTimeDescription}</Time>
        </StyledSwiperSlide>
      ))}
    </StyledSwiper>
  );
};

const StyledSwiper = styled(SwiperComponent)`
  height: auto;
  margin-top: 10px;

  .swiper-wrapper {
    width: 100%;
    height: auto;
    display: flex;
  }

  .swiper-slide {
    height: 100%;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: 20px;
    cursor: pointer;
    overflow: hidden;
    font-size: 15px;
    padding: 20px;
    background-color: #fafafa;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #56bec0;
    background-color: #fff;
    border-radius: 30px;
    width: 36px;
    height: 36px;
    transition: all 0.2s;
    box-shadow:
      rgba(17, 17, 26, 0.05) 0px 4px 16px,
      rgba(17, 17, 26, 0.05) 0px 8px 32px;

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

const Nickname = styled.span`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #56bec0;

  svg {
    width: 28px;
    height: 28px;
    margin-right: 3px;
  }
`;

const Review = styled.span`
  margin-bottom: 5px;
  text-align: justify;
`;

const None = styled.span`
  margin-bottom: 5px;
  text-align: justify;
  color: #ccc;
`;

const Rating = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 5px;

  svg {
    width: 16px;
    height: 16px;
    margin-right: 3px;
    color: gold;
  }
`;

const Time = styled.span`
  margin-left: auto;
`;

export default ReviewSwiper;
