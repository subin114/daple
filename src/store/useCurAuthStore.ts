import { create } from 'zustand';
import { User as FirebaseUser } from 'firebase/auth';
import { logOut } from '../firebase/firebaseAuth';

export interface UserInfo {
  uid: string;
  email: string;
  nickname: string;
}

interface AuthState {
  user: FirebaseUser | null;
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
  setUser: (user: FirebaseUser | null) => void;
  setUserInfo: (info: UserInfo | null) => void;
  logout: () => void;
}

export const useCurAuthStore = create<AuthState>(set => ({
  user: null,
  userInfo: null,
  isAuthenticated: false,
  setUser: user => set({ user, isAuthenticated: !!user }),
  setUserInfo: info => set({ userInfo: info }),
  logout: async () => {
    try {
      await logOut();
      set({ user: null, isAuthenticated: false });
      alert('로그아웃 되었습니다.');
    } catch (err) {
      console.error('Logout error occurred: ', err);
    }
  },
}));
