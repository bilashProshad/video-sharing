import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import SingleVideo from "./pages/SingleVideo/SingleVideo";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";
import Upload from "./pages/Upload/Upload";
import Profile from "./pages/Profile/Profile";
import Trending from "./pages/Trending/Trending";
import Discover from "./pages/Discover/Discover";
import Subscriptions from "./pages/Subscriptions/Subscriptions";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
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
