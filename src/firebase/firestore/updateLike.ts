import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

/** 좋아요 상태 확인 */
export const checkUserLiked = async (postId: string, uid: string) => {
  const likeRef = collection(db, 'posts', postId, 'likes');
  const q = query(likeRef, where('__name__', '==', uid));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

/** 좋아요 추가 */
export const addLike = async (postId: string, uid: string) => {
  const likeRef = doc(db, 'posts', postId, 'likes', uid);
  await setDoc(likeRef, {});
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    likes: increment(1),
  });
};

/** 좋아요 삭제 */
export const removeLike = async (postId: string, uid: string) => {
  const likeRef = doc(db, 'posts', postId, 'likes', uid);
  await deleteDoc(likeRef);
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    likes: increment(-1),
  });
};
