import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authService } from './firebaseConfig';
import { saveUserToFirestore } from './firestoreConfig';

export const signUp = async (email: string, password: string, nickname: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(authService, email, password);
    const user = userCredential.user;

    await saveUserToFirestore(user.uid, user.email || '', nickname);
  } catch (err) {
    console.error('Error signing up: ', err);
    throw err;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(authService, email, password);
  } catch (err) {
    console.error('Error signing in: ', err);
    throw err;
  }
};

export const logOut = () => {
  return signOut(authService);
};
