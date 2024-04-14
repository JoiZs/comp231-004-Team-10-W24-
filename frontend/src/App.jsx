
import { ChakraProvider,Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useContext } from "react";
// import { AuthCtx } from "./context/index.jsx";
import { RegisterCtxProvider, AuthCtxProvider } from "./context";
import Profile from "./pages/myprofile.jsx";
import Registration from "./pages/registration";
import Profile_sitter from "./pages/profile_sitter";
import Header from "./component/Header";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Login from "./pages/login";
import Reservation from "./pages/reservation";
import ChatRoom from "./pages/chat.jsx";
import ReservationConfirmation from "./pages/ReservationConfirmation";

import Registration from "./layout/registration";

// import Profile_sitter from '../component/profile_sitter';
// import Profile_owner from '../component/profile_owner';


function App() {
  // const { isAuth } = useContext(AuthCtx);
  return (
    <ChakraProvider>

      <AuthCtxProvider>
        <RegisterCtxProvider>
          <BrowserRouter>
            <Header />
            <div className="h-full flex-1 flex justify-center">
              <Routes>
                <Route path="/register" element={<Registration />} />
                <Route
                  path="/profile_sitter/:uid"
                  element={<Profile_sitter />}
                />
                <Route path="/me" element={<Profile />} />
                {/* <Route path="/me" element={isAuth ? <Profile /> : <Navigate to="/login" />} /> */}
                <Route path="/chat/:cid" element={<ChatRoom />} />
                <Route path="/" element={<Home />}></Route>
                <Route path="/book" element={<Book />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/reservations" element={<Reservation />} />
                <Route
                  path="/confirm/:rid"
                  element={<ReservationConfirmation />}
                />
              </Routes>
            </div>
          </BrowserRouter>
        </RegisterCtxProvider>
      </AuthCtxProvider>
      <BrowserRouter>
        <RegisterCtxProvider>
          <Box minHeight={"full"} display={"flex"}>
            <Routes>
              <Route path="/register" element={<Registration />} />
              {/* <Route path="/profile_sitter" element={<Profile_sitter />} />
        <Route path="/profile_owner" element={<Profile_owner />} /> */}
              {/* Define other routes here */}
            </Routes>
          </Box>
        </RegisterCtxProvider>
      </BrowserRouter>

    </ChakraProvider>
  );
}

export default App;
