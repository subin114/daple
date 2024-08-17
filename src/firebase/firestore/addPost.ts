import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { AvatarInfo } from '@/store/useCurAuthStore';

/** posts 컬렉션 - 포스팅 저장 */
export const addPost = async (
  content: string,
  uid: string,
  nickname: string,
  avatar: AvatarInfo,
) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      content,
      uid,
      nickname,
      createdAt: new Date(),
      likes: 0,
      commentsCount: 0,
      views: 0,
      avatar,
    });

    console.log('게시글이 성공적으로 저장되었습니다.');
    return {
      id: docRef.id,
      content,
      uid,
      nickname,
      createdAt: new Date(),
      likes: 0,
      commentsCount: 0,
      views: 0,
      avatar,
    };
  } catch (err) {
    console.error('Error:', err);
  }
};
