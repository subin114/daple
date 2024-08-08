import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

/** comment 컬렉션 - 댓글 저장 */
export const addComment = async (id: string, content: string, uid: string, nickname: string) => {
  try {
    const docRef = await addDoc(collection(db, 'posts', id, 'comments'), {
      content,
      uid,
      nickname,
      createdAt: new Date(),
    });

    console.log('댓글이 성공적으로 저장되었습니다.');
    return {
      id: docRef.id,
      content,
      uid,
      nickname,
      createdAt: new Date(),
    };
  } catch (err) {
    console.error('Error saving comment:', err);
  }
};
