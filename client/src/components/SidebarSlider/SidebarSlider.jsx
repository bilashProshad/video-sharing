import "./SidebarSlider.scss";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineHeart,
} from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { MdOutlineSubscriptions, MdOutlineWatchLater } from "react-icons/md";
import avatar from "../../assets/profile.png";
import { createPortal } from "react-dom";
import Backdrop from "../Backdrop/Backdrop";
import { useEffect, useState } from "react";

const SidebarSlider = ({ expand, onClose, showLargeScreen = false }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      {expand &&
        windowSize <= 900 &&
        windowSize >= 768 &&
        createPortal(
          <Backdrop onCloseBackdrop={onClose} />,
          document.getElementById("overlays")
        )}
      {expand &&
        showLargeScreen &&
        windowSize > 900 &&
        createPortal(
          <Backdrop onCloseBackdrop={onClose} />,
          document.getElementById("overlays")
        )}
      <aside
        className={`sidebar-slider ${expand ? "show" : ""} ${
          expand && showLargeScreen ? "showLG" : ""
        } ${showLargeScreen ? "display-init" : ""}`}
      >
        <ul>
          <li>
            <Link to={`/`} className="active">
              <AiOutlineHome /> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to={`/`}>
              <BiTrendingUp /> <span>Trending</span>
            </Link>
          </li>
          <li>
            <Link to={`/`}>
              <AiOutlineCompass /> <span>Discover</span>
            </Link>
          </li>

          <li>
            <Link to={`/`}>
              <MdOutlineSubscriptions /> <span>Subscriptions</span>
            </Link>
          </li>
        </ul>

        <div className="hr">
          <div />
        </div>

        <ul>
          <li>
            <Link to={`/`}>
              <MdOutlineWatchLater /> <span>Watch Later</span>
            </Link>
          </li>
          <li>
            <Link to={`/`}>
              <AiOutlineHeart /> <span>Liked Videos</span>
            </Link>
          </li>
        </ul>

        <div className="hr">
          <div />
        </div>

        <ul className="bottom">
          <li>
            <span className="list-header">Subscriptions</span>
          </li>
          <li>
            <Link to={`/`}>
              <img src={avatar} alt="channel" /> <span>Tech Smash</span>
            </Link>
          </li>
          <li>
            <Link to={`/`}>
              <img src={avatar} alt="channel" /> <span>Tech Smash</span>
            </Link>
          </li>
          <li>
            <Link to={`/`}>
              <img src={avatar} alt="channel" /> <span>Tech Smash</span>
            </Link>
          </li>
          <li>
            <Link to={`/`}>
              <img src={avatar} alt="channel" /> <span>Tech Smash</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SidebarSlider;
