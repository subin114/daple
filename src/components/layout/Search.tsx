import styled from '@emotion/styled';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface location {
  name: string;
}

const locations: location[] = [
  { name: '서울' },
  { name: '부산' },
  { name: '대구' },
  { name: '인천' },
  { name: '광주' },
  { name: '대전' },
  { name: '울산' },
  { name: '세종' },
  { name: '경기' },
  { name: '강원' },
  { name: '충북' },
  { name: '충남' },
  { name: '전북' },
  { name: '전남' },
  { name: '경북' },
  { name: '경남' },
  { name: '제주' },
];

const Search = () => {
  return (
    <SearchContainer>
      <Text>
        <span>지역</span> 또는 <span>플레이스</span>의 이름을 입력하세요!
      </Text>
      <StyledInput placeholder="ex. 여수" />
      <RegionBtnWrap>
        {locations.map(location => (
          <Btn variant="outline" key={location.name}>
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

const Btn = styled(Button)`
  height: 30px;
  font-size: 14px;
  border-radius: 20px;

  &:hover {
    background-color: #56bec0;
    color: #fff;
  }
`;

export default Search;
