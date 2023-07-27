import { Link } from "react-router-dom";
import "../Sidebar/Sidebar.scss";
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

const BottomNav = () => {
  const { activeLink, setActiveLink } = useSidebarContext();

  return (
    <aside className="sidebar-mb sidebar">
      <ul>
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
        <li>
          <Link
            to={`/saved`}
            className={activeLink === "saved" ? "active" : ""}
            onClick={() => setActiveLink("saved")}
          >
            <MdOutlinePlaylistAddCheck /> <span>Watch Later</span>
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
    </aside>
  );
};

export default BottomNav;
