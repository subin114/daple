import { create } from 'zustand';
import { User as FirebaseUser } from 'firebase/auth';
import { logOut } from '../firebase/firebaseAuth';

interface AuthState {
  user: FirebaseUser | null;
  isAuthenticated: boolean;
  setUser: (user: FirebaseUser | null) => void;
  setAuthenticated: (auth: boolean) => void;
  logout: () => void;
}

export const useCurAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthenticated: false,
  setUser: user => set({ user, isAuthenticated: !!user }),
  setAuthenticated: auth => set({ isAuthenticated: auth }),
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
