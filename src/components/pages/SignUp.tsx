import styled from '@emotion/styled';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <LoginContainer>
      <Form onSubmit={onSubmit}>
        <Text>Sign Up</Text>
        <InputWrap>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
          <Warning>경고 메시지</Warning>
        </InputWrap>
        <InputWrap>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="password" />
          <Warning>경고 메시지</Warning>
        </InputWrap>
        <InputWrap>
          <Label htmlFor="nickname">Nickname</Label>
          <Input type="text" id="nickname" placeholder="nickname" />
          <Warning>경고 메시지</Warning>
        </InputWrap>

        <Btn type="submit">회원가입</Btn>
      </Form>
    </LoginContainer>
  );
};

const LoginContainer = styled.section`
  max-width: 1200px;
  width: auto;
  height: 100%;
  min-height: 700px;
  margin: 50px auto;
  padding: 120px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Form = styled.form`
  width: 320px;
  height: auto;
`;

const Text = styled.h1`
  margin-bottom: 30px;
  font-size: 35px;
  text-align: center;
`;

const InputWrap = styled.div`
  label {
    &::before {
      content: '*';
      margin-right: 1px;
      color: #56bec0;
    }
  }

  input {
    &:focus {
      box-shadow: 0 0 0 2px rgba(86, 190, 192, 0.3);
    }
  }
`;

const Warning = styled.span`
  font-size: 12px;
  color: #ff574b;
  visibility: hidden;
  background-color: #ccc;
`;

const Btn = styled(Button)`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #56bec0;
  color: #fff;

  &:hover {
    background-color: #42abad;
  }
`;

export default SignUp;
