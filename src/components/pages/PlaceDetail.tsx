import { Place, usePlaceStore } from '@/store/usePlaceStore';
import styled from '@emotion/styled';
import ReviewSwiper from './../layout/ReviewSwiper';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { translateType } from '../common/PlaceCardList';
import { GoogleMapApiLoader } from 'react-google-map-wrapper';
import { API_KEY } from '@/api/googlePlaceApi';
import PlaceMap from '../layout/PlaceMap';
import AddressIcon from '@/assets/icons/AddressIcon';
import OpeningHours from '@/assets/icons/OpeningHours';
import PhoneNumber from '@/assets/icons/PhoneNumber';
import WebsiteIcon from '@/assets/icons/WebsiteIcon';
import { MapIcon } from 'lucide-react';
import ReviewIcon from '@/assets/icons/ReviewIcon';

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

        console.log('fff', foundPlace);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  if (!detailPlace) {
    return <PlaceDetailContainer>플레이스가 존재하지 않습니다.</PlaceDetailContainer>;
  }

  const translatedType = detailPlace.primaryType
    ? translateType(detailPlace.primaryType)
    : 'Unknown';

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
          <span>{translatedType}</span>
          <h1>{detailPlace.displayName.text}</h1>
        </Name>
        <DetailInfoSection>
          <DetailInfo>
            <Address>
              <b>
                <AddressIcon />
                주소
              </b>
              {detailPlace.formattedAddress ? (
                <span>{detailPlace.formattedAddress}</span>
              ) : (
                <None>제공하는 정보가 없어요</None>
              )}
            </Address>
            <Opening>
              <b>
                <OpeningHours />
                영업시간 ({detailPlace.currentOpeningHours?.openNow ? '영업 중' : '영업 종료'})
              </b>

              {detailPlace.currentOpeningHours?.weekdayDescriptions ? (
                detailPlace.currentOpeningHours?.weekdayDescriptions?.map((description, idx) => (
                  <Time key={idx}>{description}</Time>
                ))
              ) : (
                <None>제공하는 정보가 없어요</None>
              )}
            </Opening>
            <Call>
              <b>
                <PhoneNumber />
                전화번호
              </b>
              {detailPlace.nationalPhoneNumber ? (
                <span>{detailPlace.nationalPhoneNumber}</span>
              ) : (
                <None>제공하는 정보가 없어요</None>
              )}
            </Call>
            <Website>
              <b>
                <WebsiteIcon />
                웹사이트
              </b>
              {detailPlace.websiteUri ? (
                <a href={detailPlace.websiteUri} target="_blank" rel="noopener noreferrer">
                  {detailPlace.websiteUri}
                </a>
              ) : (
                <None>제공하는 정보가 없어요</None>
              )}
            </Website>
          </DetailInfo>
          <Map>
            <b>
              <MapIcon />
              지도
            </b>
            <div>
              <Suspense fallback={'지도를 불러오는 중입니다'}>
                <GoogleMapApiLoader apiKey={API_KEY} suspense>
                  <PlaceMap detailPlace={detailPlace} />
                </GoogleMapApiLoader>
              </Suspense>
            </div>
          </Map>
        </DetailInfoSection>
      </Section>
      <Section>
        <Review>
          <b>
            <ReviewIcon />
            리뷰 (총 {detailPlace.reviews?.length || 0}개)
          </b>
          {detailPlace.reviews ? (
            <ReviewSwiper reviews={detailPlace.reviews} />
          ) : (
            <None>작성된 리뷰가 없어요</None>
          )}
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
  padding: 0 10px;

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
  padding: 0 10px;
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

  > div {
    width: 100%;
    height: 300px;
    overflow: hidden;
  }
`;

const Review = styled.div`
  width: 100%;
  height: auto;
  padding: 30px 10px 0 10px;
  border-top: 1px solid #56bec0;
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

const None = styled.span`
  margin-left: 20px;
  color: #ccc;
  font-size: 13px;
`;

export default PlaceDetail;
