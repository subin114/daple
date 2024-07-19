import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Nav />
          <Router />
          <Footer />
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
