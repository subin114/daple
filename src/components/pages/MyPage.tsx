import styled from '@emotion/styled';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NoPlacesMessage } from './BookMark';
import { useCurAuthStore } from '@/store/useCurAuthStore';
import { useEffect, useState } from 'react';
import { updateNickname } from '@/firebase/firestore/updateUserInfo';
import { isValidNickname, useSignUpStore } from '@/store/useUserStore';
import { Warning } from './SignUp';
import CustomAlert from '../layout/CustomAlert';
import { DeleteAccountModal } from '../layout/DeleteAccountModal';
import { deleteAccount } from '@/firebase/firestore/deleteAccount';
import { useNavigate } from 'react-router-dom';
import Avatar from 'boring-avatars';
import DefaultProfileModal from '../layout/DefaultProfileModal';
import ModeToDesiredProfileModal from '../layout/ModeToDesiredProfileModal';
import PasswordChangeModal from '../layout/PasswordChangeModal';

const MyPage = () => {
  const { userInfo, isAuthenticated, updateUserNickname, logout } = useCurAuthStore();
  const { nicknameError, setNicknameError } = useSignUpStore();
  const [inputNickname, setInputNickname] = useState('');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('error');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.nickname) {
      setInputNickname(userInfo.nickname);
    }
  }, [userInfo?.nickname]);

  const onChangeInputNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNickname(e.target.value);
  };

  const handleChangeNickname = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const nicknameIsValid = isValidNickname(inputNickname);
    if (!nicknameIsValid) {
      setNicknameError('닉네임은 한글 2~10자리 이어야 합니다.');
      return;
    }

    if (userInfo?.nickname === inputNickname) {
      setNicknameError('기존 닉네임과 동일한 닉네임으로 변경할 수 없습니다.');
      return;
    }

    if (userInfo && inputNickname) {
      try {
        await updateNickname(userInfo.uid, inputNickname);
        updateUserNickname(inputNickname);
        setAlertMessage('닉네임이 변경되었습니다.');
        setNicknameError('');
        setAlertType('success');
        setShowAlert(true);
      } catch (err) {
        setNicknameError('');
        setAlertType('error');
        setAlertMessage('닉네임 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        setShowAlert(true);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      logout();

      setAlertType('success');
      setAlertMessage('계정 탈퇴가 완료되었습니다.');
      setShowAlert(true);

      setTimeout(() => {
        navigate('/');
      }, 2000);
      console.log('Account deletion successful');
    } catch (err) {
      console.error('Account deletion error', err);
    }
  };

  return (
    <>
      {isAuthenticated && userInfo ? (
        <CommunityDetailContainer>
          <Section>
            <ProfileSection>
              <Profile>
                {userInfo?.avatar?.profileImage ? (
                  <img src={userInfo.avatar.profileImage} alt="Profile" />
                ) : (
                  <Avatar
                    name={userInfo?.avatar?.name}
                    variant={userInfo?.avatar?.variant || 'beam'}
                    colors={
                      userInfo?.avatar?.colors || [
                        '#E6626F',
                        '#EFAE78',
                        '#F5E19C',
                        '#A2CA8E',
                        '#66AF91',
                      ]
                    }
                  />
                )}
              </Profile>
              <BtnWrap>
                <DefaultProfileModal />
                <ModeToDesiredProfileModal />
              </BtnWrap>
            </ProfileSection>
            <Form>
              <InputWrap>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder={userInfo.email} name="email" disabled />
              </InputWrap>
              <InputWrap>
                <LabelWrap>
                  <Label htmlFor="nickname">Nickname</Label>
                  <Button onClick={handleChangeNickname}>변경</Button>
                </LabelWrap>
                <Input
                  type="text"
                  id="nickname"
                  placeholder={userInfo.nickname}
                  value={inputNickname}
                  onChange={onChangeInputNickname}
                  name="nickname"
                />
                <Warning visible={!!nicknameError}>{nicknameError}</Warning>
              </InputWrap>
              <InputWrap>
                <LabelWrap>
                  <Label htmlFor="password">Password</Label>
                  <PasswordChangeModal />
                </LabelWrap>
                <Input
                  type="password"
                  id="password"
                  placeholder="********"
                  name="password"
                  disabled
                />
              </InputWrap>
              <Forget>
                계정을 탈퇴하고 싶어요. <DeleteAccountModal onClick={handleDeleteAccount} />
              </Forget>
              {showAlert && (
                <CustomAlert
                  alertDescription={alertMessage}
                  onClose={() => setShowAlert(false)}
                  type={alertType}
                />
              )}
            </Form>
          </Section>
        </CommunityDetailContainer>
      ) : (
        <NonLoginCommunityDetailContainer>
          <NoPlacesMessage>로그인 후 이용가능한 서비스입니다.</NoPlacesMessage>
        </NonLoginCommunityDetailContainer>
      )}
    </>
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

const NonLoginCommunityDetailContainer = styled.div`
  max-width: 1200px;
  width: auto;
  min-height: calc(100vh - 330px);
  height: auto;
  margin: 50px auto;
`;

const Section = styled.section`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  border-radius: 30px;
  background: #ecf6f8;
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
  border: 2px solid #fff;
  overflow: hidden;

  svg,
  img {
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

const Form = styled.form`
  width: 320px;
  height: auto;
`;

const InputWrap = styled.div`
  margin-bottom: 25px;

  &:nth-of-type(2) {
    margin-bottom: 0;
  }

  input {
    &:focus {
      box-shadow: 0 0 0 2px rgba(86, 190, 192, 0.3);
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
    background-color: #fff;
    color: #56bec0;
    border: 1px solid #56bec0;
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
