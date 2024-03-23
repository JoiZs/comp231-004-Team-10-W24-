import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Registration from "./pages/registration";
import Profile_sitter from "./pages/profile_sitter";
import AccountProfile from "./pages/accountprofile";
import Header from "./components/Header";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Login from "./pages/login";
import { RegisterCtxProvider, AuthCtxProvider } from "./context";

function App() {
  return (
    <ChakraProvider>
      <AuthCtxProvider>
        <RegisterCtxProvider>
          <BrowserRouter>
            <Header />
            <div className="h-full flex-1 flex justify-center">
              <Routes>
                <Route path="/register" element={<Registration />} />
                <Route path="/profile_sitter" element={<Profile_sitter />} />
                <Route path="/me" element={<AccountProfile />} />
                <Route path="/" element={<Home />}></Route>
                <Route path="/book" element={<Book />}></Route>
                <Route path="/login" element={<Login />}></Route>
              </Routes>
            </div>
          </BrowserRouter>
        </RegisterCtxProvider>
      </AuthCtxProvider>
    </ChakraProvider>
  );
}

export default App;
