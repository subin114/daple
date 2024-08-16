import { deleteDoc, doc } from 'firebase/firestore';
import { authService, db } from '../firebaseConfig';
import { deleteUser } from 'firebase/auth';

export const deleteAccount = async () => {
  try {
    const user = authService.currentUser;

    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    await deleteDoc(userRef);
    await deleteUser(user);

    console.log('계정이 성공적으로 삭제되었습니다.');
  } catch (err) {
    console.error('계정 삭제 중 오류가 발생했습니다.', err);
  }
};
