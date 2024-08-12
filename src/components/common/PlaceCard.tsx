import styled from '@emotion/styled';
import { Box, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { usePlaceStore } from '@/store/usePlaceStore';
import BookmarkIcon from '@/assets/icons/BookmarkIcon';
import { useEffect, useState } from 'react';
import { BookmarkData, toggleBookmark } from '@/firebase/firestore/updateBookmark';
import { useCurAuthStore } from '@/store/useCurAuthStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

interface CardProps {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  address: string;
  sourcePage: string;
}

const PlaceCard = ({ id, imageUrl, category, title, address, sourcePage }: CardProps) => {
  const { setCurrentPlaceId } = usePlaceStore();
  const navigate = useNavigate();
  const { userInfo, isAuthenticated } = useCurAuthStore();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const checkBookmarked = async () => {
      if (isAuthenticated && userInfo) {
        const docRef = collection(db, 'users', userInfo.uid, 'bookmarks');
        const q = query(docRef, where('placeId', '==', id));
        const querySnapshot = await getDocs(q);
        setIsBookmarked(!querySnapshot.empty);
      }
    };
    checkBookmarked();
  }, [id, isAuthenticated, userInfo]);

  const handleCardClick = () => {
    setCurrentPlaceId(id);
    if (sourcePage === 'near') {
      navigate(`/near/detail/${id}`);
    } else if (sourcePage === 'region') {
      navigate(`/region/detail/${id}`);
    } else if (sourcePage === 'bookmark') {
      navigate(`/bookmark/detail/${id}`);
    }
  };

  const handleBookmarkClick = async () => {
    if (isAuthenticated && userInfo) {
      const bookmarkData: BookmarkData = {
        photo: [imageUrl],
        primaryType: category,
        displayName: title,
        formattedAddress: address,
        sourcePage,
      };

      await toggleBookmark(userInfo.uid, id, bookmarkData);
      setIsBookmarked(prev => !prev);
    } else {
      alert('로그인 후 이용가능한 서비스입니다.');
      console.error('User is not authenticated or userInfo is missing.');
    }
  };

  return (
    <StyledBox overflow="hidden" bg="white">
      <ImageBox onClick={handleCardClick}>
        <Image src={imageUrl} alt={title} />
      </ImageBox>
      <Box p="4">
        <BoxTop>
          <Category>{category}</Category>
          <BookmarkIcon onClick={handleBookmarkClick} isBookmarked={isBookmarked} />
        </BoxTop>
        <Title>{title}</Title>
        <Address>{address}</Address>
      </Box>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  img {
    width: 300px;
    height: 180px;
    object-fit: cover;
    transition: filter 0.3s;

    &:hover {
      filter: brightness(70%);
    }
  }

  > div {
    padding: 12px 2px;
  }
`;

const ImageBox = styled.div`
  width: auto;
  height: 180px;
  padding: 0 !important;
  overflow: hidden;
  border-radius: 15px;
  background-color: #f1f5f9;
  border: 1px solid #f1f5f9;
  cursor: pointer;
`;

const Category = styled.div`
  display: inline-block;
  padding: 0 8px;
  font-size: 13px;
  border-radius: 15px;
  background: #f1f5f9;
`;

const BoxTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 17px;
    height: 17px;
    color: #ccc;
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0px;
`;

const Address = styled.div`
  font-size: 13px;
`;

export default PlaceCard;
