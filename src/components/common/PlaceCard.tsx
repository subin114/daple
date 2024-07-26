import styled from '@emotion/styled';
import { Box, Image } from '@chakra-ui/react';

interface CardProps {
  imageUrl: string;
  category: string;
  title: string;
  address: string;
}

const PlaceCard = ({ imageUrl, category, title, address }: CardProps) => {
  return (
    <StyledBox overflow="hidden" bg="white">
      <ImageBox>
        <Image src={imageUrl} alt={title} />
      </ImageBox>
      <Box p="4">
        <Category>{category}</Category>
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
`;

const Category = styled.div`
  display: inline-block;
  padding: 0 8px;
  font-size: 13px;
  border-radius: 15px;
  background: #f1f5f9;
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
