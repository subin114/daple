import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const saveUserToFirestore = async (userId: string, email: string, nickname: string) => {
  try {
    const docRef = collection(db, 'users');
    await addDoc(docRef, {
      userId,
      email,
      nickname,
    });
    console.log('User saved to Firestore', docRef.id);
  } catch (err) {
    console.error('Error saving user to Firestore: ', err);
  }
};
