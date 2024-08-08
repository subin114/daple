import { doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

/** post 컬렉션 - 조회수 업데이트 */
export const updateView = async (id: string) => {
  const postRef = doc(db, 'posts', id);
  await updateDoc(postRef, {
    views: increment(1),
  });
};
