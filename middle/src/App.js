import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindPage from "./pages/FindPage";
import MainPage from "./pages/MainPage";
import {AnimatePresence} from 'framer-motion';
import UserContextProvider from "./store/UserContext";

function App() {
  
  return (
    <UserContextProvider>
      <AnimatePresence onExitComplete={true}>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/find' element={<FindPage />} />
          
        </Routes>
      </BrowserRouter>
      </AnimatePresence>
    </UserContextProvider>
  );
}

export default App;
