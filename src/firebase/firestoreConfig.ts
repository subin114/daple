import { UserInfo } from '../store/useCurAuthStore';
import { db } from './firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

/** users 컬렉션 - 사용자 계정 저장하기 */
export const saveUserToFirestore = async (uid: string, email: string, nickname: string) => {
  const randomAvatar = {
    name: email,
    variant: 'beam',
    colors: ['#E6626F', '#EFAE78', '#F5E19C', '#A2CA8E', '#66AF91'],
  };

  try {
    await setDoc(doc(db, 'users', uid), {
      email,
      nickname,
      avatar: randomAvatar,
    });
    console.log('아이디: ', uid, '이메일: ', email, '닉네임: ', nickname, '아바타: ', randomAvatar);
  } catch (err) {
    console.error('Error saving user to Firestore: ', err);
    throw err;
  }
};

/** users 컬렉션 - userId로 사용자 정보 가져오기 */
export const getUserInfo = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserInfo;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (err) {
    console.error('Error getting user info: ', err);
  }
};
