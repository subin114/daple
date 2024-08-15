import { create } from 'zustand';

interface UserState {
  email: string;
  password: string;
  nickname: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setNickname: (nickname: string) => void;
  emailValid: boolean;
  passwordValid: boolean;
  nicknameValid: boolean;
  setEmailValid: (valid: boolean) => void;
  setPasswordValid: (valid: boolean) => void;
  setNicknameValid: (valid: boolean) => void;
  emailError: string;
  passwordError: string;
  nicknameError: string;
  setEmailError: (error: string) => void;
  setPasswordError: (error: string) => void;
  setNicknameError: (error: string) => void;
  validateEmail: () => boolean;
  validatePassword: () => boolean;
  validateNickname: () => boolean;
}

const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isValidPassword = (password: string): boolean =>
  password.length >= 6 && password.length <= 12;

export const isValidNickname = (nickname: string): boolean => {
  const regex = /^[가-힣]{2,10}$/;
  return regex.test(nickname);
};

// 회원가입
export const useSignUpStore = create<UserState>((set, get) => ({
  email: '',
  password: '',
  nickname: '',
  setEmail: email => set({ email }),
  setPassword: password => set({ password }),
  setNickname: nickname => set({ nickname }),
  emailValid: true,
  passwordValid: true,
  nicknameValid: true,
  setEmailValid: valid => set({ emailValid: valid }),
  setPasswordValid: valid => set({ passwordValid: valid }),
  setNicknameValid: valid => set({ nicknameValid: valid }),
  emailError: '',
  passwordError: '',
  nicknameError: '',
  setEmailError: error => set({ emailError: error }),
  setPasswordError: error => set({ passwordError: error }),
  setNicknameError: error => set({ nicknameError: error }),
  validateEmail: () => {
    const email = get().email;
    const valid = isValidEmail(email);
    set({ emailValid: valid, emailError: valid ? '' : '잘못된 이메일 형식입니다.' });
    return valid;
  },
  validatePassword: () => {
    const password = get().password;
    const valid = isValidPassword(password);
    set({ passwordValid: valid, passwordError: valid ? '' : '비밀번호는 6~12자리 이어야 합니다.' });
    return valid;
  },
  validateNickname: () => {
    const nickname = get().nickname;
    const valid = isValidNickname(nickname);
    set({
      nicknameValid: valid,
      nicknameError: valid ? '' : '닉네임은 한글 2~10자리 이어야 합니다.',
    });
    return valid;
  },
}));

// 로그인
export const useLoginStore = create<UserState>((set, get) => ({
  email: '',
  password: '',
  nickname: '',
  setEmail: email => set({ email }),
  setPassword: password => set({ password }),
  setNickname: nickname => set({ nickname }),
  emailValid: true,
  passwordValid: true,
  nicknameValid: true,
  setEmailValid: valid => set({ emailValid: valid }),
  setPasswordValid: valid => set({ passwordValid: valid }),
  setNicknameValid: valid => set({ nicknameValid: valid }),
  emailError: '',
  passwordError: '',
  nicknameError: '',
  setEmailError: error => set({ emailError: error }),
  setPasswordError: error => set({ passwordError: error }),
  setNicknameError: error => set({ nicknameError: error }),
  validateEmail: () => {
    const email = get().email;
    const valid = isValidEmail(email);
    set({ emailValid: valid, emailError: valid ? '' : '잘못된 이메일 형식입니다.' });
    return valid;
  },
  validatePassword: () => {
    const password = get().password;
    const valid = isValidPassword(password);
    set({ passwordValid: valid, passwordError: valid ? '' : '비밀번호는 6~12자리 이어야 합니다.' });
    return valid;
  },
  validateNickname: () => {
    const nickname = get().nickname;
    const valid = isValidNickname(nickname);
    set({
      nicknameValid: valid,
      nicknameError: valid ? '' : '닉네임은 한글 2~10자리 이어야 합니다.',
    });
    return valid;
  },
}));
