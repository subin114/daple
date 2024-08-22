import styled from '@emotion/styled';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const ModeToDesiredProfileModal = () => {
  return (
    <Dialog>
      <Btn>원하는 프로필로 변경</Btn>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
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

export default ModeToDesiredProfileModal;
