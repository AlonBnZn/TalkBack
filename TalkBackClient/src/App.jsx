import Navbar from "./Components/Navbar/NavBar";
import Landing from "./Components/LandingPage/Landing";
import Signup from "./Components/Signup/Signup";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/Login/Signin";
import Chat from "./Components/Chat/Chat";
import OnlineUsersList from "./Components/HomePage/OnlineUsersList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {<Route path="/" element={<Landing />} />},
          {<Route path="/signup" element={<Signup />} />},
          {<Route path="/signin" element={<SignIn />} />},
          {<Route path="/chat" element={<Chat />} />}
          {<Route path="/home" element={<OnlineUsersList />} />}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
