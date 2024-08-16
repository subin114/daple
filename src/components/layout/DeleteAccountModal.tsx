import styled from '@emotion/styled';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DeleteAccountModalProps {
  onClick: () => void;
}

export function DeleteAccountModal({ onClick }: DeleteAccountModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>계정 탈퇴하기</span>
      </DialogTrigger>
      <DialogContentStyled className="sm:max-w-md">
        <DialogHeader>
          <DialogTitleStyled>계정 탈퇴</DialogTitleStyled>
        </DialogHeader>
        <DialogDescriptionStyled>정말로 계정을 탈퇴하시겠어요? ( ᴗ_ᴗ̩̩ )</DialogDescriptionStyled>
        <DialogFooter className="sm:justify-end">
          <DeleteBtn type="button" onClick={onClick}>
            예
          </DeleteBtn>
          <DialogClose asChild>
            <CancelBtn type="button" variant="secondary">
              아니오
            </CancelBtn>
          </DialogClose>
        </DialogFooter>
      </DialogContentStyled>
    </Dialog>
  );
}

const DialogContentStyled = styled(DialogContent)`
  > button {
    &:focus {
      box-shadow: none;
    }
  }
`;

const DialogTitleStyled = styled(DialogTitle)`
  font-size: 16px;
`;

const DialogDescriptionStyled = styled(DialogDescription)`
  font-size: 15px;
`;

const DeleteBtn = styled(Button)`
  background-color: #ff574b;

  &:hover {
    background-color: #dd4136;
  }

  &:focus {
    box-shadow: none;
  }
`;

const CancelBtn = styled(Button)`
  &:hover {
    background-color: #e1e5e9;
  }
`;
