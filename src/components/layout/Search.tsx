import styled from '@emotion/styled';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Location } from '../pages/Region';

interface SearchProps {
  locations: Location[];
  handleLocationChange: (location: Location) => void;
  activeLocation: string;
}

const Search = ({ locations, handleLocationChange, activeLocation }: SearchProps) => {
  return (
    <SearchContainer>
      <Text>
        <span>지역</span> 또는 <span>플레이스</span>의 이름을 입력하세요!
      </Text>
      <StyledInput placeholder="ex. 여수 맛집, 강릉 주변 카페" />
      <RegionBtnWrap>
        {locations.map(location => (
          <Btn
            variant="outline"
            key={location.name}
            onClick={() => handleLocationChange(location)}
            isActive={location.name === activeLocation}
          >
            {location.name}
          </Btn>
        ))}
      </RegionBtnWrap>
    </SearchContainer>
  );
};

const SearchContainer = styled.section`
  padding: 40px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #ecf6f8;
`;

const Text = styled.span`
  font-size: 15px;
  margin-bottom: 15px;

  span {
    color: #56bec0;
    font-weight: bold;
  }
`;

const StyledInput = styled(Input)`
  width: 300px;
  margin-bottom: 30px;
  border: 1px solid #56bec0;
  border-radius: 20px;

  &:focus {
    box-shadow: 0 0 0 2px rgba(86, 190, 192, 0.3);
  }
`;

const RegionBtnWrap = styled.div`
  width: 80%;
  height: auto;
  padding: 30px 20px 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #fff;
  gap: 10px;
`;

const Btn = styled(Button, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive: boolean }>`
  height: 30px;
  font-size: 14px;
  border-radius: 20px;
  ${({ isActive }) =>
    isActive &&
    `
  background-color: #56bec0;
  color: #fff;
  `}

  &:hover {
    background-color: #56bec0;
    color: #fff;
  }
`;

export default Search;
