import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import SingleVideo from "./pages/SingleVideo/SingleVideo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<SingleVideo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
