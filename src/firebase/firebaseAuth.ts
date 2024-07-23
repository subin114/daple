import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authService, db } from './firebaseConfig';
import { saveUserToFirestore } from './firestoreConfig';
import { doc, getDoc } from 'firebase/firestore';
import { UserInfo } from '../store/useCurAuthStore';

export const signUp = async (email: string, password: string, nickname: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(authService, email, password);
    const user = userCredential.user;

    await saveUserToFirestore(user.uid, email, nickname);
    await authService.signOut();

    return { email, nickname };
  } catch (err) {
    console.error('Error signing up: ', err);
    throw err;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(authService, email, password);
    const user = userCredential.user;

    // Firestore에서 사용자 정보 가져오기
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      throw new Error('No such user!');
    }

    const userInfo = userDoc.data() as UserInfo;
    return { user, userInfo };
  } catch (err) {
    console.error('Error signing in: ', err);
    throw err;
  }
};

export const logOut = () => {
  return signOut(authService);
};
