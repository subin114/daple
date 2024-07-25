import { memo, useEffect } from 'react';
import { useCurAuthStore } from '../store/useCurAuthStore';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from '../firebase/firebaseConfig';
import { getUserInfo } from '../firebase/firestoreConfig';

// Firebase 인증 상태를 감시하는 컴포넌트
const AuthInitializer = () => {
  const { setUser, setUserInfo } = useCurAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, async user => {
      if (user) {
        // 사용자 상태가 변경되었을 때만 상태 업데이트
        setUser(user);
        console.log('user', user);
        try {
          const userInfo = await getUserInfo(user.uid);
          console.log('User info fetched:', userInfo); // 디버깅용

          setUserInfo(userInfo ?? null);
        } catch (err) {
          console.error('Error fetching user info: ', err);
          setUserInfo(null);
        }
      } else {
        setUser(null);
        setUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, [setUser, setUserInfo]);

  return null;
};

export default memo(AuthInitializer);
