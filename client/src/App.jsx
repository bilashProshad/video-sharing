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
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import MyChannel from "./pages/MyChannel/MyChannel";
import UpdateVideo from "./pages/UpdateVideo/UpdateVideo";
import Channel from "./pages/Channel/Channel";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/:id" element={<SingleVideo />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/channel" element={<MyChannel />} />
          <Route path="/channel/:id/videos" element={<Channel />} />
          <Route path="/channel/videos/edit/:id" element={<UpdateVideo />} />
        </Route>
      </Routes>

      <Toaster />
    </BrowserRouter>
  );
};

export default App;
