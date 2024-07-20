import styled from '@emotion/styled';
import { Button } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

interface TitleSectionProps {
  title: string;
  nav: string;
}

const TitleSection = ({ title, nav }: TitleSectionProps) => {
  const navigate = useNavigate();

  return (
    <TopSection>
      <Title>{title}</Title>
      <MoreBtn
        rightIcon={<ChevronRightIcon />}
        variant="link"
        iconSpacing={0}
        onClick={() => navigate(nav)}
      >
        더보기
      </MoreBtn>
    </TopSection>
  );
};

const TopSection = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  background-color: #fff;
  border-bottom: 1px solid #56bec0;
`;

const Title = styled.span`
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
`;

const MoreBtn = styled(Button)`
  font-size: 13px;
  color: #56bec0;
  padding: 0;
  margin: 0;

  &:hover {
    color: #1a9c9e;
  }
`;

export default TitleSection;
