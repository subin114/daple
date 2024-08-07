import styled from '@emotion/styled';
import { ProfileImg } from '../pages/Community';
import DOMPurify from 'dompurify';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface PostProps {
  post: {
    id: string;
    content: string;
    uid: string;
    nickname: string;
    createdAt: Date;
  };
}

const Post = ({ post }: PostProps) => {
  const sanitizedContent = DOMPurify.sanitize(post.content);
  const formattedDate = dayjs(post.createdAt).format('YYYY/MM/DD · HH:mm');
  const navigate = useNavigate();

  return (
    <Board onClick={() => navigate(`/community/detail/${post.id}`)}>
      <BoardUserInfo>
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
        <Nickname>{post.nickname}</Nickname>
      </BoardUserInfo>
      <PostWrap>
        <PostContent dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        <PostInfo>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            0
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
            0
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            0
          </span>
          <span>{formattedDate}</span>
        </PostInfo>
      </PostWrap>
    </Board>
  );
};

const Board = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 30px;
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

  span:nth-of-type(1),
  span:nth-of-type(2),
  span:nth-of-type(3) {
    margin-right: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;

    svg {
      width: 16px;
      height: 16px;
      margin-right: 2px;
    }
  }

  span:nth-of-type(4) {
    margin-left: auto;
  }
`;

export default Post;
