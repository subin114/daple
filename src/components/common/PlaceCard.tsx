import styled from '@emotion/styled';
import { Box, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { usePlaceStore } from '@/store/usePlaceStore';
import BookmarkIcon from '@/assets/icons/BookmarkIcon';

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

  const handleCardClick = () => {
    setCurrentPlaceId(id);
    if (sourcePage === 'near') {
      navigate(`/near/detail/${id}`);
    } else if (sourcePage === 'region') {
      navigate(`/region/detail/${id}`);
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
          <BookmarkIcon />
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
