import styled from '@emotion/styled';
import { Nickname, ProfileImg } from '../pages/Community';

const Post = () => {
  return (
    <>
      <Board>
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
          <Nickname>닉네임</Nickname>
        </BoardUserInfo>
        <PostWrap>
          <PostContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, voluptate eius.
            Exercitationem atque, soluta fugit enim consequuntur recusandae quidem doloribus maxime
            impedit natus doloremque nihil totam maiores dolore, vero corporis.
          </PostContent>
          <PostInfo>
            <span>
              좋아요
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
            </span>
            <span>댓글 (0개)</span>
            <span>2024.08.03</span>
          </PostInfo>
        </PostWrap>
      </Board>
      <Board></Board>
    </>
  );
};

const Board = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: #f8f8f8;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
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
`;

const PostWrap = styled.div`
  width: 100%;
  height: auto;
`;

const PostContent = styled.div`
  width: 100%;
  height: auto;
  min-height: 70px;
  padding: 0 20px 20px 20px;
  font-size: 15px;
`;

const PostInfo = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 20px;
  font-size: 13px;
  background-color: #efefef;

  span:not(:nth-of-type(3)) {
    cursor: pointer;
  }

  span:nth-of-type(1) {
    margin-right: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    svg {
      width: 15px;
      height: 15px;
      margin: 0 0 1px 2px;
    }
  }

  span:nth-of-type(3) {
    margin-left: auto;
  }
`;

export default Post;
