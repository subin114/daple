import styled from '@emotion/styled';
import { PostContainer, PostData, ProfileImg } from './Community';
import Post from '../layout/Post';
import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { useParams } from 'react-router-dom';
import { useCurAuthStore } from '@/store/useCurAuthStore';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import dayjs from 'dayjs';
import { addComment } from '@/firebase/firestore/addComment';
import CustomAlert from '../layout/CustomAlert';
import Avatar from 'boring-avatars';

interface CommentData {
  id: string;
  content: string;
  uid: string;
  nickname: string;
  createdAt: Date;
  likes: number;
  commentsCount: number;
  views: number;
}

const CommunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [comment, setComment] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const { userInfo, isAuthenticated } = useCurAuthStore();
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('error');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!id) return;

    /** 포스팅 실시간 조회 */
    const fetchPost = () => {
      const docRef = doc(db, 'posts', id);

      const unsubscribe = onSnapshot(docRef, docSnap => {
        if (docSnap.exists()) {
          const postData = {
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt.toDate(),
          } as PostData;
          setPost(postData);
        } else {
          console.log('No such document!');
          setPost(null);
        }
      });

      return () => unsubscribe();
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
    if (!userInfo || !isAuthenticated) {
      return;
    }

    if (newComment.trim() === '') {
      setAlertMessage('댓글을 작성해 주세요.');
      setAlertType('error');
      setShowAlert(true);
      return;
    }

    if (!post || !id) return;

    try {
      await addComment(id, newComment, userInfo.uid, userInfo.nickname);
      setNewComment('');
      setAlertMessage('댓글이 성공적으로 작성되었습니다.');
      setShowAlert(true);
      setAlertType('success');
    } catch (err) {
      setNewComment('');
      console.error('디테일 페이지 댓글 저장 실패', err);
      setAlertMessage('댓글 작성 중 오류가 발생했습니다.');
      setAlertType('error');
      setShowAlert(true);
    }
  };

  return (
    <CommunityDetailContainer>
      <Section>
        <PostContainer>
          {post && <Post post={{ ...post, commentsCount: comment.length }} isDetail={true} />}
        </PostContainer>
        <CommentBox>
          {comment.length > 0 ? (
            <CommentContainer>
              {comment.map(c => (
                <CommentWrap key={c.id}>
                  <CommentUserInfo>
                    <ProfileImg>
                      <Avatar
                        name={userInfo?.avatar?.name || userInfo?.email}
                        variant={userInfo?.avatar?.variant || 'beam'}
                        colors={
                          userInfo?.avatar?.colors || [
                            '#E6626F',
                            '#EFAE78',
                            '#F5E19C',
                            '#A2CA8E',
                            '#66AF91',
                          ]
                        }
                      />
                    </ProfileImg>
                    <Nickname>
                      {c.nickname} <span>{dayjs(c.createdAt).format('YYYY/MM/DD · HH:mm')}</span>
                    </Nickname>
                  </CommentUserInfo>
                  <Comment>{c.content}</Comment>
                </CommentWrap>
              ))}
            </CommentContainer>
          ) : (
            <NoCommentContainer>아직 작성된 댓글이 없어요</NoCommentContainer>
          )}
        </CommentBox>
        {userInfo && isAuthenticated && (
          <EditorContainer>
            <CommentMyInfo>
              <ProfileImg>
                <Avatar
                  name={userInfo?.avatar?.name || userInfo?.email}
                  variant={userInfo?.avatar?.variant || 'beam'}
                  colors={
                    userInfo?.avatar?.colors || [
                      '#E6626F',
                      '#EFAE78',
                      '#F5E19C',
                      '#A2CA8E',
                      '#66AF91',
                    ]
                  }
                />
              </ProfileImg>
              <Nickname>{userInfo?.nickname}</Nickname>
            </CommentMyInfo>

            <CommentSection>
              <TextareaStyled
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="댓글을 작성하세요"
              />
              {showAlert && (
                <CustomAlert
                  alertDescription={alertMessage}
                  onClose={() => setShowAlert(false)}
                  type={alertType}
                />
              )}
              <WriteBtn onClick={handleSaveComment}>댓글 작성</WriteBtn>
            </CommentSection>
          </EditorContainer>
        )}
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CommentBox = styled.div`
  width: 100%;
  height: auto;
  min-height: 200px;
`;

const CommentContainer = styled.div`
  width: 100%;
  height: auto;
  border-radius: 20px;
  overflow: hidden;
`;

export const NoCommentContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 15px;
  color: #ccc;
  background-color: #f8f8f8;
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
  margin-top: 45px;
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
