import { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindPage from "./pages/FindPage";
import MainPage from "./pages/MainPage";

import UserContextProvider from "./store/UserContext";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/find' element={<FindPage />} />
          
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
