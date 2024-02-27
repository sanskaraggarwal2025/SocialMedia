import "./App.css";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import Chat from './pages/Chat/Chat'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import { userAtom } from "./store/atoms/authAtom";
function App() {
  const user = useRecoilValue(userAtom);
  return (
      <BrowserRouter>
        <div className="App">
          {/* <div className="blur" style={{ top: "-18%", right: "0" }}></div>
          <div className="blur" style={{ top: "36%", left: "-8rem" }}></div> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path = "/profile/:id" element={user ? <Profile /> : <Login />} />
            <Route path = "/chat" element = {user ? <Chat /> : <Login />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
