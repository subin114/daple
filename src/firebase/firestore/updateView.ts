import { doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

/** post 컬렉션 - 조회수 업데이트 */
export const updateView = async (postId: string) => {
  try {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      views: increment(1),
    });
  } catch (err) {
    console.error('Error updating views:', err);
  }
};
