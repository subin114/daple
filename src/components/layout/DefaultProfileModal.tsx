import styled from '@emotion/styled';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import Avatar from 'boring-avatars';
import { useCurAuthStore } from '@/store/useCurAuthStore';
import { DialogContentStyled, DialogTitleStyled } from './DeleteAccountModal';
import { useEffect, useState } from 'react';
import { updateUserAvatar } from '@/firebase/firestore/updateUserInfo';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

const DefaultProfileModal = () => {
  const { userInfo } = useCurAuthStore();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);

  const handleAvatarClick = (idx: number) => {
    setSelectedAvatar(idx);
  };

  const handleChangeClick = async () => {
    if (selectedAvatar !== null && userInfo?.uid) {
      const avatarData = {
        name: `${userInfo.email}-${selectedAvatar}`,
        colors: ['#E6626F', '#EFAE78', '#F5E19C', '#A2CA8E', '#66AF91'],
        variant: 'beam',
        idx: selectedAvatar,
      };

      await updateUserAvatar(userInfo.uid, avatarData);
    }
  };

  useEffect(() => {
    if (!userInfo?.uid) return;

    const docRef = doc(db, 'users', userInfo.uid);

    const unsubscribe = onSnapshot(docRef, docSnap => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCurrentAvatar(data.avatar);
      }
    });

    return () => unsubscribe();
  }, [userInfo?.avatar]);

  return (
    <Dialog>
      <Btn>기본 프로필로 변경</Btn>
      <DialogContentStyled>
        <DialogHeader>
          <DialogTitleStyled>기본 프로필</DialogTitleStyled>
          <AvatarsContainer>
            <GridAvatars>
              {Array.from({ length: 36 }, (_, idx) => (
                <AvatarWrapper
                  key={idx}
                  onClick={() => handleAvatarClick(idx)}
                  isSelected={selectedAvatar === idx}
                >
                  <Avatar
                    key={idx}
                    name={`${userInfo?.email}-${idx}`}
                    variant="beam"
                    colors={['#E6626F', '#EFAE78', '#F5E19C', '#A2CA8E', '#66AF91']}
                  />
                </AvatarWrapper>
              ))}
            </GridAvatars>
          </AvatarsContainer>
        </DialogHeader>
        <DialogFooter>
          <ChangeBtn onClick={handleChangeClick}>변경하기</ChangeBtn>
        </DialogFooter>
      </DialogContentStyled>
    </Dialog>
  );
};

const Btn = styled(DialogTrigger)`
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

const AvatarsContainer = styled(DialogDescription)`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
`;

const GridAvatars = styled.span`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
  gap: 10px;
  padding: 10px;
`;

const AvatarWrapper = styled.span<{ isSelected: boolean }>`
  border-radius: 20px;
  padding: 2px;

  svg {
    border-radius: 20px;
    cursor: pointer;
    border: 2px solid #fff;

    &:hover {
      box-shadow: #56bec0 0px 0px 0px 3px;
    }

    ${({ isSelected }) =>
      isSelected &&
      `
      box-shadow: #56BEC0 0px 0px 0px 3px;
    `}
  }
`;

const ChangeBtn = styled(Button)`
  background-color: #56bec0;
  font-size: 14px;

  &:hover {
    background-color: #42abad;
  }

  &:focus {
    box-shadow: none;
  }
`;

export default DefaultProfileModal;
