import styled from '@emotion/styled';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface CommunitySearchProps {
  onSearch: (searchTerm: string) => void;
}

const CommunitySearch = ({ onSearch }: CommunitySearchProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  return (
    <SearchContainer>
      <Text>
        검색하고 싶은 <span>게시글의 내용</span>을 입력하세요!
      </Text>
      <StyledInput
        value={inputValue}
        onChange={handleChange}
        placeholder="ex. 성대역 조용한 술집 추천"
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  padding: 40px 0;
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
  width: 350px;
  border: 1px solid #56bec0;
  border-radius: 20px;

  &:focus {
    box-shadow: 0 0 0 2px rgba(86, 190, 192, 0.3);
  }
`;

export default CommunitySearch;
