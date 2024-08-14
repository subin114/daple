import styled from '@emotion/styled';

const MyPage = () => {
  return (
    <CommunityDetailContainer>
      <Section>마이페이지</Section>
    </CommunityDetailContainer>
  );
};

const CommunityDetailContainer = styled.div`
  max-width: 1200px;
  width: auto;
  min-height: calc(100vh - 330px);
  height: auto;
  margin: 50px auto;
`;

const Section = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MyPage;
