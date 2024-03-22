import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";

import { RegisterCtxProvider } from "./context";

import Registration from "./layout/registration";

// import Profile_sitter from '../component/profile_sitter';
// import Profile_owner from '../component/profile_owner';

function App() {
  return (
    <ChakraProvider>
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
