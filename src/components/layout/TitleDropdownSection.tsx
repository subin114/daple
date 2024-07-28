import styled from '@emotion/styled';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TitleDropdownSectionProps {
  title: string;
}

const TitleDropdownSection = ({ title }: TitleDropdownSectionProps) => {
  return (
    <TopSection>
      <Title>
        <img src="../../../public/icons/location_icon.svg" alt="location icon" />
        {title}
      </Title>
      <Select>
        <CustomSelectTrigger className="w-[130px]">
          <SelectValue placeholder="거리 순" />
        </CustomSelectTrigger>
        <SelectContent>
          <SelectItem value="light">거리 순</SelectItem>
          <SelectItem value="dark">평점 높은 순</SelectItem>
          <SelectItem value="system">평점 낮은 순</SelectItem>
        </SelectContent>
      </Select>
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
  border-bottom: 1px solid #56bec0;
  font-family: 'SUIT-Regular';
`;

const Title = styled.span`
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  img {
    width: 16px;
    height: 16px;
    margin-right: 3px;
  }
`;

const CustomSelectTrigger = styled(SelectTrigger)`
  height: 34px;
  margin-bottom: 15px;

  &:focus {
    box-shadow: 0 0 0 2px rgba(86, 190, 192, 0.3);
  }
`;

export default TitleDropdownSection;
