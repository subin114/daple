import styled from '@emotion/styled';
import { Button } from '../ui/button';
import { useRef, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { AvatarInfo, useCurAuthStore, UserInfo } from '@/store/useCurAuthStore';
import { updateUserAvatar } from '@/firebase/firestore/updateUserInfo';
import CustomAlert from './CustomAlert';

const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const ModeToDesiredProfileModal = () => {
  const { userInfo, setUserInfo } = useCurAuthStore();
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('error');
  const [showAlert, setShowAlert] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBtnClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && userInfo?.uid) {
      const base64 = await convertToBase64(file);

      const avatarData: AvatarInfo = {
        name: `${userInfo.email}-custom`,
        colors: [],
        variant: 'beam',
        idx: 0,
        profileImage: base64 as string,
      };

      console.log('sssssssssssss', avatarData, file);

      try {
        await updateUserAvatar(userInfo.uid, avatarData);
        setUserInfo({ ...userInfo, avatar: avatarData });
        setAlertMessage('프로필이 변경되었습니다.');
        setAlertType('success');
        setShowAlert(true);
      } catch (err) {
        setAlertMessage('프로필 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        setAlertType('error');
        setShowAlert(true);
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      setAlertMessage('프로필이 변경되었습니다.');
      setAlertType('success');
      setShowAlert(true);
    }
  };

  return (
    <div>
      <Btn onClick={handleBtnClick}>원하는 프로필로 변경</Btn>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleOnChange} />
      {showAlert && (
        <CustomAlert
          alertDescription={alertMessage}
          onClose={() => setShowAlert(false)}
          type={alertType}
        />
      )}
    </div>
  );
};

const Btn = styled(Button)`
  width: 150px;
  height: 25px;
  font-size: 12px;
  background-color: #56bec0;
  color: #fff;
  border-radius: 7px;

  &:hover {
    background-color: #42abad;
  }
`;

export default ModeToDesiredProfileModal;
