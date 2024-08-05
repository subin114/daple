import { UserInfo } from '../store/useCurAuthStore';
import { db } from './firebaseConfig';
import { doc, getDoc, setDoc, collection, addDoc } from 'firebase/firestore';

/** users 컬렉션 - 사용자 계정 저장하기 */
export const saveUserToFirestore = async (uid: string, email: string, nickname: string) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      email,
      nickname,
    });
    console.log('아이디: ', uid, '이메일: ', email, '닉네임: ', nickname);
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

/** posts 컬렉션 - 포스팅 저장 */
export const savePost = async (content: string, uid: string, nickname: string) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      content,
      uid,
      nickname,
      createdAt: new Date(),
    });

    console.log('게시글이 성공적으로 저장되었습니다.');
    return {
      id: docRef.id,
      content,
      uid,
      nickname,
      createdAt: new Date(),
    };
  } catch (err) {
    console.error('Error:', err);
  }
};
