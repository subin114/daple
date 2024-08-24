import { create } from 'zustand';
import { User as FirebaseUser } from 'firebase/auth';
import { logOut } from '../firebase/firebaseAuth';

export interface AvatarInfo {
  name: string;
  variant: 'marble' | 'beam' | 'pixel' | 'sunset' | 'ring' | 'bauhaus';
  colors: string[];
  idx: number;
}

export interface UserInfo {
  uid: string;
  email: string;
  nickname: string;
  avatar: AvatarInfo;
}

interface AuthState {
  user: FirebaseUser | null;
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: FirebaseUser | null) => void;
  setUserInfo: (info: UserInfo | null) => void;
  setLoading: (loading: boolean) => void;
  updateUserNickname: (nickname: string) => void;
  logout: () => void;
}

export const useCurAuthStore = create<AuthState>(set => ({
  user: null,
  userInfo: null,
  isAuthenticated: false,
  isLoading: false,
  setUser: user => set({ user, isAuthenticated: !!user }),
  setUserInfo: info => set({ userInfo: info }),
  setLoading: loading => set({ isLoading: loading }),
  updateUserNickname: (newNickname: string) =>
    set(state => ({
      userInfo: state.userInfo ? { ...state.userInfo, nickname: newNickname } : state.userInfo,
    })),
  logout: async () => {
    try {
      await logOut();
      set({ user: null, userInfo: null, isAuthenticated: false });
    } catch (err) {
      console.error('Logout error occurred: ', err);
    }
  },
}));
