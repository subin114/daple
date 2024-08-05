import styled from '@emotion/styled';
import Paginate from './../layout/Paginate';
import TextEditor from './../layout/TextEditor';
import Post from '../layout/Post';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { useCurAuthStore } from '@/store/useCurAuthStore';
import { savePost } from '@/firebase/firestoreConfig';

interface PostData {
  id: string;
  content: string;
  uid: string;
  nickname: string;
  createdAt: Date;
}

const Community = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const { userInfo } = useCurAuthStore();

  useEffect(() => {
    const postsCollectionRef = collection(db, 'posts');
    const q = query(postsCollectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        content: doc.data().content,
        uid: doc.data().uid,
        nickname: doc.data().nickname,
        createdAt: doc.data().createdAt.toDate(),
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const handleUpload = async (content: string) => {
    if (userInfo) {
      console.log('User Info!!!!!!!!!!!:', userInfo);
      const newPost = await savePost(content, userInfo.uid, userInfo.nickname);
      console.log('User Info!!!!!sdfsdfsdfsdf!!!!!!:', newPost);
      if (newPost) {
        setPosts([newPost, ...posts]);
      }
    } else {
      console.error('User not logged in');
    }
  };

  return (
    <CommunityContainer>
      <Section>
        <TextEditorContainer>
          {userInfo && <TextEditor onUpload={handleUpload} />}
        </TextEditorContainer>
        <PostContainer>
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </PostContainer>
        <Paginate />
      </Section>
    </CommunityContainer>
  );
};

const CommunityContainer = styled.div`
  max-width: 1200px;
  width: auto;
  min-height: calc(100vh - 330px);
  height: auto;
  margin: 50px auto;
`;

const Section = styled.section`
  width: 100%;
  height: auto;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextEditorContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  border-radius: 20px;
  border: 1px solid #fafafa;
  overflow: hidden;
`;

export const ProfileImg = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border-radius: 20px;
  background-color: #fff;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Nickname = styled.span`
  font-size: 14px;
`;

const PostContainer = styled.div`
  width: 100%;
  height: auto;
`;

export default Community;
