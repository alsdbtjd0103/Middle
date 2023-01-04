import { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindPage from "./pages/FindPage";
import MainPage from "./pages/MainPage";
import TempPage from "./pages/TempPage";
import UserContextProvider from "./store/UserContext";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/find' element={<FindPage />} />
          <Route path='/temp' element={<TempPage />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
