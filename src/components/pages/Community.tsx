import styled from '@emotion/styled';
import Paginate from './../layout/Paginate';
import TextEditor from './../layout/TextEditor';
import { Button } from '@/components/ui/button';
import Post from '../layout/Post';

const Community = () => {
  return (
    <CommunityContainer>
      <Section>
        <TextEditorContainer>
          <UserInfo>
            <ProfileImg>
              <svg
                viewBox="0 0 36 36"
                fill="none"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
              >
                <mask id=":rk:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
                  <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
                </mask>
                <g mask="url(#:rk:)">
                  <rect width="36" height="36" fill="#817a8a"></rect>
                  <rect
                    x="0"
                    y="0"
                    width="36"
                    height="36"
                    transform="translate(7 7) rotate(37 18 18) scale(1.1)"
                    fill="#fcddc8"
                    rx="6"
                  ></rect>
                  <g transform="translate(3.5 3.5) rotate(-7 18 18)">
                    <path d="M13,20 a1,0.75 0 0,0 10,0" fill="#000000"></path>
                    <rect
                      x="12"
                      y="14"
                      width="1.5"
                      height="2"
                      rx="1"
                      stroke="none"
                      fill="#000000"
                    ></rect>
                    <rect
                      x="22"
                      y="14"
                      width="1.5"
                      height="2"
                      rx="1"
                      stroke="none"
                      fill="#000000"
                    ></rect>
                  </g>
                </g>
              </svg>
            </ProfileImg>
            <Nickname>닉네임</Nickname>
          </UserInfo>
          <TextEditorWrap>
            <TextEditor />
            <UploadBtn>업로드하기</UploadBtn>
          </TextEditorWrap>
        </TextEditorContainer>
        <PostContainer>
          <Post />
        </PostContainer>
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
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  border-radius: 20px;
  border: 1px solid #fafafa;
  overflow: hidden;
`;

const UserInfo = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 20px;
  background-color: #ecf6f8;
  border-radius: 20px 20px 0px 0px;
`;

export const ProfileImg = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border-radius: 20px;
  background-color: #fff;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Nickname = styled.span`
  font-size: 14px;
`;

const TextEditorWrap = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
`;

const UploadBtn = styled(Button)`
  margin-left: auto;
  margin-top: 15px;
  background-color: #56bec0;
  color: #fff;

  &:hover {
    background-color: #42abad;
  }
`;

const PostContainer = styled.div`
  width: 100%;
  height: auto;
`;

export default Community;
