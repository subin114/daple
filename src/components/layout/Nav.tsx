import styled from '@emotion/styled';
import logo from '../../assets/logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCurAuthStore } from '../../store/useCurAuthStore';
import { memo } from 'react';

interface MenuProps {
  active?: boolean;
}

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const { isAuthenticated, userInfo, logout } = useCurAuthStore();

  console.log('UserInfo in Nav:', userInfo); // 디버깅용

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
            <>
              <Option
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                로그아웃
              </Option>
            </>
          ) : (
            <>
              <Option onClick={() => navigate('/login')} active={isActive('/login')}>
                로그인
              </Option>
            </>
          )}
        </NavRight>
        {isAuthenticated ? (
          <UserInfo>
            <img src="https://source.boringavatars.com/beam/40" />
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

  img {
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
