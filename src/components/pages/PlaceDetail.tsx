import { Place, usePlaceStore } from '@/store/usePlaceStore';
import styled from '@emotion/styled';
import ReviewSwiper from './../layout/ReviewSwiper';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PlaceDetail = () => {
  const {
    places,
    regionsPlaces,
    currentPlaceId,
    setCurrentPlaceId,
    loading,
    setLoading,
    error,
    setError,
  } = usePlaceStore();
  const [detailPlace, setDetailPlace] = useState<Place | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      setCurrentPlaceId(id);
    }
  }, [id, setCurrentPlaceId]);

  useEffect(() => {
    if (!currentPlaceId) return;

    // 로컬 스토리지 사용
    const storedDetailPlace = localStorage.getItem(`placeDetail_${currentPlaceId}`);
    if (storedDetailPlace) {
      setDetailPlace(JSON.parse(storedDetailPlace));
      setLoading(false);
      return;
    }

    const saveDetailPlaceToLocalStorage = (place: Place | null) => {
      if (place) {
        localStorage.setItem(`placeDetail_${currentPlaceId}`, JSON.stringify(place));
      } else {
        localStorage.removeItem(`placeDetail_${currentPlaceId}`);
      }
    };

    const fetchDetailPlace = () => {
      setLoading(true);

      try {
        const foundPlace =
          places.find(place => place.id === currentPlaceId) ||
          regionsPlaces.find(place => place.id === currentPlaceId);

        if (!foundPlace) {
          setDetailPlace(null);
          saveDetailPlaceToLocalStorage(null);
        } else {
          setDetailPlace(foundPlace);
          saveDetailPlaceToLocalStorage(foundPlace);
        }
      } catch (err) {
        console.error('place detail fetching error: ', err);
        setError('플레이스를 찾을 수 없습니다.');
        setDetailPlace(null);
        saveDetailPlaceToLocalStorage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailPlace();
  }, [currentPlaceId, places, regionsPlaces]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러</div>;

  if (!detailPlace) {
    return <PlaceDetailContainer>플레이스가 존재하지 않습니다.</PlaceDetailContainer>;
  }

  return (
    <PlaceDetailContainer>
      <Section>
        <Img>
          <Large>
            <img
              src={detailPlace.photo[0] || '../../../public/no_image.png'}
              alt={detailPlace.displayName.text}
            />
          </Large>
          <SmallWrap>
            {detailPlace.photo.slice(1).map((photoUrl, idx) => (
              <Small key={idx}>
                <img
                  src={photoUrl || '../../../public/no_image.png'}
                  alt={detailPlace.displayName.text}
                />
              </Small>
            ))}
            {detailPlace.photo.slice(1).length < 4 &&
              Array.from({ length: 4 - detailPlace.photo.slice(1).length }).map((_, idx) => (
                <Small key={detailPlace.photo.length + idx}>
                  <img src="/no_image.png" alt="No Image Available" />
                </Small>
              ))}
          </SmallWrap>
        </Img>
        <Name>
          <span>{detailPlace.primaryTypeDisplayName?.text}</span>
          <h1>{detailPlace.displayName.text}</h1>
        </Name>
        <DetailInfoSection>
          <DetailInfo>
            <Address>
              <b>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                주소
              </b>
              <span>{detailPlace.formattedAddress || '제공되는 정보가 없습니다.'}</span>
            </Address>
            <Opening>
              <b>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                영업시간
              </b>
              {detailPlace.currentOpeningHours?.weekdayDescriptions?.map((description, idx) => (
                <Time key={idx}>{description}</Time>
              )) || '제공되는 정보가 없습니다.'}
            </Opening>
            <Call>
              <b>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
                전화번호
              </b>
              <span>{detailPlace.nationalPhoneNumber || '제공되는 정보가 없습니다.'}</span>
            </Call>
            <Website>
              <b>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                웹사이트
              </b>
              <a href={detailPlace.websiteUri} target="_blank" rel="noopener noreferrer">
                {detailPlace.websiteUri || '제공되는 정보가 없습니다.'}
              </a>
            </Website>
          </DetailInfo>
          <Map>
            <b>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                />
              </svg>
              지도
            </b>
            <div>MAP API 사용하기</div>
          </Map>
        </DetailInfoSection>
      </Section>
      <Section>
        <Review>
          <b>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
            </svg>
            리뷰 (총 {detailPlace.reviews?.length || 0}개)
          </b>
          <ReviewSwiper reviews={detailPlace.reviews} />
        </Review>
      </Section>
    </PlaceDetailContainer>
  );
};

const PlaceDetailContainer = styled.div`
  max-width: 1200px;
  width: auto;
  min-height: calc(100vh - 330px);
  height: auto;
  margin: 50px auto;
`;

const Section = styled.section`
  width: 100%;
  height: auto;
  margin-bottom: 40px;
`;

const Img = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  border-radius: 30px;
  overflow: hidden;
`;

const Large = styled.div`
  width: 55%;
  height: 100%;
  padding: 3px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 30px 0 0 30px;
  }
`;

const SmallWrap = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0 30px 30px 0;
`;

const Small = styled.div`
  width: 50%;
  height: 50%;
  padding: 3px;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &:nth-of-type(2) img {
    border-top-right-radius: 30px;
  }

  &:nth-of-type(4) img {
    border-bottom-right-radius: 30px;
  }
`;

const Name = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  span {
    display: inline-block;
    padding: 0 8px;
    font-size: 13px;
    border-radius: 15px;
    background: #f1f5f9;
  }

  h1 {
    display: inline-block;
    margin-top: 5px;
    font-size: 30px;
    font-weight: bold;
    background: linear-gradient(to top, #ECF6F8 40%, transparent 25%);
`;

const DetailInfoSection = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const DetailInfo = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const Address = styled.div`
  width: 100%;
  margin-bottom: 15px;
  font-size: 15px;

  b {
    display: flex;
    align-items: center;

    svg {
      width: 16px;
      height: 16px;
      margin-right: 3px;
    }
  }

  span {
    margin-left: 20px;
  }
`;

const Opening = styled.ul`
  width: 100%;
  margin-bottom: 15px;
  font-size: 15px;

  b {
    display: flex;
    align-items: center;

    svg {
      width: 16px;
      height: 16px;
      margin-right: 3px;
    }
  }
`;

const Time = styled.li`
  width: 100%;
  height: auto;
  line-height: 25px;
  margin-left: 20px;
  font-size: 15px;
`;

const Call = styled.div`
  width: 100%;
  font-size: 15px;

  b {
    display: flex;
    align-items: center;

    svg {
      width: 16px;
      height: 16px;
      margin-right: 3px;
    }
  }

  span {
    margin-left: 20px;
  }
`;

const Website = styled.div`
  width: 100%;
  margin-top: 15px;
  font-size: 15px;

  b {
    display: flex;
    align-items: center;

    svg {
      width: 16px;
      height: 16px;
      margin-right: 3px;
    }
  }

  a {
    margin-left: 20px;
    color: #56bec0;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Map = styled.div`
  width: 100%;
  font-size: 15px;

  b {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    svg {
      width: 16px;
      height: 16px;
      margin-right: 3px;
    }
  }

  div {
    width: 100%;
    height: 300px;
    border: 1px solid green;
  }
`;

const Review = styled.div`
  width: 100%;
  height: auto;
  padding-top: 30px;
  border-top: 1px solid #56bec0;
  font-size: 15px;

  b {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    svg {
      width: 16px;
      height: 16px;
      margin-right: 3px;
    }
  }
`;

export default PlaceDetail;
