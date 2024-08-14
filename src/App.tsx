import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import Nav from './components/layout/Nav';
import styled from '@emotion/styled';
import AuthInitializer from './firebase/AuthInitializer';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AuthInitializer />
          <NavFixed>
            <Nav />
          </NavFixed>
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

const NavFixed = styled.div`
  position: relative;
  height: 70px;
`;

export default App;
