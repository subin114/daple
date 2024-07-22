import styled from '@emotion/styled';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { signUp } from '../../firebase/firebaseAuth';
import { FirebaseCustomError } from '@/types/FirebaseCustomError';

const SignUp = () => {
  const navigate = useNavigate();
  const {
    email,
    password,
    nickname,
    setEmail,
    setPassword,
    setNickname,
    emailValid,
    passwordValid,
    nicknameValid,
    setEmailValid,
    setPasswordValid,
    setNicknameValid,
    emailError,
    passwordError,
    nicknameError,
    setEmailError,
    setPasswordError,
    setNicknameError,
    validateEmail,
    validatePassword,
    validateNickname,
  } = useUserStore();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'nickname') {
      setNickname(value);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailIsValid = validateEmail();
    const passwordIsValid = validatePassword();
    const nicknameIsValid = validateNickname();

    if (!emailIsValid || !passwordIsValid || !nicknameIsValid) {
      return;
    }

    try {
      await signUp(email, password);
      console.log('Account created successfully');
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (err) {
      console.error('Error creating account: ', err);

      const firebaseError = (err as FirebaseCustomError).code;

      switch (firebaseError) {
        case 'auth/email-already-in-use':
          setEmailValid(false);
          setEmailError('이미 사용 중인 이메일입니다.');
          break;
        case 'auth/weak-password':
          setPasswordValid(false);
          setPasswordError('비밀번호는 6~12자리 이어야 합니다.');
          break;
        case 'auth/invalid-email':
          setEmailValid(false);
          setEmailError('잘못된 이메일 형식입니다.');
          break;
        default:
          setEmailValid(false);
          setEmailError('오류가 발생했습니다. 다시 시도해 주세요.');
          break;
      }
    }
  };

  return (
    <LoginContainer>
      <Form onSubmit={onSubmit}>
        <Text>Sign Up</Text>
        <InputWrap>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={onChange}
          />
          <Warning visible={!!emailError}>{emailError}</Warning>
        </InputWrap>
        <InputWrap>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <Warning visible={!!passwordError}>{passwordError}</Warning>
        </InputWrap>
        <InputWrap>
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            type="text"
            id="nickname"
            placeholder="nickname"
            name="nickname"
            value={nickname}
            onChange={onChange}
          />
          <Warning visible={!!nicknameError}>{nicknameError}</Warning>
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

const Warning = styled.span<{ visible: boolean }>`
  display: inline-block;
  height: 15px;
  weight: 100%;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  font-size: 12px;
  color: #ff574b;
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
