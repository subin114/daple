import styled from '@emotion/styled';
import { PostContainer, PostData, ProfileImg } from './Community';
import Post from '../layout/Post';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { useParams } from 'react-router-dom';
import { saveComment } from '@/firebase/firestoreConfig';
import { useCurAuthStore } from '@/store/useCurAuthStore';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import dayjs from 'dayjs';

interface CommentData {
  id: string;
  content: string;
  uid: string;
  nickname: string;
  createdAt: Date;
}

const CommunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [comment, setComment] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const { userInfo } = useCurAuthStore();

  useEffect(() => {
    if (!id) return;

    /** 포스팅 조회 */
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = {
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt.toDate(),
          } as PostData;
          setPost(postData);
        } else {
          console.log('No such document!');
          return null;
        }
      } catch (err) {
        console.error('Error fetching post: ', err);
      }
    };

    /** 댓글 실시간 조회 */
    const fetchComments = () => {
      const commentsCollectionRef = collection(db, 'posts', id, 'comments');
      const q = query(commentsCollectionRef, orderBy('createdAt', 'asc'));

      const unsubscribe = onSnapshot(q, snapshot => {
        const commentData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        })) as CommentData[];
        setComment(commentData);
      });
      return () => unsubscribe();
    };

    fetchPost();
    fetchComments();
  }, [id]);

  /** 댓글 저장 핸들러 */
  const handleSaveComment = async () => {
    if (newComment.trim() === '' || !userInfo || !post || !id) return;

    try {
      const commentData = await saveComment(id, newComment, userInfo.uid, userInfo.nickname);
      console.log('새 댓글 정보', commentData);

      setNewComment('');
    } catch (err) {
      console.error('디테일 페이지 댓글 저장 실패', err);
    }
  };

  return (
    <CommunityDetailContainer>
      <Section>
        <PostContainer>{post && <Post post={post} />}</PostContainer>
        <CommentContainer>
          {comment.map(c => (
            <CommentWrap key={c.id}>
              <CommentUserInfo>
                <ProfileImg>
                  <svg
                    viewBox="0 0 36 36"
                    fill="none"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                  >
                    <mask id=":rk:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
                      <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
                    </mask>
                    <g mask="url(#:rk:)">
                      <rect width="36" height="36" fill="#817a8a"></rect>
                      <rect
                        x="0"
                        y="0"
                        width="36"
                        height="36"
                        transform="translate(7 7) rotate(37 18 18) scale(1.1)"
                        fill="#fcddc8"
                        rx="6"
                      ></rect>
                      <g transform="translate(3.5 3.5) rotate(-7 18 18)">
                        <path d="M13,20 a1,0.75 0 0,0 10,0" fill="#000000"></path>
                        <rect
                          x="12"
                          y="14"
                          width="1.5"
                          height="2"
                          rx="1"
                          stroke="none"
                          fill="#000000"
                        ></rect>
                        <rect
                          x="22"
                          y="14"
                          width="1.5"
                          height="2"
                          rx="1"
                          stroke="none"
                          fill="#000000"
                        ></rect>
                      </g>
                    </g>
                  </svg>
                </ProfileImg>
                <Nickname>
                  {c.nickname} <span>{dayjs(c.createdAt).format('YYYY/MM/DD · HH:mm')}</span>
                </Nickname>
              </CommentUserInfo>
              <Comment>{c.content}</Comment>
            </CommentWrap>
          ))}
        </CommentContainer>
        <EditorContainer>
          <CommentMyInfo>
            <ProfileImg>
              <svg
                viewBox="0 0 36 36"
                fill="none"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
              >
                <mask id=":rk:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
                  <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
                </mask>
                <g mask="url(#:rk:)">
                  <rect width="36" height="36" fill="#817a8a"></rect>
                  <rect
                    x="0"
                    y="0"
                    width="36"
                    height="36"
                    transform="translate(7 7) rotate(37 18 18) scale(1.1)"
                    fill="#fcddc8"
                    rx="6"
                  ></rect>
                  <g transform="translate(3.5 3.5) rotate(-7 18 18)">
                    <path d="M13,20 a1,0.75 0 0,0 10,0" fill="#000000"></path>
                    <rect
                      x="12"
                      y="14"
                      width="1.5"
                      height="2"
                      rx="1"
                      stroke="none"
                      fill="#000000"
                    ></rect>
                    <rect
                      x="22"
                      y="14"
                      width="1.5"
                      height="2"
                      rx="1"
                      stroke="none"
                      fill="#000000"
                    ></rect>
                  </g>
                </g>
              </svg>
            </ProfileImg>
            <Nickname>{userInfo?.nickname}</Nickname>
          </CommentMyInfo>

          <CommentSection>
            <TextareaStyled
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="댓글을 작성하세요"
            />
            <WriteBtn onClick={handleSaveComment}>댓글 작성</WriteBtn>
          </CommentSection>
        </EditorContainer>
      </Section>
    </CommunityDetailContainer>
  );
};

const CommunityDetailContainer = styled.div`
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

const CommentContainer = styled.div`
  width: 100%;
  height: auto;
  border-radius: 20px;
  overflow: hidden;
`;

const CommentWrap = styled.div`
  border-bottom: 1px solid #ccc;
  border-style: dotted;

  &:last-child {
    border: none;
  }
`;

const CommentUserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 20px;
  background: #f8f8f8;
`;

const Nickname = styled.div`
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 12px;
    color: #ccc;
    margin-left: 7px;
  }
`;

const Comment = styled.div`
  width: 100%;
  height: auto;
  min-height: 45px;
  padding: 0 60px;
  font-size: 15px;
  background-color: #f8f8f8;
`;

const EditorContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 50px;
  border-radius: 20px;
  overflow: hidden;
`;

const CommentMyInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 20px;
  background-color: #56bec0;
  color: #fff;
`;

const CommentSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 20px;
  background: #ecf6f8;
`;

const TextareaStyled = styled(Textarea)`
  resize: none;
  border-radius: 0;
  width: 90%;
  border: none;

  &:focus {
    box-shadow: none;
  }
`;

const WriteBtn = styled(Button)`
  margin-left: auto;
  margin-top: 15px;
  background-color: #56bec0;
  color: #fff;

  &:hover {
    background-color: #42abad;
  }
`;

export default CommunityDetail;
