import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

/** 프로필 이미지 변경 */
export const updateProfileImg = () => {};

/** 닉네임 변경 */
export const updateNickname = async (uid: string, newNickname: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      nickname: newNickname,
    });
    console.log('Nickname updated successfully.');
  } catch (err) {
    console.error('Error updating nickname: ', err);
  }
};

/** 비밀번호 변경 */
export const updatePassword = () => {};
