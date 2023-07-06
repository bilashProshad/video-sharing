import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import SingleVideo from "./pages/SingleVideo/SingleVideo";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";
import Upload from "./pages/Upload/Upload";
import Profile from "./pages/Profile/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<SingleVideo />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
