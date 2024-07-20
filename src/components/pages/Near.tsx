import styled from '@emotion/styled';
import TitleDropdownSection from './../layout/TitleDropdownSection';
import Tabs from '../layout/Tabs';

const Near = () => {
  return (
    <NearContainer>
      <Section>
        <TitleDropdownSection title={'수원시 장안구 정자동 핫플레이스 (총 00개)'} />
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

export default Near;
