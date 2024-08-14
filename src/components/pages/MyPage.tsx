import styled from '@emotion/styled';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AvatarsSvg from '@/assets/profileImg/AvatarsSvg';

const MyPage = () => {
  return (
    <CommunityDetailContainer>
      <Section>
        <ProfileSection>
          <Profile>
            <AvatarsSvg />
          </Profile>
          <BtnWrap>
            <Btn>기본 프로필로 변경</Btn>
            <Btn>원하는 프로필로 변경</Btn>
          </BtnWrap>
        </ProfileSection>
        <Form>
          <InputWrap>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" name="email" />
          </InputWrap>
          <InputWrap>
            <LabelWrap>
              <Label htmlFor="nickname">Nickname</Label>
              <Button>변경</Button>
            </LabelWrap>
            <Input type="text" id="nickname" placeholder="nickname" name="nickname" />
          </InputWrap>
          <InputWrap>
            <LabelWrap>
              <Label htmlFor="password">Password</Label>
              <Button>변경</Button>
            </LabelWrap>
            <Input type="password" id="password" placeholder="password" name="password" />
          </InputWrap>
          <Forget>
            계정을 탈퇴하고 싶어요. <span>계정 탈퇴하기</span>
          </Forget>
        </Form>
      </Section>
    </CommunityDetailContainer>
  );
};

const CommunityDetailContainer = styled.div`
  max-width: 1200px;
  width: auto;
  min-height: calc(100vh - 330px);
  height: auto;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ProfileSection = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const Profile = styled.div`
  width: 90px;
  height: 90px;
  margin-bottom: 20px;
  border-radius: 50px;
  background: #eee;
  border: 2px solid #eee;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const BtnWrap = styled.span`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Btn = styled(Button)`
  font-size: 12px;
  background-color: #56bec0;
  color: #fff;
  width: 150px;
  height: 25px;

  &:hover {
    background-color: #42abad;
  }
`;

const Form = styled.form`
  width: 320px;
  height: auto;
`;

const InputWrap = styled.div`
  input {
    margin-bottom: 15px;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #eee;

    &:focus {
      border: none;
      border-bottom: 1px solid #56bec0;
      box-shadow: none;
    }
  }
`;

const LabelWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;

  button {
    width: 40px;
    height: 15px;
    font-size: 12px;
    border: 1px solid #56bec0;
    background-color: #fff;
    color: #56bec0;
    border-radius: 20px;

    &:hover {
      background-color: #42abad;
      color: #fff;
    }
  }
`;

const Forget = styled.span`
  display: inline-block;
  margin-top: 30px;
  font-size: 12px;

  span {
    margin-left: 4px;
    color: #56bec0;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default MyPage;
