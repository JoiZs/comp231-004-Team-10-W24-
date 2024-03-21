
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css'


import Registration from '../component/registration'

// import Profile_sitter from '../component/profile_sitter';
// import Profile_owner from '../component/profile_owner';



function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
     <div className="App">
      <Routes>
        <Route path="/register" element={<Registration />} />
        {/* <Route path="/profile_sitter" element={<Profile_sitter />} />
        <Route path="/profile_owner" element={<Profile_owner />} /> */}
        {/* Define other routes here */}
      </Routes>
      </div>
    </BrowserRouter>
      </ChakraProvider>
  );
}
/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
*/

export default App
