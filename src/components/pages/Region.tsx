import styled from '@emotion/styled';
import TitleDropdownSection from './../layout/TitleDropdownSection';
import Tabs from '../layout/Tabs';
import Search from '../layout/Search';

const Region = () => {
  return (
    <NearContainer>
      <Search />
      <Section>
        <TitleDropdownSection title={'지역별 핫플레이스 : 서울'} />
        <Tabs />
      </Section>
    </NearContainer>
  );
};

const NearContainer = styled.div`
  max-width: 1200px;
  width: auto;
  margin: 50px auto;
`;

const Section = styled.section`
  width: 100%;
  height: auto;
  margin-top: 40px;
`;

export default Region;
