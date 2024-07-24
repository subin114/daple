import styled from '@emotion/styled';
import logo from '../../assets/logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCurAuthStore } from '../../store/useCurAuthStore';
import { memo, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface MenuProps {
  active?: boolean;
}

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const { isAuthenticated, userInfo, isLoading, setLoading, logout } = useCurAuthStore();

  console.log('UserInfo in Nav:', userInfo); // 디버깅용

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  if (isLoading) {
    return (
      <Header>
        <Container>
          <NavLeft>
            <H1>
              <Skeleton className="h-[35px] w-[250px]" />
            </H1>
            <Category>
              <Skeleton className="h-4 w-[90px] mr-2" />
              <Skeleton className="h-4 w-[90px] mr-2" />
              <Skeleton className="h-4 w-[90px]" />
            </Category>
          </NavLeft>
          <NavRight>
            <Skeleton className="h-4 w-[60px] mr-2" />
            <Skeleton className="h-4 w-[90px] mr-2" />
            <Skeleton className="h-4 w-[60px]" />
          </NavRight>
          {isAuthenticated ? (
            <UserInfo>
              <Skeleton className="h-[24px] w-[24px] rounded-full mr-2" />
              <Skeleton className="h-4 w-[50px]" />
            </UserInfo>
          ) : null}
        </Container>
      </Header>
    );
  }

  return (
    <Header>
      <Container>
        <NavLeft>
          <H1 onClick={() => navigate('/')}>
            <img src={logo} alt="데이플" />
          </H1>
          <Category>
            <Menu onClick={() => navigate('/near')} active={isActive('/near')}>
              내 근처 핫플
            </Menu>
            <Menu onClick={() => navigate('/region')} active={isActive('/region')}>
              지역별 핫플
            </Menu>
            <Menu onClick={() => navigate('/community')} active={isActive('/community')}>
              커뮤니티
            </Menu>
          </Category>
        </NavLeft>
        <NavRight>
          <Option onClick={() => navigate('/bookmark')} active={isActive('/bookmark')}>
            북마크
          </Option>
          <Line />
          <Option onClick={() => navigate('/mypage')} active={isActive('/mypage')}>
            마이페이지
          </Option>
          <Line />
          {isAuthenticated ? (
            <Option onClick={logout}>로그아웃</Option>
          ) : (
            <Option onClick={() => navigate('/login')} active={isActive('/login')}>
              로그인
            </Option>
          )}
        </NavRight>
        {isAuthenticated ? (
          <UserInfo>
            {/* <img src="https://source.boringavatars.com/beam/40" /> */}
            <svg
              viewBox="0 0 36 36"
              fill="none"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
            >
              <mask id=":r1l:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
                <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
              </mask>
              <g mask="url(#:r1l:)">
                <rect width="36" height="36" fill="#cee891"></rect>
                <rect
                  x="0"
                  y="0"
                  width="36"
                  height="36"
                  transform="translate(-5 9) rotate(229 18 18) scale(1.1)"
                  fill="#50c8c6"
                  rx="36"
                ></rect>
                <g transform="translate(-5 4.5) rotate(9 18 18)">
                  <path d="M13,20 a1,0.75 0 0,0 10,0" fill="#000000"></path>
                  <rect
                    x="10"
                    y="14"
                    width="1.5"
                    height="2"
                    rx="1"
                    stroke="none"
                    fill="#000000"
                  ></rect>
                  <rect
                    x="24"
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
            <UserName>{userInfo?.nickname}</UserName>
          </UserInfo>
        ) : null}
      </Container>
    </Header>
  );
};

const Header = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 80px;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const H1 = styled.h1`
  width: 100px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  padding: 5px;
  cursor: pointer;
`;

const Category = styled.ul`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.li<MenuProps>`
  margin-right: 25px;
  padding: 0 10px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  color: ${({ active }) => (active ? '#56bec0' : '#000')};

  &:hover {
    color: #56bec0;
  }
`;

const SkeletonMenu = styled(Skeleton)`
  margin-right: 25px;
  padding: 0 10px;
  font-size: 14px;
  height: 100%;
  width: 100%;
`;

const NavRight = styled.ul`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
`;

const UserInfo = styled.div`
  min-width: 60px;
  width: auto;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 40px;

  img,
  svg {
    width: 24px;
    height: 24px;
    display: inline-block;
    margin-right: 7px;
    border-radius: 20px;
  }
`;

const UserName = styled.span`
  min-width: 30px;
  width: auto;
  height: 20px;
  display: inline-block;
  font-size: 14px;
`;

const Option = styled.li<MenuProps>`
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  color: ${({ active }) => (active ? '#56bec0' : '#000')};

  &:hover {
    color: #56bec0;
  }
`;

const Line = styled.span`
  height: 14px;
  display: inline-block;
  margin: 0 12px;
  border-left: 1px solid #ddd;
`;

export default memo(Nav);
