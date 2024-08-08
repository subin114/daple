import styled from '@emotion/styled';
import Paginate from './../layout/Paginate';
import TextEditor from './../layout/TextEditor';
import Post from '../layout/Post';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { useCurAuthStore } from '@/store/useCurAuthStore';
import { addPost } from '@/firebase/firestore/addPost';
import CommunitySearch from '../layout/CommunitySearch';
import { NoCommentContainer } from './CommunityDetail';

export interface PostData {
  id: string;
  content: string;
  uid: string;
  nickname: string;
  createdAt: Date;
  likes: number;
  commentsCount: number;
  views: number;
}

const POSTS_PER_PAGE = 5;

const Community = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const { userInfo } = useCurAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);

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
        likes: doc.data().likes,
        commentsCount: doc.data().commentsCount,
        views: doc.data().views,
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(post =>
        post.content.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  const handleUpload = async (content: string) => {
    if (userInfo) {
      console.log('유저의 정보', userInfo);
      const newPost = await addPost(content, userInfo.uid, userInfo.nickname);
      console.log('유저가 작성한 포스팅 정보', newPost);
      if (newPost) {
        setPosts([newPost, ...posts]);
      }
    } else {
      console.error('Upload failed');
    }
  };

  /** 페이지네이션 */
  const totalPosts = filteredPosts.length; // 전체 포스팅 갯수
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE); // 전체 페이지 갯수
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  ); // 현재 페이지에 해당하는 포스팅 추출

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <CommunityContainer>
      <Section>
        {userInfo && (
          <TextEditorContainer>
            <TextEditor onUpload={handleUpload} nickname={userInfo.nickname} />
          </TextEditorContainer>
        )}
        <CommunitySearch onSearch={handleSearch} />

        <PostContainer>
          {paginatedPosts.length > 0 ? (
            paginatedPosts.map(post => <Post key={post.id} post={post} isDetail={false} />)
          ) : (
            <NoCommentContainer>아직 작성된 댓글이 없어요</NoCommentContainer>
          )}
        </PostContainer>
        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
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
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 2px solid #ecf6f8;
  overflow: hidden;
`;

export const ProfileImg = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border-radius: 20px;
  border: 2px solid #fff;
  overflow: hidden;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Nickname = styled.span`
  font-size: 14px;
`;

export const PostContainer = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

export default Community;
