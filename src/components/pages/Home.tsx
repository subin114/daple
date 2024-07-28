import styled from '@emotion/styled';
import MainSwiper from '../layout/MainSwiper';
import TitleSection from '../layout/TitleSection';
import NearSwiper from '../layout/NearSwiper';
// import PopularList from '../layout/PopularList';
import RegionSwiper from '../layout/RegionSwiper';

const Home = () => {
  return (
    <HomeContainer>
      <MainSwiper />
      <Section>
        <TitleSection title={'내 근처 핫플레이스'} nav="/near" />
        <NearSwiper />
      </Section>
      {/* <Section>
        <TitleSection title={'이번주 핫플레이스 TOP6'} nav="/region" />
        <PopularList />
      </Section> */}
      <Section>
        <TitleSection title={'지역별 핫플레이스'} nav="/region" />
        <RegionSwiper />
      </Section>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  max-width: 1200px;
  width: auto;
  margin: 50px auto;
`;

const Section = styled.section`
  width: 100%;
  height: auto;
  margin-top: 40px;
`;

export default Home;
