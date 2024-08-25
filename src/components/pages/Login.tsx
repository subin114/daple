import styled from '@emotion/styled';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from '../../store/useUserStore';
import { signIn } from '../../firebase/firebaseAuth';
import { FirebaseCustomError } from '@/types/FirebaseCustomError';
import GoogleLoginIcon from '@/assets/icons/GoogleLoginIcon';
import { signInWithPopup } from 'firebase/auth';
import { authService, db, googleProvider } from '@/firebase/firebaseConfig';
import { getUserInfo } from '@/firebase/firestoreConfig';
import { doc, setDoc } from 'firebase/firestore';
import { AvatarInfo, useCurAuthStore } from '@/store/useCurAuthStore';
import { useState } from 'react';
import CustomAlert from '../layout/CustomAlert';

const Login = () => {
  const navigate = useNavigate();
  const {
    email,
    password,
    setEmail,
    setPassword,
    setEmailValid,
    setPasswordValid,
    emailError,
    passwordError,
    setEmailError,
    setPasswordError,
    validateEmail,
    validatePassword,
  } = useLoginStore();
  const { setUser, setUserInfo } = useCurAuthStore();
  const [showAlert, setShowAlert] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      setEmailValid(true);
    } else if (name === 'password') {
      setPassword(value);
      setPasswordValid(true);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailIsValid = validateEmail();
    const passwordIsValid = validatePassword();

    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    try {
      await signIn(email, password);

      setShowAlert(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error('Account logging error: ', err);

      const firebaseError = (err as FirebaseCustomError).code;

      switch (firebaseError) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setEmailValid(false);
          setPasswordValid(false);
          setEmailError('이메일 혹은 비밀번호가 일치하지 않습니다.');
          break;
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
    } finally {
      setEmail('');
      setPassword('');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(authService, googleProvider);
      const user = result.user;

      if (user) {
        const userInfo = await getUserInfo(user.uid);

        if (!userInfo) {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            nickname: user.displayName,
            photoURL: user.photoURL,
          });
          console.log('New user created and stored in Firestore.');
        }

        const avatar: AvatarInfo = {
          name: userInfo?.avatar.name || '',
          variant: 'beam',
          colors: ['#E6626F', '#EFAE78', '#F5E19C', '#A2CA8E', '#66AF91'],
          idx: 0,
          profileImage: '',
        };

        setUser(user);
        setUserInfo({
          uid: user.uid,
          email: user.email as string,
          nickname: user.displayName || '',
          avatar,
        });

        setShowAlert(true);
        setTimeout(() => navigate('/'), 1500);
      }

      return user;
    } catch (err) {
      console.error('Google login error: ', err);
      return null;
    }
  };

  return (
    <LoginContainer>
      <Form onSubmit={onSubmit}>
        <Text>Login</Text>
        <InputWrap>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
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
        <div>
          <Btn type="submit">로그인</Btn>
          {showAlert && (
            <CustomAlert
              alertDescription={'로그인에 성공하였습니다.'}
              onClose={() => setShowAlert(false)}
              type={'success'}
            />
          )}
          <GoogleBtn type="button" onClick={handleGoogleLogin}>
            <GoogleLoginIcon />
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
