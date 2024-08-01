import styled from '@emotion/styled';
import Paginate from './../layout/Paginate';
import TextEditor from './../layout/TextEditor';

const Community = () => {
  return (
    <CommunityContainer>
      <Section>
        <TextEditorContainer>
          <UserInfo>유저의 프로필 이미지 & 유저의 닉네임</UserInfo>
          <TextEditor />
        </TextEditorContainer>
        <BoardWrap>
          <Board></Board>
          <Board></Board>
          <Board></Board>
          <Board></Board>
          <Board></Board>
        </BoardWrap>
        <Paginate />
      </Section>
    </CommunityContainer>
  );
};

const CommunityContainer = styled.div`
  max-width: 1200px;
  width: auto;
  min-height: calc(100vh - 330px);
  height: auto;
  margin: 50px auto;
`;

const Section = styled.section`
  width: 100%;
  height: auto;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextEditorContainer = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid salmon;
  margin-bottom: 40px;
`;

const UserInfo = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  border: 1px solid green;
`;

const BoardWrap = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid green;
`;

const Board = styled.div`
  width: 100%;
  height: 150px;
  min-height: 150px;
  border: 1px solid blue;
  margin-bottom: 20px;
`;

export default Community;
