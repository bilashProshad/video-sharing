import { Link } from "react-router-dom";
import "./Sidebar.scss";
import {
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineHeart,
} from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import {
  MdOutlineSubscriptions,
  MdOutlinePlaylistAddCheck,
} from "react-icons/md";
import { useSidebarContext } from "../../contexts/SidebarContext";

const Sidebar = ({ expand = true }) => {
  const { activeLink, setActiveLink } = useSidebarContext();

  return (
    <>
      <aside className="sidebar hide-sidebar">
        <ul className={expand ? "" : "hide-text"}>
          <li>
            <Link
              to={`/`}
              className={activeLink === "home" ? "active" : ""}
              onClick={() => setActiveLink("home")}
            >
              <AiOutlineHome /> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/trending`}
              className={activeLink === "trending" ? "active" : ""}
              onClick={() => setActiveLink("trending")}
            >
              <BiTrendingUp /> <span>Trending</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/discover`}
              className={activeLink === "discover" ? "active" : ""}
              onClick={() => setActiveLink("discover")}
            >
              <AiOutlineCompass /> <span>Discover</span>
            </Link>
          </li>

          <li>
            <Link
              to={`/subscriptions`}
              className={activeLink === "subscriptions" ? "active" : ""}
              onClick={() => setActiveLink("subscriptions")}
            >
              <MdOutlineSubscriptions /> <span>Subscriptions</span>
            </Link>
          </li>
        </ul>

        <div className="hr">
          <div />
        </div>

        <ul className={expand ? "" : "hide-text"}>
          <li>
            <Link
              to={`/saved`}
              className={activeLink === "saved" ? "active" : ""}
              onClick={() => setActiveLink("saved")}
            >
              <MdOutlinePlaylistAddCheck /> <span>Saved Videos</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/liked`}
              className={activeLink === "liked" ? "active" : ""}
              onClick={() => setActiveLink("liked")}
            >
              <AiOutlineHeart /> <span>Liked Videos</span>
            </Link>
          </li>
        </ul>

        <div className="hr">
          <div />
        </div>

        {/* <ul className={`bottom ${expand ? "" : "hide"}`}>
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
        </ul> */}
      </aside>
      {/* ==================================================== */}
    </>
  );
};

export default Sidebar;
