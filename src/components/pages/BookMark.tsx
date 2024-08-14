import { Place, usePlaceStore } from '@/store/usePlaceStore';
import styled from '@emotion/styled';
import PlaceCardList from '../common/PlaceCardList';
import { useCurAuthStore } from '@/store/useCurAuthStore';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const BookMark = () => {
  const { loading, error, bookmarkPlaces, setBookmarkPlaces, setLoading } = usePlaceStore();
  const { userInfo, isAuthenticated } = useCurAuthStore();

  const fetchBookmarkPlaces = async () => {
    setLoading(true);

    try {
      if (userInfo && isAuthenticated) {
        const docRef = collection(db, 'users', userInfo.uid, 'bookmarks');
        const snapshot = await getDocs(docRef);

        const places: Place[] = snapshot.docs.map((doc, idx) => {
          const data = doc.data();
          return {
            id: data.placeId || `unknown-id-${idx}`,
            photo: data.photo?.length > 0 ? data.photo[0] : '../../../public/no_image.png',
            primaryType: data.primaryType || 'Unknown',
            displayName: data.displayName || 'no title',
            formattedAddress: data.formattedAddress || 'no vicinity',
            ...data,
          } as Place;
        });

        setBookmarkPlaces(places);
        console.log('EEEEEE', bookmarkPlaces);
      } else {
        setBookmarkPlaces([]);
      }
    } catch (err) {
      console.error('Error fetchBookmarkPlaces', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarkPlaces();
  }, [isAuthenticated, userInfo]);

  return (
    <BookMarkContainer>
      <Section>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 20 }).map((_, idx) => (
              <div className="flex flex-col space-y-3" key={idx}>
                <Skeleton className="h-[180px] w-[277px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[277px]" />
                  <Skeleton className="h-4 w-[260px]" />
                  <Skeleton className="h-4 w-[260px]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div>오류가 발생했어요. 잠시 후 다시 시도해주세요.</div>
        ) : bookmarkPlaces.length > 0 ? (
          <PlaceCardList places={bookmarkPlaces} sourcePage="bookmark" />
        ) : isAuthenticated && userInfo ? (
          <NoPlacesMessage>북마크한 플레이스가 없어요.</NoPlacesMessage>
        ) : (
          <NoPlacesMessage>로그인 후 이용가능한 서비스입니다.</NoPlacesMessage>
        )}
      </Section>
    </BookMarkContainer>
  );
};

const BookMarkContainer = styled.div`
  max-width: 1200px;
  width: auto;
  min-height: calc(100vh - 330px);
  height: auto;
  margin: 50px auto;
`;

const Section = styled.section`
  width: 100%;
  height: auto;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NoPlacesMessage = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  background-color: #f8f8f8;
  color: #ccc;
  border-radius: 20px;
`;

export default BookMark;
