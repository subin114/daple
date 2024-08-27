import styled from '@emotion/styled';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogTitleStyled } from './DeleteAccountModal';
import { ChangeBtn } from './DefaultProfileModal';
import { Warning } from '../pages/SignUp';

const PasswordChangeModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>변경</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[368px]">
        <DialogHeader>
          <DialogTitleStyled>새 비밀번호로 변경</DialogTitleStyled>
          <DialogDescriptionStyled>새 비밀번호로 변경</DialogDescriptionStyled>
        </DialogHeader>
        <Form>
          <InputWrap>
            <Label htmlFor="currentPassword">현재 비밀번호</Label>
            <Input
              type="password"
              id="currentPassword"
              placeholder="********"
              name="currentPassword"
            />
          </InputWrap>
          <InputWrap>
            <LabelWrap>
              <Label htmlFor="newPassword">새 비밀번호</Label>
            </LabelWrap>
            <Input
              type="password"
              id="newPassword"
              // placeholder={userInfo.nickname}
              // value={inputNickname}
              // onChange={onChangeInputNickname}
              name="newPassword"
            />
            {/* <Warning>에러 섹션</Warning> */}
          </InputWrap>
          <InputWrap>
            <LabelWrap>
              <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
            </LabelWrap>
            <Input type="password" id="confirmPassword" name="confirmPassword" />
          </InputWrap>
        </Form>
        <DialogFooter>
          <ChangeBtn type="submit">변경하기</ChangeBtn>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const DialogDescriptionStyled = styled(DialogDescription)`
  display: none;
`;

const Form = styled.form`
  width: 320px;
  height: auto;
`;

const InputWrap = styled.div`
  margin-bottom: 25px;

  label {
    font-size: 13px;

    &::before {
      content: '*';
      margin-right: 2px;
      color: #56bec0;
    }
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
`;

export default PasswordChangeModal;
