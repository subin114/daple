import { Swiper as SwiperComponent, SwiperSlide as SwiperSlideComponent } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import styled from '@emotion/styled';

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                clipRule="evenodd"
              />
            </svg>

            {review.authorAttribution.displayName}
          </Nickname>
          <Rating>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                clipRule="evenodd"
              />
            </svg>
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
