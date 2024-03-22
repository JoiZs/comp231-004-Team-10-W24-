
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css'


import Registration from './pages/registration'
import Profile_sitter from './pages/profile_sitter';
import Profile_owner from './pages/profile_owner';
import Header from "./components/Header";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Login from './pages/login';



function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
    <Header />
     <div className="App">
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/profile_sitter" element={<Profile_sitter />} />
        <Route path="/profile_owner" element={<Profile_owner />} />
        <Route path="/" element={<Home />}></Route>
        <Route path="/book" element={<Book />}></Route>
        <Route path="/login" element={<Login />}></Route>


        
        {/* Define other routes here */}
      </Routes>
      </div>
    </BrowserRouter>
      </ChakraProvider>
  );
}

export default App
