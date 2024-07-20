import styled from '@emotion/styled';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <LoginContainer>
      <Form onSubmit={onSubmit}>
        <Text>Login</Text>
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
        <div>
          <Btn type="submit">로그인</Btn>
          <GoogleBtn type="button">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.64 9.20456C17.64 8.56637 17.5827 7.95274 17.4764 7.36365H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8196H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20456Z"
                fill="#4285F4"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8373 3.96409 10.71H0.957272V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
                fill="#34A853"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.96409 10.71C3.78409 10.17 3.68182 9.59319 3.68182 9.00001C3.68182 8.40683 3.78409 7.83001 3.96409 7.29001V4.95819H0.957273C0.347727 6.17319 0 7.54774 0 9.00001C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z"
                fill="#FBBC05"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957272 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
                fill="#EA4335"
              />
            </svg>
            Google로 로그인
          </GoogleBtn>
        </div>
        <Line />
        <SignupBtn onClick={() => navigate('/signup')} type="button">
          회원가입
        </SignupBtn>
        <Forget>
          비밀번호를 잊어버리셨나요? <span>비밀번호 찾기</span>
        </Forget>
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

const GoogleBtn = styled(Button)`
  width: 100%;
  color: #000;
  background-color: #fff;
  border: 1px solid #ccc;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 20px 0;
  background-color: #dedede;
`;

const SignupBtn = styled(Button)`
  width: 100%;
  margin-bottom: 10px;
  color: #000;
  background-color: #fff;
  border: 1px solid #56bec0;

  &:hover {
    background-color: #ecf6f8;
  }
`;

const Forget = styled.span`
  margin-top: 30px;
  font-size: 12px;

  span {
    margin-left: 4px;
    color: #56bec0;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default Login;
