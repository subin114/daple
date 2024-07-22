import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/router';
import Nav from './components/layout/Nav';
import styled from '@emotion/styled';
import { useCurAuthStore } from './store/useCurAuthStore';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from './firebase/firebaseConfig';

function App() {
  const setUser = useCurAuthStore(state => state.setUser);

  useEffect(() => {
    // 로그인 상태 모니터링
    const unsubscribe = onAuthStateChanged(authService, user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);

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
