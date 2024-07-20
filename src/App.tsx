import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/router';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import styled from '@emotion/styled';

function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <NavFixed>
            <Nav />
          </NavFixed>
          <Router />
          <Footer />
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
