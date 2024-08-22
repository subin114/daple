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

const DefaultProfileModal = () => {
  const { userInfo } = useCurAuthStore();

  const avatars = Array.from({ length: 36 }, (_, idx) => (
    <Avatar
      key={idx}
      name={`${userInfo?.nickname}-${idx}`}
      variant="beam"
      colors={['#E6626F', '#EFAE78', '#F5E19C', '#A2CA8E', '#66AF91']}
    />
  ));

  return (
    <Dialog>
      <Btn>기본 프로필로 변경</Btn>
      <DialogContentStyled>
        <DialogHeader>
          <DialogTitleStyled>기본 프로필</DialogTitleStyled>
          <AvatarsContainer>
            <GridAvatars>{avatars}</GridAvatars>
          </AvatarsContainer>
        </DialogHeader>
        <DialogFooter>
          <ChangeBtn>변경하기</ChangeBtn>
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

  svg {
    border: 2px solid #fff;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
      border: 2px solid #56bec0;
      background-color: #56bec0;
    }
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
