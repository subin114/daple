import styled from '@emotion/styled';

const PopularList = () => {
  return (
    <Section>
      <RegionCard>제주</RegionCard>
      <RegionCard>가평</RegionCard>
      <RegionCard>충남</RegionCard>
      <RegionCard>양양</RegionCard>
      <RegionCard>강릉</RegionCard>
      <RegionCard>부산</RegionCard>
    </Section>
  );
};

const Section = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RegionCard = styled.div`
  width: 175px;
  height: 175px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  background-color: #f0f0f0;
`;

export default PopularList;
