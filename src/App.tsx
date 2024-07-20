import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/router';
import Nav from './components/layout/Nav';
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
