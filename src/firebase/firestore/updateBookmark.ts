import { addDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface BookmarkData {
  photo: string[];
  primaryType: string;
  displayName: string;
  formattedAddress: string;
  sourcePage: string;
}

/** 북마크 추가/삭제 함수 */
export const toggleBookmark = async (uid: string, placeId: string, placeData: BookmarkData) => {
  try {
    const docRef = collection(db, 'users', uid, 'bookmarks');
    const q = query(docRef, where('placeId', '==', placeId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(docRef, {
        placeId,
        ...placeData,
        displayName: {
          text: placeData.displayName,
          languageCode: 'en',
        },
      });
    } else {
      querySnapshot.forEach(async docsSnapshot => {
        await deleteDoc(docsSnapshot.ref);
      });
    }
  } catch (err) {
    console.error('Error toggling bookmark: ', err);
  }
};
