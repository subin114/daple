import styled from '@emotion/styled';
import { ProfileImg } from '../pages/Community';
import DOMPurify from 'dompurify';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { AvatarInfo, useCurAuthStore } from '@/store/useCurAuthStore';
import { addLike, checkUserLiked, removeLike } from '@/firebase/firestore/updateLike';
import { updateView } from '@/firebase/firestore/updateView';
import { useEffect, useState } from 'react';
import ViewIcon from './../../assets/icons/ViewIcon';
import LikeIcon from '@/assets/icons/LikeIcon';
import CommentsIcon from '@/assets/icons/CommentsIcon';
import CustomAlert from './CustomAlert';
import Avatar from 'boring-avatars';

interface PostProps {
  post: {
    id: string;
    content: string;
    uid: string;
    nickname: string;
    createdAt: Date;
    avatar: AvatarInfo;
    likes: number;
    commentsCount: number;
    views: number;
  };
  isDetail: boolean;
}

const Post = ({ post, isDetail }: PostProps) => {
  const sanitizedContent = DOMPurify.sanitize(post.content);
  const formattedDate = dayjs(post.createdAt).format('YYYY/MM/DD · HH:mm');
  const navigate = useNavigate();
  const { userInfo } = useCurAuthStore();
  const [isLiked, setIsLiked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchLikedStatus = async () => {
      if (userInfo) {
        const likeStatus = await checkUserLiked(post.id, userInfo.uid);
        setIsLiked(likeStatus);
      }
    };
    fetchLikedStatus();
  }, [post.id, userInfo]);

  /** 좋아요 핸들러 */
  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userInfo) {
      setShowAlert(true);
      return;
    }
    try {
      const liked = await checkUserLiked(post.id, userInfo.uid);
      if (liked) {
        await removeLike(post.id, userInfo.uid);
        setIsLiked(false);
      } else {
        await addLike(post.id, userInfo.uid);
        setIsLiked(true);
      }
    } catch (err) {
      setShowAlert(true);
      console.error('Error updating likes:', err);
    }
  };

  /** 조회수 핸들러 */
  const handleView = async () => {
    if (!isDetail) {
      // 디테일 페이지가 아닐 때만 조회수 증가
      try {
        await updateView(post.id);
      } catch (err) {
        console.error('Error updating views:', err);
      }
    }
  };

  const handleNavigation = async () => {
    if (!isDetail) {
      await handleView();
    }
    navigate(`/community/detail/${post.id}`);
  };

  return (
    <Board>
      <BoardUserInfo
        onClick={isDetail ? undefined : handleNavigation}
        style={{ cursor: isDetail ? 'default' : 'pointer' }}
      >
        <ProfileImg>
          <Avatar
            name={userInfo?.avatar?.name || userInfo?.email}
            variant={userInfo?.avatar?.variant || 'beam'}
            colors={
              userInfo?.avatar?.colors || ['#E6626F', '#EFAE78', '#F5E19C', '#A2CA8E', '#66AF91']
            }
          />
        </ProfileImg>
        <Nickname>{post.nickname}</Nickname>
      </BoardUserInfo>
      <PostWrap>
        <PostContent
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          onClick={isDetail ? undefined : handleNavigation}
          style={{ cursor: isDetail ? 'default' : 'pointer' }}
        />
        <PostInfo>
          <button onClick={handleLike}>
            <LikeIcon isLiked={isLiked} />
            {post.likes || 0}
          </button>
          {showAlert && (
            <CustomAlert
              alertDescription={'로그인 후 이용가능한 서비스입니다.'}
              onClose={() => setShowAlert(false)}
              type={'error'}
            />
          )}
          <button>
            <CommentsIcon />
            {post.commentsCount || 0}
          </button>
          <button>
            <ViewIcon />
            {post.views || 0}
          </button>
          <span>{formattedDate}</span>
        </PostInfo>
      </PostWrap>
    </Board>
  );
};

const Board = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 25px;
  border-radius: 20px;
  background-color: #f8f8f8;
  overflow: hidden;
`;

const BoardUserInfo = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 20px 20px 0px 0px;
  cursor: pointer;
`;

const Nickname = styled.span`
  font-size: 15px;
`;

const PostWrap = styled.div`
  width: 100%;
  height: auto;
`;

const PostContent = styled.div`
  width: 100%;
  min-height: 50px;
  height: auto;
  padding: 0 20px 20px 20px;
  font-size: 15px;
  cursor: pointer;
`;

const PostInfo = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;
  font-size: 13px;
  background-color: #efefef;

  button {
    width: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: 25px;

    &:not(:nth-of-type(1)) {
      cursor: default;
    }

    svg {
      width: 16px;
      height: 16px;
      margin-right: 2px;
    }
  }

  span {
    margin-left: auto;
  }
`;

export default Post;
