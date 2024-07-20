import styled from '@emotion/styled';
import logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Section>
      <H1 onClick={() => navigate('/')}>
        <img src={logo} alt="데이플" />
      </H1>
      <Category>
        <Menu>About</Menu>
        <Line />
        <Menu>Privacy Policy</Menu>
        <Line />
        <Menu>Contact</Menu>
      </Category>
      <Copyright>Copyright @ 2024 Daple. ALL RIGHTS RESERVED.</Copyright>
    </Section>
  );
};

const Section = styled.footer`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 80px;
  background-color: #56b2b4;
`;

const H1 = styled.h1`
  width: 100px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding: 5px;
  cursor: pointer;
  filter: invert(0) brightness(3);
`;

const Category = styled.ul`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.li`
  font-size: 14px;
  color: #fff;
  cursor: pointer;
`;

const Line = styled.span`
  height: 14px;
  display: inline-block;
  margin: 0 12px;
  border-left: 1px solid #ddd;
`;

const Copyright = styled.div`
  width: 100%;
  margin-top: 20px;
  padding-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
`;

export default Footer;
