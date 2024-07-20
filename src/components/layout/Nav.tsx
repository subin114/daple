import styled from '@emotion/styled';
import logo from '../../assets/logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuProps {
  active?: boolean;
}

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Header>
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
        <Option onClick={() => navigate('/login')} active={isActive('/login')}>
          로그인
        </Option>
      </NavRight>
    </Header>
  );
};

const Header = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
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
  background: pink;
`;

export default Nav;
